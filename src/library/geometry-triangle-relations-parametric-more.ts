import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { dot2 } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { rotate90 } from './geometry-rotations';

export const Point2: Term = prod(Nat, Nat);

/** The first two triangle vertices can be fed directly to the dot product. */
export const triangleFirstSecondDotType: Term = pi(Triangle2,
  eq(Nat, app(app(dot2, fst(variable(0))), fst(snd(variable(0)))),
    app(app(dot2, fst(variable(0))), fst(snd(variable(0))))), 't');
export const triangleFirstSecondDotProof: Term = lambda(Triangle2,
  refl(Nat, app(app(dot2, fst(variable(0))), fst(snd(variable(0))))), 't');

/** The second and third triangle vertices can be fed directly to the cross expression. */
export const triangleSecondThirdCrossType: Term = pi(Triangle2,
  eq(Nat, app(app(cross2, fst(snd(variable(0)))), snd(snd(variable(0)))),
    app(app(cross2, fst(snd(variable(0)))), snd(snd(variable(0))))), 't');
export const triangleSecondThirdCrossProof: Term = lambda(Triangle2,
  refl(Nat, app(app(cross2, fst(snd(variable(0)))), snd(snd(variable(0))))), 't');

/** Rotating a triangle vertex before a dot product remains directly expressible. */
export const rotatedFirstVertexDotType: Term = pi(Triangle2,
  eq(Nat, app(app(dot2, app(rotate90, fst(variable(0)))), fst(snd(variable(0)))),
    app(app(dot2, app(rotate90, fst(variable(0)))), fst(snd(variable(0))))), 't');
export const rotatedFirstVertexDotProof: Term = lambda(Triangle2,
  refl(Nat, app(app(dot2, app(rotate90, fst(variable(0)))), fst(snd(variable(0))))), 't');
