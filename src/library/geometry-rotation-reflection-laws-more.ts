import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';

export const Point2: Term = prod(Nat, Nat);

/** Composition of the coordinate swap and copy reflection still swaps coordinates. */
export const reflectRotateFstType: Term = pi(Point2,
  eq(Nat, fst(app(reflectX, app(rotate90, variable(0)))), snd(variable(0))), 'p');
export const reflectRotateFstProof: Term = lambda(Point2, refl(Nat, snd(variable(0))), 'p');

export const reflectRotateSndType: Term = pi(Point2,
  eq(Nat, snd(app(reflectX, app(rotate90, variable(0)))), fst(variable(0))), 'p');
export const reflectRotateSndProof: Term = lambda(Point2, refl(Nat, fst(variable(0))), 'p');

/** The reverse composition has the same coordinate projections in this model. */
export const rotateReflectFstType: Term = pi(Point2,
  eq(Nat, fst(app(rotate90, app(reflectX, variable(0)))), snd(variable(0))), 'p');
export const rotateReflectFstProof: Term = lambda(Point2, refl(Nat, snd(variable(0))), 'p');

export const rotateReflectSndType: Term = pi(Point2,
  eq(Nat, snd(app(rotate90, app(reflectX, variable(0)))), fst(variable(0))), 'p');
export const rotateReflectSndProof: Term = lambda(Point2, refl(Nat, fst(variable(0))), 'p');
