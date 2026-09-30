import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { rotate90 } from './geometry-rotations';
import { distanceSq } from './geometry-distance';
import { midpoint } from './geometry-segment';

export const Point2: Term = prod(Nat, Nat);
export const Triangle2: Term = prod(Point2, prod(Point2, Point2));
const a: Term = pair(numeral(1), numeral(2));
const b: Term = pair(numeral(3), numeral(4));
const c: Term = pair(numeral(5), numeral(6));
const triangle: Term = pair(a, pair(b, c));
const rotated: Term = pair(app(rotate90, a), pair(app(rotate90, b), app(rotate90, c)));

/** A rotated triangle carries its coordinates, a transformed edge metric, and two discrete midpoints. */
export const triangleTransformMetricBundleType: Term = prod(
  eq(Triangle2, rotated, pair(pair(numeral(2), numeral(1)), pair(pair(numeral(4), numeral(3)), pair(numeral(6), numeral(5))))),
  prod(
    eq(Nat, app(app(distanceSq, app(rotate90, a)), app(rotate90, b)), numeral(11)),
    prod(
      eq(Point2, app(app(midpoint, a), b), pair(numeral(1), numeral(4))),
      eq(Point2, app(app(midpoint, b), c), pair(numeral(3), numeral(6))))));

export const triangleTransformMetricBundleProof: Term = pair(
  refl(Triangle2, pair(pair(numeral(2), numeral(1)), pair(pair(numeral(4), numeral(3)), pair(numeral(6), numeral(5))))),
  pair(
    refl(Nat, numeral(11)),
    pair(
      refl(Point2, pair(numeral(1), numeral(4))),
      refl(Point2, pair(numeral(3), numeral(6))))));
