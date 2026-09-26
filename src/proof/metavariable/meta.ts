import { Term } from '../../syntax/ast';
import { shift } from '../../kernel/reduction';

export interface MetaVariable { readonly id: number; readonly scopeDepth: number; readonly type?: Term; }
/** A reference may record the prefix scope in which an unresolved alias occurs. */
export interface MetaRef { readonly kind: 'meta'; readonly id: number; readonly scopeDepth?: number; }
export interface CoreTermRef { readonly kind: 'term'; readonly term: Term; }
export type MetaTerm = MetaRef | CoreTermRef;
export function metaTerm(id: number, scopeDepth?: number): MetaRef {
  return { kind: 'meta', id, ...(scopeDepth === undefined ? {} : { scopeDepth }) };
}
export function coreTerm(term: Term): CoreTermRef { return { kind: 'term', term }; }

export class MetaVariableError extends Error {
  constructor(message: string) { super(message); this.name = 'MetaVariableError'; }
}

/**
 * Immutable proof-engine state; metavariables never become Core Term nodes.
 * Scopes must be prefixes of one shared local context, not unrelated contexts
 * with the same depth. Assignments are stored in their variable's home scope.
 */
export class MetaContext {
  readonly variables: readonly MetaVariable[];
  readonly assignments: ReadonlyMap<number, MetaTerm>;
  private readonly nextId: number;

  private constructor(variables: readonly MetaVariable[], assignments: ReadonlyMap<number, MetaTerm>, nextId: number) {
    this.variables = [...variables];
    this.assignments = new Map(assignments);
    this.nextId = nextId;
  }

  static empty(): MetaContext { return new MetaContext([], new Map(), 0); }

  create(scopeDepth: number, type?: Term): { readonly context: MetaContext; readonly variable: MetaVariable; readonly term: MetaRef } {
    validateScopeDepth(scopeDepth);
    if (type) validateTermScope(type, scopeDepth);
    const variable: MetaVariable = { id: this.nextId, scopeDepth, type };
    return { context: new MetaContext([...this.variables, variable], this.assignments, this.nextId + 1), variable, term: metaTerm(variable.id) };
  }

  lookup(id: number): MetaVariable {
    const variable = this.variables.find((candidate) => candidate.id === id);
    if (!variable) throw new MetaVariableError(`Unknown metavariable ?m${id}`);
    return variable;
  }

  assignment(id: number): MetaTerm | undefined { this.lookup(id); return this.assignments.get(id); }

  assign(id: number, value: MetaTerm): MetaContext {
    const variable = this.lookup(id);
    // Assignments are single-use; branch from an unassigned context to explore alternatives.
    if (this.assignments.has(id)) throw new MetaVariableError(`Metavariable ?m${id} is already assigned`);
    const resolved = resolveMetaTerm(this, value, new Set([id]));
    if (resolved.kind === 'meta' && resolved.id === id) throw new MetaVariableError(`Cannot assign ?m${id} to itself`);
    validateAssignmentScope(variable, value, this);
    const assignments = new Map(this.assignments);
    assignments.set(id, value);
    return new MetaContext(this.variables, assignments, this.nextId);
  }

  instantiate(value: MetaTerm): Term {
    const resolved = resolveMetaTerm(this, value, new Set());
    if (resolved.kind === 'meta') throw new MetaVariableError(`Unassigned metavariable ?m${resolved.id}`);
    return resolved.term;
  }

  resolve(id: number): MetaTerm { return this.resolveAt(id, this.lookup(id).scopeDepth); }

  /** Resolve in an extension of the variable's creation context. */
  resolveAt(id: number, scopeDepth: number): MetaTerm {
    return resolveMetaTerm(this, metaTerm(id, scopeDepth), new Set());
  }

  referenceScope(value: MetaRef): number {
    const home = this.lookup(value.id).scopeDepth;
    const occurrence = value.scopeDepth ?? home;
    validateScopeDepth(occurrence);
    if (occurrence < home) throw new MetaVariableError(`Scope escape: ?m${value.id} requires scope ${home}, not ${occurrence}`);
    return occurrence;
  }
}

function validateAssignmentScope(variable: MetaVariable, value: MetaTerm, context: MetaContext): void {
  if (value.kind === 'meta') {
    const target = context.lookup(value.id);
    context.referenceScope(value);
    if (value.scopeDepth !== undefined && value.scopeDepth > variable.scopeDepth) throw new MetaVariableError(`Scope escape: alias occurrence requires scope ${value.scopeDepth}, not ${variable.scopeDepth}`);
    if (target.scopeDepth > variable.scopeDepth) throw new MetaVariableError(`Scope escape: ?m${variable.id} has scope ${variable.scopeDepth}, but ?m${target.id} requires scope ${target.scopeDepth}`);
    return;
  }
  validateCoreTerm(value.term);
  validateTermScope(value.term, variable.scopeDepth);
}

