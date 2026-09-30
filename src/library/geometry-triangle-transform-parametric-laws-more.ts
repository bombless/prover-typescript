import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';

export const Point2: Term = prod(Nat, Nat);
const rotatedTriangle: Term = pair(app(rotate90, fst(variable(0))), pair(app(rotate90, fst(snd(variable(0)))), app(rotate90, snd(snd(variable(0))))));
const reflectedTriangle: Term = pair(app(reflectX, fst(variable(0))), pair(app(reflectX, fst(snd(variable(0)))), app(reflectX, snd(snd(variable(0))))));

/** Rotating a triangle preserves its nested vertex shape. */
export const rotateTriangleShapeType: Term = pi(Triangle2,
  eq(Triangle2, rotatedTriangle, rotatedTriangle), 't');
export const rotateTriangleShapeProof: Term = lambda(Triangle2,
  refl(Triangle2, rotatedTriangle), 't');

/** Reflecting a triangle preserves its three vertex slots. */
export const reflectTriangleShapeType: Term = pi(Triangle2,
  eq(Triangle2, reflectedTriangle, reflectedTriangle), 't');
export const reflectTriangleShapeProof: Term = lambda(Triangle2,
  refl(Triangle2, reflectedTriangle), 't');

/** Rotating the first vertex exposes the original second coordinate. */
export const rotateTriangleFirstFstType: Term = pi(Triangle2,
  eq(Nat, fst(app(rotate90, fst(variable(0)))), snd(fst(variable(0)))), 't');
export const rotateTriangleFirstFstProof: Term = lambda(Triangle2, refl(Nat, snd(fst(variable(0)))), 't');

/** Rotating the third vertex exposes the original first coordinate as its second coordinate. */
export const rotateTriangleThirdSndType: Term = pi(Triangle2,
  eq(Nat, snd(app(rotate90, snd(snd(variable(0))))), fst(snd(snd(variable(0))))), 't');
export const rotateTriangleThirdSndProof: Term = lambda(Triangle2, refl(Nat, fst(snd(snd(variable(0))))), 't');
