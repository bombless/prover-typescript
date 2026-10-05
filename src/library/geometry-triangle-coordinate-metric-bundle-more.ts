import { Term, Nat, prod, pair, app, eq, refl, fst, snd } from '../syntax/ast';
import { distanceSq } from './geometry-distance';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Triangle2: Term = prod(Point2, prod(Point2, Point2));
const triangle: Term = pair(
  pair(numeral(1), numeral(2)),
  pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6))));

/** A concrete triangle combines scalar coordinate projections with vertex norms and edge metrics. */
export const triangleCoordinateMetricBundleType: Term = prod(
  eq(Nat, fst(fst(triangle)), numeral(1)),
  prod(
    eq(Nat, snd(fst(triangle)), numeral(2)),
    prod(
      eq(Nat, app(normSq, fst(triangle)), numeral(5)),
      prod(
        eq(Nat, app(normSq, fst(snd(triangle))), numeral(25)),
        prod(
          eq(Nat, app(app(distanceSq, fst(triangle)), fst(snd(triangle))), numeral(11)),
          eq(Nat, app(app(distanceSq, fst(snd(triangle))), snd(snd(triangle))), numeral(39)))))));

export const triangleCoordinateMetricBundleProof: Term = pair(
  refl(Nat, numeral(1)),
  pair(
    refl(Nat, numeral(2)),
    pair(
      refl(Nat, numeral(5)),
      pair(
        refl(Nat, numeral(25)),
        pair(refl(Nat, numeral(11)), refl(Nat, numeral(39)))))));

export const triangleThirdVertexCoordinateType: Term = prod(
  eq(Nat, fst(snd(snd(triangle))), numeral(5)),
  eq(Nat, snd(snd(snd(triangle))), numeral(6)));
export const triangleThirdVertexCoordinateProof: Term = pair(refl(Nat, numeral(5)), refl(Nat, numeral(6)));
