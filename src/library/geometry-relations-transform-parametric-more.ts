import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { parallelVec } from './geometry-parallel';
import { perpendicularVec } from './geometry-relations';

export const Vec2: Term = prod(Nat, Nat);
const zero: Term = pair({ kind: 'Zero' }, { kind: 'Zero' });

/** Rotating the zero vector keeps a parallel certificate against every vector. */
export const rotateZeroParallelType: Term = pi(Vec2,
  app(app(parallelVec, app(rotate90, zero)), app(rotate90, variable(0))), 'v');
export const rotateZeroParallelProof: Term = lambda(Vec2, refl(Nat, { kind: 'Zero' }), 'v');

/** Rotating the zero vector keeps a perpendicular certificate against every vector. */
export const rotateZeroPerpendicularType: Term = pi(Vec2,
  app(app(perpendicularVec, app(rotate90, zero)), app(rotate90, variable(0))), 'v');
export const rotateZeroPerpendicularProof: Term = lambda(Vec2, refl(Nat, { kind: 'Zero' }), 'v');

/** Reflection of the zero vector remains parallel-compatible with every reflected vector. */
export const reflectZeroParallelType: Term = pi(Vec2,
  app(app(parallelVec, app(reflectX, zero)), app(reflectX, variable(0))), 'v');
export const reflectZeroParallelProof: Term = lambda(Vec2, refl(Nat, { kind: 'Zero' }), 'v');

/** Reflection of the zero vector remains right-angle-compatible with every reflected vector. */
export const reflectZeroPerpendicularType: Term = pi(Vec2,
  app(app(perpendicularVec, app(reflectX, zero)), app(reflectX, variable(0))), 'v');
export const reflectZeroPerpendicularProof: Term = lambda(Vec2, refl(Nat, { kind: 'Zero' }), 'v');
