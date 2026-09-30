import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { distanceSq } from './geometry-distance';
import { rotate90 } from './geometry-rotations';

export const Point2: Term = prod(Nat, Nat);

/** The first and second vertices of any triangle form a distance expression. */
export const triangleFirstSecondDistanceType: Term = pi(Triangle2,
  eq(Nat, app(app(distanceSq, fst(variable(0))), fst(snd(variable(0)))),
    app(app(distanceSq, fst(variable(0))), fst(snd(variable(0))))), 't');
export const triangleFirstSecondDistanceProof: Term = lambda(Triangle2,
  refl(Nat, app(app(distanceSq, fst(variable(0))), fst(snd(variable(0))))), 't');

/** Rotating both vertices gives a directly usable metric expression. */
export const rotatedTriangleSideType: Term = pi(Triangle2,
  eq(Nat, app(app(distanceSq, app(rotate90, fst(variable(0)))), app(rotate90, fst(snd(variable(0))))),
    app(app(distanceSq, app(rotate90, fst(variable(0)))), app(rotate90, fst(snd(variable(0)))))), 't');
export const rotatedTriangleSideProof: Term = lambda(Triangle2,
  refl(Nat, app(app(distanceSq, app(rotate90, fst(variable(0)))), app(rotate90, fst(snd(variable(0)))))), 't');
