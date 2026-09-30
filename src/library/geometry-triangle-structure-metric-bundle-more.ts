import { Term, Nat, prod, pair, eq, refl, fst, snd, app } from '../syntax/ast';
import { distanceSq } from './geometry-distance';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Triangle2: Term = prod(Point2, prod(Point2, Point2));
const a: Term = pair(numeral(1), numeral(2));
const b: Term = pair(numeral(3), numeral(4));
const c: Term = pair(numeral(5), numeral(6));
const triangle: Term = pair(a, pair(b, c));

/** A concrete triangle bundles vertex projections with two edge measurements. */
export const triangleStructureMetricBundleType: Term = prod(
  eq(Point2, fst(triangle), a),
  prod(
    eq(Point2, fst(snd(triangle)), b),
    prod(
      eq(Point2, snd(snd(triangle)), c),
      prod(
        eq(Nat, app(app(distanceSq, fst(triangle)), fst(snd(triangle))), numeral(11)),
        eq(Nat, app(app(distanceSq, fst(snd(triangle))), snd(snd(triangle))), numeral(39))))));

export const triangleStructureMetricBundleProof: Term = pair(
  refl(Point2, a),
  pair(
    refl(Point2, b),
    pair(
      refl(Point2, c),
      pair(refl(Nat, numeral(11)), refl(Nat, numeral(39))))));
