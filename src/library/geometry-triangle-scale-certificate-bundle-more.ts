import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { scaleVec } from './geometry-scalar';
import { distanceSq } from './geometry-distance';
import { midpoint } from './geometry-segment';

export const Point2: Term = prod(Nat, Nat);
export const Triangle2: Term = prod(Point2, prod(Point2, Point2));
const a: Term = pair(numeral(1), numeral(2));
const b: Term = pair(numeral(3), numeral(4));
const c: Term = pair(numeral(5), numeral(6));
const sa: Term = app(app(scaleVec, numeral(2)), a);
const sb: Term = app(app(scaleVec, numeral(2)), b);
const sc: Term = app(app(scaleVec, numeral(2)), c);

/** A scaled triangle carries all transformed vertices, two edge metrics, and a discrete midpoint. */
export const triangleScaleCertificateBundleType: Term = prod(
  eq(Triangle2, pair(sa, pair(sb, sc)), pair(pair(numeral(2), numeral(4)), pair(pair(numeral(6), numeral(8)), pair(numeral(10), numeral(12))))),
  prod(
    eq(Nat, app(app(distanceSq, sa), sb), numeral(44)),
    prod(
      eq(Nat, app(app(distanceSq, sb), sc), numeral(156)),
      eq(Point2, app(app(midpoint, sa), sb), pair(numeral(2), numeral(8))))));

export const triangleScaleCertificateBundleProof: Term = pair(
  refl(Triangle2, pair(pair(numeral(2), numeral(4)), pair(pair(numeral(6), numeral(8)), pair(numeral(10), numeral(12))))),
  pair(
    refl(Nat, numeral(44)),
    pair(
      refl(Nat, numeral(156)),
      refl(Point2, pair(numeral(2), numeral(8))))));
