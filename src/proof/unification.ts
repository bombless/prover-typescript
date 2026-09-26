import { Term } from '../syntax/ast';
import { definitionalEqual } from '../kernel/reduction';
import { MetaContext, MetaRef, coreTerm, metaTerm, rebaseCoreTerm } from './metavariable/meta';

export type UnificationTerm = Term | MetaRef;

export function uApp(fn: UnificationTerm, arg: UnificationTerm): UnificationTerm {
  return { kind: 'App', fn: fn as Term, arg: arg as Term };
}

export class UnificationError extends Error {
  constructor(message: string) { super(message); this.name = 'UnificationError'; }
}

/**
 * Unify in a shared prefix context. The default root scope is the greatest
 * metavariable occurrence scope; pass it explicitly when only Core terms
 * reveal a larger ambient context. Syntactic binders extend that root scope.
 */
export function unify(left: UnificationTerm, right: UnificationTerm, context: MetaContext, scopeDepth?: number): MetaContext {
  const rootScope = commonScope([left, right], context, scopeDepth);
  return unifyAtDepth(left, right, context, rootScope, 0);
}

function unifyAtDepth(left: UnificationTerm, right: UnificationTerm, context: MetaContext, rootScope: number, binderDepth: number): MetaContext {
  const a = prune(left, context, rootScope, binderDepth);
  const b = prune(right, context, rootScope, binderDepth);
  const assign = (variable: MetaRef, value: UnificationTerm): MetaContext => {
    // Binder-local inference is deliberately outside this first-order solver.
    if (binderDepth > 0) throw new UnificationError(`Cannot infer metavariable ?m${variable.id} under a binder`);
    return assignFromTerm(variable, value, context, rootScope);
  };
  if (a.kind === 'meta') {
    if (b.kind === 'meta') {
      if (a.id === b.id) return context;
      // The deeper variable can depend on the shallower one. Reversing the
      // equation must not change which scope remains available for solutions.
      if (context.lookup(a.id).scopeDepth < context.lookup(b.id).scopeDepth) return assign(b, a);
    }
    return assign(a, b);
  }
  if (b.kind === 'meta') return assign(b, a);
  return unifyCore(a, b, context, rootScope, binderDepth);
}

/** Materialize in the same shared prefix scope used for unification. */
export function toCoreTerm(term: UnificationTerm, context: MetaContext, scopeDepth?: number): Term {
  return materializeCore(term, context, commonScope([term], context, scopeDepth));
}

function materializeCore(term: UnificationTerm, context: MetaContext, rootScope: number, binderDepth = 0): Term {
  if (term.kind === 'meta') {
    const resolved = prune(term, context, rootScope, binderDepth);
    if (resolved.kind === 'meta') throw new UnificationError(`Unassigned metavariable ?m${resolved.id}`);
    return resolved;
  }
  const nested = (value: Term, depth = binderDepth): Term => materializeCore(value, context, rootScope, depth);
  switch (term.kind) {
    case 'Type': case 'Nat': case 'Zero': case 'Var': return term;
    case 'Pi': return { ...term, domain: nested(term.domain), body: nested(term.body, binderDepth + 1) };
    case 'Lambda': return { ...term, domain: nested(term.domain), body: nested(term.body, binderDepth + 1) };
    case 'App': return { ...term, fn: nested(term.fn), arg: nested(term.arg) };
    case 'Succ': return { ...term, value: nested(term.value) };
    case 'NatRec': return { ...term, motive: nested(term.motive), zeroCase: nested(term.zeroCase), succCase: nested(term.succCase), scrutinee: nested(term.scrutinee) };
    case 'Eq': return { ...term, type: nested(term.type), left: nested(term.left), right: nested(term.right) };
    case 'Refl': return { ...term, type: nested(term.type), value: nested(term.value) };
    case 'EqRec': return { ...term, motive: nested(term.motive), reflCase: nested(term.reflCase), left: nested(term.left), right: nested(term.right), equality: nested(term.equality) };
  }
}

function commonScope(terms: readonly UnificationTerm[], context: MetaContext, explicitScope?: number): number {
  let required = 0;
  const visit = (term: UnificationTerm): void => {
    switch (term.kind) {
      case 'meta': required = Math.max(required, context.referenceScope(term)); return;
      case 'Type': case 'Nat': case 'Zero': case 'Var': return;
      case 'Pi': case 'Lambda': visit(term.domain); visit(term.body); return;
      case 'App': visit(term.fn); visit(term.arg); return;
      case 'Succ': visit(term.value); return;
      case 'NatRec': visit(term.motive); visit(term.zeroCase); visit(term.succCase); visit(term.scrutinee); return;
      case 'Eq': visit(term.type); visit(term.left); visit(term.right); return;
      case 'Refl': visit(term.type); visit(term.value); return;
      case 'EqRec': visit(term.motive); visit(term.reflCase); visit(term.left); visit(term.right); visit(term.equality); return;
    }
  };
  terms.forEach(visit);
  const scope = explicitScope ?? required;
  if (!Number.isSafeInteger(scope) || scope < required || scope < 0) throw new UnificationError(`Scope escape: ambient scope ${scope} cannot contain scope ${required}`);
  return scope;
}

