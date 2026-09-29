import { Term } from '../syntax/ast';
import { MetaContext, MetaRef, coreTerm, metaTerm } from './metavariable/meta';

export type UnificationTerm = Term | MetaRef;

export function uApp(fn: UnificationTerm, arg: UnificationTerm): UnificationTerm {
  return { kind: 'App', fn: fn as Term, arg: arg as Term };
}

export class UnificationError extends Error {
  constructor(message: string) { super(message); this.name = 'UnificationError'; }
}

export function unify(left: UnificationTerm, right: UnificationTerm, context: MetaContext): MetaContext {
  const a = prune(left, context);
  const b = prune(right, context);
  if (a.kind === 'meta') {
    if (b.kind === 'meta' && a.id === b.id) return context;
    return assignFromTerm(a, b, context);
  }
  if (b.kind === 'meta') return assignFromTerm(b, a, context);
  return unifyCore(a, b, context);
}

export function toCoreTerm(term: UnificationTerm, context: MetaContext): Term {
  const resolved = prune(term, context);
  if (resolved.kind === 'meta') throw new UnificationError(`Unassigned metavariable ?m${resolved.id}`);
  return materializeCore(resolved, context);
}

function materializeCore(term: Term, context: MetaContext): Term {
  const nested = (value: Term): Term => {
    const candidate = value as UnificationTerm;
    if (candidate.kind === 'meta') return toCoreTerm(candidate, context);
    return materializeCore(candidate, context);
  };
  switch (term.kind) {
    case 'Type': case 'Nat': case 'Zero': case 'Var': return term;
    case 'Axiom': return { ...term, type: nested(term.type) };
    case 'Prod': return { ...term, left: nested(term.left), right: nested(term.right) };
    case 'Pair': return { ...term, left: nested(term.left), right: nested(term.right), leftType: nested(term.leftType), rightType: nested(term.rightType) };
    case 'Fst': return { ...term, pair: nested(term.pair) };
    case 'Snd': return { ...term, pair: nested(term.pair) };
    case 'Pi': return { ...term, domain: nested(term.domain), body: nested(term.body) };
    case 'Lambda': return { ...term, domain: nested(term.domain), body: nested(term.body) };
    case 'App': return { ...term, fn: nested(term.fn), arg: nested(term.arg) };
    case 'Succ': return { ...term, value: nested(term.value) };
    case 'NatRec': return { ...term, motive: nested(term.motive), zeroCase: nested(term.zeroCase), succCase: nested(term.succCase), scrutinee: nested(term.scrutinee) };
    case 'Eq': return { ...term, type: nested(term.type), left: nested(term.left), right: nested(term.right) };
    case 'Refl': return { ...term, type: nested(term.type), value: nested(term.value) };
    case 'EqRec': return { ...term, motive: nested(term.motive), reflCase: nested(term.reflCase), left: nested(term.left), right: nested(term.right), equality: nested(term.equality) };
  }
}

