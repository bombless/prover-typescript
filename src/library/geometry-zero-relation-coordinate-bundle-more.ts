import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { cross2 } from './geometry-cross';
import { dot2 } from './geometry-metrics';
import { parallelVec } from './geometry-parallel';
import { perpendicularVec } from './geometry-relations';

export const Vec2: Term = prod(Nat, Nat);
const zero = pair({ kind: 'Zero' }, { kind: 'Zero' });

/** Cross with the zero vector vanishes for every vector. */
export const zeroCrossType: Term = pi(Vec2,
  eq(Nat, app(app(cross2, zero), variable(0)), { kind: 'Zero' }), 'v');
export const zeroCrossProof: Term = lambda(Vec2, refl(Nat, { kind: 'Zero' }), 'v');

/** Dot with the zero vector vanishes for every vector. */
export const zeroDotType: Term = pi(Vec2,
  eq(Nat, app(app(dot2, zero), variable(0)), { kind: 'Zero' }), 'v');
export const zeroDotProof: Term = lambda(Vec2, refl(Nat, { kind: 'Zero' }), 'v');

/** The zero vector is parallel to every vector in the project relation model. */
export const zeroParallelType: Term = pi(Vec2,
  app(app(parallelVec, zero), variable(0)), 'v');
export const zeroParallelProof: Term = lambda(Vec2, refl(Nat, { kind: 'Zero' }), 'v');

/** The zero vector is perpendicular to every vector in the project relation model. */
export const zeroPerpendicularType: Term = pi(Vec2,
  app(app(perpendicularVec, zero), variable(0)), 'v');
export const zeroPerpendicularProof: Term = lambda(Vec2, refl(Nat, { kind: 'Zero' }), 'v');

/** The zero vector is reconstructed by its two projections. */
export const zeroProjectionType: Term = eq(Vec2, pair(fst(zero), snd(zero)), zero);
export const zeroProjectionProof: Term = refl(Vec2, zero);
