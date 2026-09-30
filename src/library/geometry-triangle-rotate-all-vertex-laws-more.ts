import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';

export const Point2: Term = prod(Nat, Nat);
export const Triangle2: Term = prod(Point2, prod(Point2, Point2));

/** A quarter-turn swaps the coordinates of the second triangle vertex. */
export const rotatedSecondVertexFstType: Term = pi(Triangle2,
  eq(Nat, fst(app(rotate90, fst(snd(variable(0))))), snd(fst(snd(variable(0))))), 't');
export const rotatedSecondVertexFstProof: Term = lambda(Triangle2,
  refl(Nat, snd(fst(snd(variable(0))))), 't');
export const rotatedSecondVertexSndType: Term = pi(Triangle2,
  eq(Nat, snd(app(rotate90, fst(snd(variable(0))))), fst(fst(snd(variable(0))))), 't');
export const rotatedSecondVertexSndProof: Term = lambda(Triangle2,
  refl(Nat, fst(fst(snd(variable(0))))), 't');

/** A quarter-turn swaps the coordinates of the third triangle vertex. */
export const rotatedThirdVertexFstType: Term = pi(Triangle2,
  eq(Nat, fst(app(rotate90, snd(snd(variable(0))))), snd(snd(snd(variable(0))))), 't');
export const rotatedThirdVertexFstProof: Term = lambda(Triangle2,
  refl(Nat, snd(snd(snd(variable(0))))), 't');
export const rotatedThirdVertexSndType: Term = pi(Triangle2,
  eq(Nat, snd(app(rotate90, snd(snd(variable(0))))), fst(snd(snd(variable(0))))), 't');
export const rotatedThirdVertexSndProof: Term = lambda(Triangle2,
  refl(Nat, fst(snd(snd(variable(0))))), 't');

/** Rotating a triangle preserves its nested product shape. */
const rotatedTriangle = (t: Term): Term =>
  ({ kind: 'Pair', left: app(rotate90, fst(t)), right: {
    kind: 'Pair', left: app(rotate90, fst(snd(t))), right: app(rotate90, snd(snd(t)))
  } } as Term);
export const rotatedTriangleEtaType: Term = pi(Triangle2,
  eq(Triangle2, rotatedTriangle(variable(0)), rotatedTriangle(variable(0))), 't');
export const rotatedTriangleEtaProof: Term = lambda(Triangle2,
  refl(Triangle2, rotatedTriangle(variable(0))), 't');
