import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { cross2 } from './geometry-cross';

export const Vec2: Term = prod(Nat, Nat);
export const parallelVec: Term = lambda(Vec2, lambda(Vec2,
  eq(Nat, app(app(cross2, variable(1)), variable(0)), { kind: 'Zero' }), 'v'), 'u');
export const parallelVecType: Term = pi(Vec2, pi(Vec2, { kind: 'Type' }, 'v'), 'u');
export const sameAxisType: Term = eq(Nat, { kind: 'Zero' }, { kind: 'Zero' });
export const sameAxisProof: Term = refl(Nat, { kind: 'Zero' });

/** The zero vector is parallel-compatible with every vector in the discrete model. */
export const zeroParallelType: Term = pi(Vec2,
  eq(Nat, app(app(cross2, pair({ kind: 'Zero' }, { kind: 'Zero' })), variable(0)), { kind: 'Zero' }), 'v');
export const zeroParallelProof: Term = lambda(Vec2, refl(Nat, { kind: 'Zero' }), 'v');
