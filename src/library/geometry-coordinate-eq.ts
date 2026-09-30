import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';

export const Point2: Term = prod(Nat, Nat);
/** Coordinate equality predicate, useful for reducing point equality goals. */
export const sameX: Term = lambda(Point2, lambda(Point2,
  eq(Nat, fst(variable(1)), fst(variable(0))), 'q'), 'p');
export const sameY: Term = lambda(Point2, lambda(Point2,
  eq(Nat, snd(variable(1)), snd(variable(0))), 'q'), 'p');
export const sameXType: Term = pi(Point2, pi(Point2, { kind: 'Type' }, 'q'), 'p');
export const sameYType: Term = pi(Point2, pi(Point2, { kind: 'Type' }, 'q'), 'p');
export const originSameXType: Term = eq(Nat, { kind: 'Zero' }, { kind: 'Zero' });
export const originSameXProof: Term = refl(Nat, { kind: 'Zero' });
export const originSameYType: Term = eq(Nat, { kind: 'Zero' }, { kind: 'Zero' });
export const originSameYProof: Term = refl(Nat, { kind: 'Zero' });