export function substituteUnification(body: UnificationTerm, replacement: UnificationTerm, depth = 0): UnificationTerm {
  if (body.kind === 'meta') return body;
  switch (body.kind) {
    case 'Var':
      if (body.index === depth) return shiftUnification(replacement, depth);
      if (body.index > depth) return { ...body, index: body.index - 1 };
      return body;
    case 'Type': case 'Nat': case 'Zero': return body;
    case 'Pi': return { ...body, domain: substituteUnification(body.domain, replacement, depth) as Term, body: substituteUnification(body.body, replacement, depth + 1) as Term };
    case 'Lambda': return { ...body, domain: substituteUnification(body.domain, replacement, depth) as Term, body: substituteUnification(body.body, replacement, depth + 1) as Term };
    case 'App': return { ...body, fn: substituteUnification(body.fn, replacement, depth) as Term, arg: substituteUnification(body.arg, replacement, depth) as Term };
    case 'Succ': return { ...body, value: substituteUnification(body.value, replacement, depth) as Term };
    case 'NatRec': return { ...body, motive: substituteUnification(body.motive, replacement, depth) as Term, zeroCase: substituteUnification(body.zeroCase, replacement, depth) as Term, succCase: substituteUnification(body.succCase, replacement, depth) as Term, scrutinee: substituteUnification(body.scrutinee, replacement, depth) as Term };
    case 'Eq': return { ...body, type: substituteUnification(body.type, replacement, depth) as Term, left: substituteUnification(body.left, replacement, depth) as Term, right: substituteUnification(body.right, replacement, depth) as Term };
    case 'Refl': return { ...body, type: substituteUnification(body.type, replacement, depth) as Term, value: substituteUnification(body.value, replacement, depth) as Term };
    case 'EqRec': return { ...body, motive: substituteUnification(body.motive, replacement, depth) as Term, reflCase: substituteUnification(body.reflCase, replacement, depth) as Term, left: substituteUnification(body.left, replacement, depth) as Term, right: substituteUnification(body.right, replacement, depth) as Term, equality: substituteUnification(body.equality, replacement, depth) as Term };
  }
}

function shiftUnification(term: UnificationTerm, amount: number, cutoff = 0): UnificationTerm {
  if (term.kind === 'meta') return term;
  switch (term.kind) {
    case 'Var': return { ...term, index: term.index >= cutoff ? term.index + amount : term.index };
    case 'Type': case 'Nat': case 'Zero': return term;
    case 'Pi': return { ...term, domain: shiftUnification(term.domain, amount, cutoff) as Term, body: shiftUnification(term.body, amount, cutoff + 1) as Term };
    case 'Lambda': return { ...term, domain: shiftUnification(term.domain, amount, cutoff) as Term, body: shiftUnification(term.body, amount, cutoff + 1) as Term };
    case 'App': return { ...term, fn: shiftUnification(term.fn, amount, cutoff) as Term, arg: shiftUnification(term.arg, amount, cutoff) as Term };
    case 'Succ': return { ...term, value: shiftUnification(term.value, amount, cutoff) as Term };
    case 'NatRec': return { ...term, motive: shiftUnification(term.motive, amount, cutoff) as Term, zeroCase: shiftUnification(term.zeroCase, amount, cutoff) as Term, succCase: shiftUnification(term.succCase, amount, cutoff) as Term, scrutinee: shiftUnification(term.scrutinee, amount, cutoff) as Term };
    case 'Eq': return { ...term, type: shiftUnification(term.type, amount, cutoff) as Term, left: shiftUnification(term.left, amount, cutoff) as Term, right: shiftUnification(term.right, amount, cutoff) as Term };
    case 'Refl': return { ...term, type: shiftUnification(term.type, amount, cutoff) as Term, value: shiftUnification(term.value, amount, cutoff) as Term };
    case 'EqRec': return { ...term, motive: shiftUnification(term.motive, amount, cutoff) as Term, reflCase: shiftUnification(term.reflCase, amount, cutoff) as Term, left: shiftUnification(term.left, amount, cutoff) as Term, right: shiftUnification(term.right, amount, cutoff) as Term, equality: shiftUnification(term.equality, amount, cutoff) as Term };
  }
}

function assignFromTerm(variable: MetaRef, value: UnificationTerm, context: MetaContext, rootScope: number): MetaContext {
  if (value.kind === 'meta') return context.assign(variable.id, metaTerm(value.id));
  if (occurs(variable.id, value, context)) throw new UnificationError(`Occurs check failed: ?m${variable.id} occurs in its assignment`);
  // Resolve nested references before lowering. Otherwise a solved alias could
  // hide a local variable that the receiving metavariable cannot mention.
  const materialized = materializeCore(value, context, rootScope);
  const lowered = rebaseCoreTerm(materialized, rootScope, context.lookup(variable.id).scopeDepth);
  return context.assign(variable.id, coreTerm(lowered));
}