export function substituteUnification(body: UnificationTerm, replacement: UnificationTerm, depth = 0): UnificationTerm {
  if (body.kind === 'meta') return body;
  switch (body.kind) {
    case 'Var':
      if (body.index === depth) return shiftUnification(replacement, depth);
      if (body.index > depth) return { ...body, index: body.index - 1 };
      return body;
    case 'Type': case 'Nat': case 'Zero': return body;
    case 'Axiom': return { ...body, type: substituteUnification(body.type, replacement, depth) as Term };
    case 'Pi': return { ...body, domain: substituteUnification(body.domain, replacement, depth) as Term, body: substituteUnification(body.body, replacement, depth + 1) as Term };
    case 'Lambda': return { ...body, domain: substituteUnification(body.domain, replacement, depth) as Term, body: substituteUnification(body.body, replacement, depth + 1) as Term };
    case 'App': return { ...body, fn: substituteUnification(body.fn, replacement, depth) as Term, arg: substituteUnification(body.arg, replacement, depth) as Term };
    case 'Succ': return { ...body, value: substituteUnification(body.value, replacement, depth) as Term };
    case 'NatRec': return { ...body, motive: substituteUnification(body.motive, replacement, depth) as Term, zeroCase: substituteUnification(body.zeroCase, replacement, depth) as Term, succCase: substituteUnification(body.succCase, replacement, depth) as Term, scrutinee: substituteUnification(body.scrutinee, replacement, depth) as Term };
    case 'Prod': return { ...body, left: substituteUnification(body.left, replacement, depth) as Term, right: substituteUnification(body.right, replacement, depth) as Term };
    case 'Pair': return { ...body, left: substituteUnification(body.left, replacement, depth) as Term, right: substituteUnification(body.right, replacement, depth) as Term, leftType: substituteUnification(body.leftType, replacement, depth) as Term, rightType: substituteUnification(body.rightType, replacement, depth) as Term };
    case 'Fst': return { ...body, pair: substituteUnification(body.pair, replacement, depth) as Term };
    case 'Snd': return { ...body, pair: substituteUnification(body.pair, replacement, depth) as Term };
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
    case 'Axiom': return { ...term, type: shiftUnification(term.type, amount, cutoff) as Term };
    case 'Pi': return { ...term, domain: shiftUnification(term.domain, amount, cutoff) as Term, body: shiftUnification(term.body, amount, cutoff + 1) as Term };
    case 'Lambda': return { ...term, domain: shiftUnification(term.domain, amount, cutoff) as Term, body: shiftUnification(term.body, amount, cutoff + 1) as Term };
    case 'App': return { ...term, fn: shiftUnification(term.fn, amount, cutoff) as Term, arg: shiftUnification(term.arg, amount, cutoff) as Term };
    case 'Succ': return { ...term, value: shiftUnification(term.value, amount, cutoff) as Term };
    case 'NatRec': return { ...term, motive: shiftUnification(term.motive, amount, cutoff) as Term, zeroCase: shiftUnification(term.zeroCase, amount, cutoff) as Term, succCase: shiftUnification(term.succCase, amount, cutoff) as Term, scrutinee: shiftUnification(term.scrutinee, amount, cutoff) as Term };
    case 'Prod': return { ...term, left: shiftUnification(term.left, amount, cutoff) as Term, right: shiftUnification(term.right, amount, cutoff) as Term };
    case 'Pair': return { ...term, left: shiftUnification(term.left, amount, cutoff) as Term, right: shiftUnification(term.right, amount, cutoff) as Term, leftType: shiftUnification(term.leftType, amount, cutoff) as Term, rightType: shiftUnification(term.rightType, amount, cutoff) as Term };
    case 'Fst': return { ...term, pair: shiftUnification(term.pair, amount, cutoff) as Term };
    case 'Snd': return { ...term, pair: shiftUnification(term.pair, amount, cutoff) as Term };
    case 'Eq': return { ...term, type: shiftUnification(term.type, amount, cutoff) as Term, left: shiftUnification(term.left, amount, cutoff) as Term, right: shiftUnification(term.right, amount, cutoff) as Term };
    case 'Refl': return { ...term, type: shiftUnification(term.type, amount, cutoff) as Term, value: shiftUnification(term.value, amount, cutoff) as Term };
    case 'EqRec': return { ...term, motive: shiftUnification(term.motive, amount, cutoff) as Term, reflCase: shiftUnification(term.reflCase, amount, cutoff) as Term, left: shiftUnification(term.left, amount, cutoff) as Term, right: shiftUnification(term.right, amount, cutoff) as Term, equality: shiftUnification(term.equality, amount, cutoff) as Term };
  }
}

function assignFromTerm(variable: MetaRef, value: UnificationTerm, context: MetaContext): MetaContext {
  const resolved = prune(value, context);
  if (resolved.kind === 'meta') return context.assign(variable.id, metaTerm(resolved.id));
  if (occurs(variable.id, resolved, context)) throw new UnificationError(`Occurs check failed: ?m${variable.id} occurs in its assignment`);
  return context.assign(variable.id, coreTerm(resolved));
}

function prune(term: UnificationTerm, context: MetaContext): UnificationTerm {
  if (term.kind !== 'meta') return term;
  const resolved = context.resolve(term.id);
  return resolved.kind === 'meta' ? resolved : resolved.term;
}

