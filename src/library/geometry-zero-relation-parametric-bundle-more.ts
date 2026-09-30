import { Term, Nat, prod, pair, variable, pi, lambda, app, refl } from '../syntax/ast';
import { parallelVec } from './geometry-parallel';
import { perpendicularVec } from './geometry-relations';
import { rightAngle } from './geometry-angle';

export const Vec2: Term = prod(Nat, Nat);
const zero = pair({ kind: 'Zero' }, { kind: 'Zero' });

/** In the current discrete relation model, zero is parallel to every vector. */
export const zeroParallelGeneralType: Term = pi(Vec2,
  app(app(parallelVec, zero), variable(0)), 'v');
export const zeroParallelGeneralProof: Term = lambda(Vec2, refl(Nat, { kind: 'Zero' }), 'v');

/** In the current discrete relation model, zero is perpendicular to every vector. */
export const zeroPerpendicularGeneralType: Term = pi(Vec2,
  app(app(perpendicularVec, zero), variable(0)), 'v');
export const zeroPerpendicularGeneralProof: Term = lambda(Vec2, refl(Nat, { kind: 'Zero' }), 'v');

/** The zero vector also gives the corresponding right-angle certificate. */
export const zeroRightAngleGeneralType: Term = pi(Vec2,
  app(app(rightAngle, zero), variable(0)), 'v');
export const zeroRightAngleGeneralProof: Term = lambda(Vec2, refl(Nat, { kind: 'Zero' }), 'v');
