import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { Vec2, addVec2 } from './geometry-vectors';

export const Point2: Term = prod(Nat, Nat);

/** A triangle exposes all three vertex projections in one product certificate. */
export const triangleVerticesType: Term = pi(Triangle2,
  prod(
    eq(Point2, fst(variable(0)), fst(variable(0))),
    prod(
      eq(Point2, fst(snd(variable(0))), fst(snd(variable(0)))),
      eq(Point2, snd(snd(variable(0))), snd(snd(variable(0))))
    )), 't');
export const triangleVerticesProof: Term = lambda(Triangle2,
  pair(
    refl(Point2, fst(variable(0))),
    pair(
      refl(Point2, fst(snd(variable(0)))),
      refl(Point2, snd(snd(variable(0))))
    )), 't');

/** The tail pair is reconstructed from the second and third vertices. */
export const triangleTailReconstructionType: Term = pi(Triangle2,
  eq(prod(Point2, Point2),
    pair(fst(snd(variable(0))), snd(snd(variable(0)))), snd(variable(0))), 't');
export const triangleTailReconstructionProof: Term = lambda(Triangle2,
  refl(prod(Point2, Point2), snd(variable(0))), 't');

/** Adding a triangle vertex to itself is a reusable vector operation. */
export const triangleSecondVertexAddType: Term = pi(Triangle2,
  eq(Vec2, app(app(addVec2, fst(snd(variable(0)))), fst(snd(variable(0)))),
    app(app(addVec2, fst(snd(variable(0)))), fst(snd(variable(0))))), 't');
export const triangleSecondVertexAddProof: Term = lambda(Triangle2,
  refl(Vec2, app(app(addVec2, fst(snd(variable(0)))), fst(snd(variable(0))))), 't');