function occurs(id: number, term: UnificationTerm, context: MetaContext): boolean {
  const resolved = prune(term, context);
  if (resolved.kind === 'meta') return resolved.id === id;
  switch (resolved.kind) {
    case 'Type': case 'Nat': case 'Zero': case 'Var': return false;
    case 'Axiom': return occurs(id, resolved.type, context);
    case 'Pi': case 'Lambda': return occurs(id, resolved.domain, context) || occurs(id, resolved.body, context);
    case 'App': return occurs(id, resolved.fn, context) || occurs(id, resolved.arg, context);
    case 'Succ': return occurs(id, resolved.value, context);
    case 'NatRec': return occurs(id, resolved.motive, context) || occurs(id, resolved.zeroCase, context) || occurs(id, resolved.succCase, context) || occurs(id, resolved.scrutinee, context);
    case 'Prod': return occurs(id, resolved.left, context) || occurs(id, resolved.right, context);
    case 'Pair': return occurs(id, resolved.left, context) || occurs(id, resolved.right, context) || occurs(id, resolved.leftType, context) || occurs(id, resolved.rightType, context);
    case 'Fst': return occurs(id, resolved.pair, context);
    case 'Snd': return occurs(id, resolved.pair, context);
    case 'Eq': return occurs(id, resolved.type, context) || occurs(id, resolved.left, context) || occurs(id, resolved.right, context);
    case 'Refl': return occurs(id, resolved.type, context) || occurs(id, resolved.value, context);
    case 'EqRec': return occurs(id, resolved.motive, context) || occurs(id, resolved.reflCase, context) || occurs(id, resolved.left, context) || occurs(id, resolved.right, context) || occurs(id, resolved.equality, context);
  }
}

function unifyCore(left: Term, right: Term, context: MetaContext): MetaContext {
  if (left.kind !== right.kind) throw new UnificationError(`Cannot unify ${left.kind} with ${right.kind}`);
  switch (left.kind) {
    case 'Type': case 'Nat': case 'Zero': return context;
    case 'Axiom': return unify(left.type, (right as typeof left).type, context);
    case 'Var':
      if (left.index !== (right as typeof left).index) throw new UnificationError(`Cannot unify variables #${left.index} and #${(right as typeof left).index}`);
      return context;
    case 'Pi': case 'Lambda': {
      const r = right as typeof left;
      let next = unify(left.domain, r.domain, context);
      return unify(left.body, r.body, next);
    }
    case 'App': {
      const r = right as typeof left;
      return unify(left.arg, r.arg, unify(left.fn, r.fn, context));
    }
    case 'Succ': return unify(left.value, (right as typeof left).value, context);
    case 'Prod': { const r = right as typeof left; let next = unify(left.left, r.left, context); return unify(left.right, r.right, next); }
    case 'Pair': { const r = right as typeof left; let next = unify(left.leftType, r.leftType, context); next = unify(left.rightType, r.rightType, next); next = unify(left.left, r.left, next); return unify(left.right, r.right, next); }
    case 'Fst': return unify(left.pair, (right as typeof left).pair, context);
    case 'Snd': return unify(left.pair, (right as typeof left).pair, context);
    case 'NatRec': {
      const r = right as typeof left;
      let next = unify(left.motive, r.motive, context);
      next = unify(left.zeroCase, r.zeroCase, next);
      next = unify(left.succCase, r.succCase, next);
      return unify(left.scrutinee, r.scrutinee, next);
    }
    case 'Eq': {
      const r = right as typeof left;
      let next = unify(left.type, r.type, context);
      next = unify(left.left, r.left, next);
      return unify(left.right, r.right, next);
    }
    case 'Refl': {
      const r = right as typeof left;
      return unify(left.value, r.value, unify(left.type, r.type, context));
    }
    case 'EqRec': {
      const r = right as typeof left;
      let next = unify(left.motive, r.motive, context);
      next = unify(left.reflCase, r.reflCase, next);
      next = unify(left.left, r.left, next);
      next = unify(left.right, r.right, next);
      return unify(left.equality, r.equality, next);
    }
  }
}
