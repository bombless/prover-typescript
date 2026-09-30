import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { Circle2 } from './geometry-circle-laws';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);

/** The second coordinate of a translated circle center is explicit. */
export const translateCircleCenterSndGeneralType: Term = pi(Point2, pi(Circle2,
  eq(Nat, snd(app(app(translate, fst(variable(0))), variable(1))),
    addTerm(snd(fst(variable(0))), snd(variable(1)))), 'c'), 'd');
export const translateCircleCenterSndGeneralProof: Term = lambda(Point2, lambda(Circle2,
  refl(Nat, addTerm(snd(fst(variable(0))), snd(variable(1)))), 'c'), 'd');

/** Reflection leaves each coordinate of a triangle vertex available. */
export const reflectTriangleSecondFstType: Term = pi(Triangle2,
  eq(Nat, fst(app(reflectX, fst(snd(variable(0))))), fst(fst(snd(variable(0))))), 't');
export const reflectTriangleSecondFstProof: Term = lambda(Triangle2,
  refl(Nat, fst(fst(snd(variable(0))))), 't');
export const reflectTriangleSecondSndType: Term = pi(Triangle2,
  eq(Nat, snd(app(reflectX, fst(snd(variable(0))))), snd(fst(snd(variable(0))))), 't');
export const reflectTriangleSecondSndProof: Term = lambda(Triangle2,
  refl(Nat, snd(fst(snd(variable(0))))), 't');

/** Rotating a circle center exposes its first coordinate as the new second coordinate. */
export const rotateCircleCenterSndProjectionType: Term = pi(Circle2,
  eq(Nat, snd(app(rotate90, fst(variable(0)))), fst(fst(variable(0)))), 'c');
export const rotateCircleCenterSndProjectionProof: Term = lambda(Circle2,
  refl(Nat, fst(fst(variable(0)))), 'c');
