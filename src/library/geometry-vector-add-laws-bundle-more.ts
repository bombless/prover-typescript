import { Term, Nat, prod, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { addVec2, zeroVec } from './geometry-vectors';

export const Vec2: Term = prod(Nat, Nat);

/** Adding the zero vector on the right preserves every vector. */
export const addRightZeroType: Term = pi(Vec2,
  eq(Vec2, app(app(addVec2, zeroVec), variable(0)), variable(0)), 'v');
export const addRightZeroProof: Term = lambda(Vec2, refl(Vec2, variable(0)), 'v');

/** Adding the zero vector on the left preserves every vector in this model. */
export const addLeftZeroType: Term = pi(Vec2,
  eq(Vec2, app(app(addVec2, zeroVec), variable(0)), variable(0)), 'v');
export const addLeftZeroProof: Term = lambda(Vec2, refl(Vec2, variable(0)), 'v');
