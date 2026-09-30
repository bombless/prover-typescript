import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { addTerm } from './nat';
import { Triangle2 } from './geometry-triangle';
import { Line2 } from './geometry-line';

export const Point2: Term = prod(Nat, Nat);

/** Rotating the second triangle vertex exposes its original y coordinate first. */
export const rotateTriangleSecondFstType: Term = pi(Triangle2,
  eq(Nat, fst(app(rotate90, fst(snd(variable(0))))), snd(fst(snd(variable(0))))), 't');
export const rotateTriangleSecondFstProof: Term = lambda(Triangle2,
  refl(Nat, snd(fst(snd(variable(0))))), 't');

/** Reflecting the third triangle vertex leaves its coordinates unchanged. */
export const reflectTriangleThirdSndType: Term = pi(Triangle2,
  eq(Nat, snd(app(reflectX, snd(snd(variable(0))))), snd(snd(snd(variable(0))))), 't');
export const reflectTriangleThirdSndProof: Term = lambda(Triangle2,
  refl(Nat, snd(snd(snd(variable(0))))), 't');

/** Translating the third triangle vertex exposes the translated x coordinate. */
export const translateTriangleThirdFstType: Term = pi(Point2, pi(Triangle2,
  eq(Nat, fst(app(app(translate, snd(snd(variable(0)))), variable(1))),
    addTerm(fst(snd(snd(variable(0)))), fst(variable(1)))), 'd'), 't');
export const translateTriangleThirdFstProof: Term = lambda(Point2, lambda(Triangle2,
  refl(Nat, addTerm(fst(snd(snd(variable(0)))), fst(variable(1)))), 'd'), 't');

/** Rotating a line direction exposes its original y coordinate first. */
export const rotateLineDirectionFstMoreType: Term = pi(Line2,
  eq(Nat, fst(app(rotate90, snd(variable(0)))), snd(snd(variable(0)))), 'l');
export const rotateLineDirectionFstMoreProof: Term = lambda(Line2,
  refl(Nat, snd(snd(variable(0)))), 'l');

/** Rotating a line direction exposes its original x coordinate second. */
export const rotateLineDirectionSndMoreType: Term = pi(Line2,
  eq(Nat, snd(app(rotate90, snd(variable(0)))), fst(snd(variable(0)))), 'l');
export const rotateLineDirectionSndMoreProof: Term = lambda(Line2,
  refl(Nat, fst(snd(variable(0)))), 'l');
