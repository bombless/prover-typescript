import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { reflectX } from './geometry-reflections';

export const Point2: Term = prod(Nat, Nat);
const reflected = (t: Term): Term => pair(
  app(reflectX, fst(t)),
  pair(app(reflectX, fst(snd(t))), app(reflectX, snd(snd(t)))));

export const reflectedTriangleType: Term = pi(Triangle2,
  eq(Triangle2, reflected(variable(0)), reflected(variable(0))), 't');
export const reflectedTriangleProof: Term = lambda(Triangle2,
  refl(Triangle2, reflected(variable(0))), 't');

export const reflectedFirstVertexType: Term = pi(Triangle2,
  eq(Point2, app(reflectX, fst(variable(0))), fst(variable(0))), 't');
export const reflectedFirstVertexProof: Term = lambda(Triangle2,
  refl(Point2, fst(variable(0))), 't');
