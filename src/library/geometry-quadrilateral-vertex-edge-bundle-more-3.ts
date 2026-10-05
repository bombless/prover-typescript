import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Quadrilateral2 } from './geometry-quadrilateral-four-stage-structure-laws-more';
import { Point2 } from './geometry-points';
import { Vec2, addVec2 } from './geometry-vectors';

/** All four vertices of a quadrilateral can be projected together. */
export const quadrilateralVerticesType: Term = pi(Quadrilateral2,
  prod(
    eq(Point2, fst(variable(0)), fst(variable(0))),
    prod(
      eq(Point2, fst(snd(variable(0))), fst(snd(variable(0)))),
      prod(
        eq(Point2, fst(snd(snd(variable(0)))), fst(snd(snd(variable(0))))),
        eq(Point2, snd(snd(snd(variable(0)))), snd(snd(snd(variable(0)))))
      )
    )), 'q');
export const quadrilateralVerticesProof: Term = lambda(Quadrilateral2,
  pair(
    refl(Point2, fst(variable(0))),
    pair(
      refl(Point2, fst(snd(variable(0)))),
      pair(
        refl(Point2, fst(snd(snd(variable(0))))),
        refl(Point2, snd(snd(snd(variable(0)))))
      )
    )), 'q');

/** The final three vertices reconstruct the quadrilateral tail. */
export const quadrilateralTailType: Term = pi(Quadrilateral2,
  eq(prod(Point2, prod(Point2, Point2)),
    pair(fst(snd(variable(0))), pair(fst(snd(snd(variable(0)))), snd(snd(snd(variable(0)))))),
    snd(variable(0))), 'q');
export const quadrilateralTailProof: Term = lambda(Quadrilateral2,
  refl(prod(Point2, prod(Point2, Point2)), snd(variable(0))), 'q');

/** Adding the first two vertices is a well-typed vector expression. */
export const quadrilateralFirstEdgeType: Term = pi(Quadrilateral2,
  eq(Vec2, app(app(addVec2, fst(variable(0))), fst(snd(variable(0)))),
    app(app(addVec2, fst(variable(0))), fst(snd(variable(0))))), 'q');
export const quadrilateralFirstEdgeProof: Term = lambda(Quadrilateral2,
  refl(Vec2, app(app(addVec2, fst(variable(0))), fst(snd(variable(0))))), 'q');
