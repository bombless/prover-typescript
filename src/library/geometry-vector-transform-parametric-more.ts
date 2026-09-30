import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { scaleVec } from './geometry-scalar';
import { addTerm } from './nat';
import { mulTerm } from './mul';

export const Vec2: Term = prod(Nat, Nat);

/** Reflection after rotation and scaling has a parameterized first coordinate. */
export const reflectRotateScaleFstType: Term = pi(Nat, pi(Vec2,
  eq(Nat, fst(app(reflectX, app(rotate90, app(app(scaleVec, variable(1)), variable(0))))),
    mulTerm(variable(1), snd(variable(0)))), 'v'), 'k');
export const reflectRotateScaleFstProof: Term = lambda(Nat, lambda(Vec2,
  refl(Nat, mulTerm(variable(1), snd(variable(0)))), 'v'), 'k');

/** Reflection after rotation and scaling has a parameterized second coordinate. */
export const reflectRotateScaleSndType: Term = pi(Nat, pi(Vec2,
  eq(Nat, snd(app(reflectX, app(rotate90, app(app(scaleVec, variable(1)), variable(0))))),
    mulTerm(variable(1), fst(variable(0)))), 'v'), 'k');
export const reflectRotateScaleSndProof: Term = lambda(Nat, lambda(Vec2,
  refl(Nat, mulTerm(variable(1), fst(variable(0)))), 'v'), 'k');

/** A transformed vector's coordinate sum remains an explicit expression. */
const transformedVector: Term = app(reflectX, app(rotate90, app(app(scaleVec, variable(1)), variable(0))));
export const transformedCoordinateSumType: Term = pi(Nat, pi(Vec2,
  eq(Nat, addTerm(fst(transformedVector), snd(transformedVector)),
    addTerm(mulTerm(variable(1), snd(variable(0))), mulTerm(variable(1), fst(variable(0))))), 'v'), 'k');
export const transformedCoordinateSumProof: Term = lambda(Nat, lambda(Vec2,
  refl(Nat, addTerm(mulTerm(variable(1), snd(variable(0))), mulTerm(variable(1), fst(variable(0))))), 'v'), 'k');
