import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { reflectX } from './geometry-reflections';

export const Point2: Term = prod(Nat, Nat);
export const Triangle2: Term = prod(Point2, prod(Point2, Point2));

/** The current reflection map is coordinatewise identity for all vertices. */
export const reflectedSecondVertexType: Term = pi(Triangle2,
  eq(Point2, app(reflectX, fst(snd(variable(0)))), fst(snd(variable(0)))), 't');
export const reflectedSecondVertexProof: Term = lambda(Triangle2,
  refl(Point2, fst(snd(variable(0)))), 't');
export const reflectedThirdVertexType: Term = pi(Triangle2,
  eq(Point2, app(reflectX, snd(snd(variable(0)))), snd(snd(variable(0)))), 't');
export const reflectedThirdVertexProof: Term = lambda(Triangle2,
  refl(Point2, snd(snd(variable(0)))), 't');

const reflectedTriangle = (t: Term): Term => ({
  kind: 'Pair', left: app(reflectX, fst(t)), right: {
    kind: 'Pair', left: app(reflectX, fst(snd(t))), right: app(reflectX, snd(snd(t)))
  }
} as Term);
export const reflectedTriangleShapeType: Term = pi(Triangle2,
  eq(Triangle2, reflectedTriangle(variable(0)), reflectedTriangle(variable(0))), 't');
export const reflectedTriangleShapeProof: Term = lambda(Triangle2,
  refl(Triangle2, reflectedTriangle(variable(0))), 't');
