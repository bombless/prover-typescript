import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { Point2 } from './geometry-points';
import { midpoint } from './geometry-segment';
import { distanceSq } from './geometry-distance';

/** Midpoints of the three triangle edges are bundled together. */
export const triangleMidpointsType: Term = pi(Triangle2,
  prod(
    eq(Point2, app(app(midpoint, fst(variable(0))), fst(snd(variable(0)))), app(app(midpoint, fst(variable(0))), fst(snd(variable(0))))),
    prod(
      eq(Point2, app(app(midpoint, fst(snd(variable(0)))), snd(snd(variable(0)))), app(app(midpoint, fst(snd(variable(0)))), snd(snd(variable(0))))),
      eq(Point2, app(app(midpoint, snd(snd(variable(0)))), fst(variable(0))), app(app(midpoint, snd(snd(variable(0)))), fst(variable(0))))
    )
  ), 't');
export const triangleMidpointsProof: Term = lambda(Triangle2,
  pair(
    refl(Point2, app(app(midpoint, fst(variable(0))), fst(snd(variable(0))))),
    pair(
      refl(Point2, app(app(midpoint, fst(snd(variable(0)))), snd(snd(variable(0))))),
      refl(Point2, app(app(midpoint, snd(snd(variable(0)))), fst(variable(0))))
    )
  ), 't');

/** The first edge midpoint's coordinates are exposed. */
export const firstEdgeMidpointCoordinatesType: Term = pi(Triangle2,
  prod(
    eq(Nat, fst(app(app(midpoint, fst(variable(0))), fst(snd(variable(0))))), fst(fst(variable(0)))),
    eq(Nat, snd(app(app(midpoint, fst(variable(0))), fst(snd(variable(0))))), snd(fst(snd(variable(0)))))
  ), 't');
export const firstEdgeMidpointCoordinatesProof: Term = lambda(Triangle2,
  pair(
    refl(Nat, fst(fst(variable(0)))),
    refl(Nat, snd(fst(snd(variable(0)))))
  ), 't');