/** Ensure every free de Bruijn variable fits the metavariable's local scope. */
function validateTermScope(term: Term, scopeDepth: number, binderDepth = 0): void {
  switch (term.kind) {
    case 'Type': case 'Nat': case 'Zero': return;
    case 'Var':
      if (!Number.isSafeInteger(term.index) || term.index < 0 || term.index >= scopeDepth + binderDepth) throw new MetaVariableError(`Scope escape: variable #${term.index} is outside scope depth ${scopeDepth}`);
      return;
    case 'Pi': case 'Lambda':
      validateTermScope(term.domain, scopeDepth, binderDepth);
      validateTermScope(term.body, scopeDepth, binderDepth + 1);
      return;
    case 'App':
      validateTermScope(term.fn, scopeDepth, binderDepth);
      validateTermScope(term.arg, scopeDepth, binderDepth);
      return;
    case 'Succ': validateTermScope(term.value, scopeDepth, binderDepth); return;
    case 'NatRec':
      validateTermScope(term.motive, scopeDepth, binderDepth); validateTermScope(term.zeroCase, scopeDepth, binderDepth);
      validateTermScope(term.succCase, scopeDepth, binderDepth); validateTermScope(term.scrutinee, scopeDepth, binderDepth); return;
    case 'Eq':
      validateTermScope(term.type, scopeDepth, binderDepth); validateTermScope(term.left, scopeDepth, binderDepth); validateTermScope(term.right, scopeDepth, binderDepth); return;
    case 'Refl':
      validateTermScope(term.type, scopeDepth, binderDepth); validateTermScope(term.value, scopeDepth, binderDepth); return;
    case 'EqRec':
      validateTermScope(term.motive, scopeDepth, binderDepth); validateTermScope(term.reflCase, scopeDepth, binderDepth);
      validateTermScope(term.left, scopeDepth, binderDepth); validateTermScope(term.right, scopeDepth, binderDepth); validateTermScope(term.equality, scopeDepth, binderDepth); return;
  }
}

function validateScopeDepth(scopeDepth: number): void {
  if (!Number.isSafeInteger(scopeDepth) || scopeDepth < 0) throw new MetaVariableError(`Invalid metavariable scope depth: ${scopeDepth}`);
}

/** Rebase a Core term between prefix contexts, rejecting capture on lowering. */
export function rebaseCoreTerm(term: Term, fromDepth: number, toDepth: number): Term {
  validateScopeDepth(fromDepth);
  validateScopeDepth(toDepth);
  validateCoreTerm(term);
  validateTermScope(term, fromDepth);
  const removed = fromDepth - toDepth;
  if (removed > 0) {
    const check = (value: Term, binders: number): void => {
      if (value.kind === 'Var' && value.index >= binders && value.index < binders + removed) {
        throw new MetaVariableError(`Scope escape: variable #${value.index} depends on a removed local binder`);
      }
      visitChildren(value, (child, extra) => check(child, binders + extra));
    };
    check(term, 0);
  }
  return fromDepth === toDepth ? term : shift(term, toDepth - fromDepth);
}

function validateCoreTerm(term: Term): void {
  // Mixed proof-engine terms must be materialized before entering Core storage.
  if ((term as Term | MetaRef).kind === 'meta') throw new MetaVariableError('Unassigned metavariable in Core assignment');
  visitChildren(term, child => validateCoreTerm(child));
}

function visitChildren(term: Term, visit: (child: Term, extraBinders: number) => void): void {
  switch (term.kind) {
    case 'Type': case 'Nat': case 'Zero': case 'Var': return;
    case 'Pi': case 'Lambda': visit(term.domain, 0); visit(term.body, 1); return;
    case 'App': visit(term.fn, 0); visit(term.arg, 0); return;
    case 'Succ': visit(term.value, 0); return;
    case 'NatRec': visit(term.motive, 0); visit(term.zeroCase, 0); visit(term.succCase, 0); visit(term.scrutinee, 0); return;
    case 'Eq': visit(term.type, 0); visit(term.left, 0); visit(term.right, 0); return;
    case 'Refl': visit(term.type, 0); visit(term.value, 0); return;
    case 'EqRec': visit(term.motive, 0); visit(term.reflCase, 0); visit(term.left, 0); visit(term.right, 0); visit(term.equality, 0); return;
  }
}

function resolveMetaTerm(context: MetaContext, value: MetaTerm, visiting: ReadonlySet<number>): MetaTerm {
  if (value.kind === 'term') return value;
  const occurrenceScope = context.referenceScope(value);
  let id = value.id;
  const seen = new Set(visiting);
  while (true) {
    const variable = context.lookup(id);
    if (seen.has(id)) throw new MetaVariableError(`Cyclic metavariable assignment involving ?m${id}`);
    seen.add(id);
    const assignment = context.assignment(id);
    if (!assignment) return metaTerm(id, occurrenceScope === variable.scopeDepth ? undefined : occurrenceScope);
    if (assignment.kind === 'term') return coreTerm(rebaseCoreTerm(assignment.term, variable.scopeDepth, occurrenceScope));
    id = assignment.id;
  }
}