function prune(term: UnificationTerm, context: MetaContext, rootScope: number, binderDepth = 0): UnificationTerm {
  if (term.kind !== 'meta') return term;
  if (context.referenceScope(term) > rootScope) throw new UnificationError('Scope escape: metavariable occurrence exceeds the root scope');
  const resolved = context.resolveAt(term.id, rootScope + binderDepth);
  return resolved.kind === 'meta' ? resolved : resolved.term;
}

function occurs(id: number, term: UnificationTerm, context: MetaContext): boolean {
  const value = term.kind === 'meta' ? context.resolve(term.id) : coreTerm(term);
  const resolved = value.kind === 'meta' ? value : value.term;
  if (resolved.kind === 'meta') return resolved.id === id;
  switch (resolved.kind) {
    case 'Type': case 'Nat': case 'Zero': case 'Var': return false;
    case 'Pi': case 'Lambda': return occurs(id, resolved.domain, context) || occurs(id, resolved.body, context);
    case 'App': return occurs(id, resolved.fn, context) || occurs(id, resolved.arg, context);
    case 'Succ': return occurs(id, resolved.value, context);
    case 'NatRec': return occurs(id, resolved.motive, context) || occurs(id, resolved.zeroCase, context) || occurs(id, resolved.succCase, context) || occurs(id, resolved.scrutinee, context);
    case 'Eq': return occurs(id, resolved.type, context) || occurs(id, resolved.left, context) || occurs(id, resolved.right, context);
    case 'Refl': return occurs(id, resolved.type, context) || occurs(id, resolved.value, context);
    case 'EqRec': return occurs(id, resolved.motive, context) || occurs(id, resolved.reflCase, context) || occurs(id, resolved.left, context) || occurs(id, resolved.right, context) || occurs(id, resolved.equality, context);
  }
}

/** Only fully Core subtrees may cross into Kernel reduction. */
function isCoreTerm(term: UnificationTerm): term is Term {
  switch (term.kind) {
    case 'meta': return false;
    case 'Type': case 'Nat': case 'Zero': case 'Var': return true;
    case 'Pi': case 'Lambda': return isCoreTerm(term.domain) && isCoreTerm(term.body);
    case 'App': return isCoreTerm(term.fn) && isCoreTerm(term.arg);
    case 'Succ': return isCoreTerm(term.value);
    case 'NatRec': return isCoreTerm(term.motive) && isCoreTerm(term.zeroCase) && isCoreTerm(term.succCase) && isCoreTerm(term.scrutinee);
    case 'Eq': return isCoreTerm(term.type) && isCoreTerm(term.left) && isCoreTerm(term.right);
    case 'Refl': return isCoreTerm(term.type) && isCoreTerm(term.value);
    case 'EqRec': return isCoreTerm(term.motive) && isCoreTerm(term.reflCase) && isCoreTerm(term.left) && isCoreTerm(term.right) && isCoreTerm(term.equality);
  }
}

function unifyCore(left: Term, right: Term, context: MetaContext, rootScope: number, binderDepth: number): MetaContext {
  if (isCoreTerm(left) && isCoreTerm(right) && definitionalEqual(left, right)) return context;
  if (left.kind !== right.kind) throw new UnificationError(`Cannot unify ${left.kind} with ${right.kind}`);
  const nested = (a: UnificationTerm, b: UnificationTerm, next: MetaContext): MetaContext => unifyAtDepth(a, b, next, rootScope, binderDepth);
  switch (left.kind) {
    case 'Type': case 'Nat': case 'Zero': return context;
    case 'Var':
      if (left.index !== (right as typeof left).index) throw new UnificationError(`Cannot unify variables #${left.index} and #${(right as typeof left).index}`);
      return context;
    case 'Pi': case 'Lambda': {
      const r = right as typeof left;
      const next = nested(left.domain, r.domain, context);
      return unifyAtDepth(left.body, r.body, next, rootScope, binderDepth + 1);
    }
    case 'App': {
      const r = right as typeof left;
      return nested(left.arg, r.arg, nested(left.fn, r.fn, context));
    }
    case 'Succ': return nested(left.value, (right as typeof left).value, context);
    case 'NatRec': {
      const r = right as typeof left;
      let next = nested(left.motive, r.motive, context);
      next = nested(left.zeroCase, r.zeroCase, next);
      next = nested(left.succCase, r.succCase, next);
      return nested(left.scrutinee, r.scrutinee, next);
    }
    case 'Eq': {
      const r = right as typeof left;
      let next = nested(left.type, r.type, context);
      next = nested(left.left, r.left, next);
      return nested(left.right, r.right, next);
    }
    case 'Refl': {
      const r = right as typeof left;
      return nested(left.value, r.value, nested(left.type, r.type, context));
    }
    case 'EqRec': {
      const r = right as typeof left;
      let next = nested(left.motive, r.motive, context);
      next = nested(left.reflCase, r.reflCase, next);
      next = nested(left.left, r.left, next);
      next = nested(left.right, r.right, next);
      return nested(left.equality, r.equality, next);
    }
  }
}
