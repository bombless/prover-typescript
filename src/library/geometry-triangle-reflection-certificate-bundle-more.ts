import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { reflectX } from './geometry-reflections';
import { distanceSq } from './geometry-distance';
import { midpoint } from './geometry-segment';
import { dot2 } from './geometry-metrics';

export const Point2: Term = prod(Nat, Nat);
export const Triangle2: Term = prod(Point2, prod(Point2, Point2));
const a: Term = pair(numeral(1), numeral(2));
const b: Term = pair(numeral(3), numeral(4));
const c: Term = pair(numeral(5), numeral(6));
const ra: Term = app(reflectX, a);
const rb: Term = app(reflectX, b);
const rc: Term = app(reflectX, c);

/** A reflected triangle carries vertices, edge metrics, a midpoint, and a dot-product certificate. */
export const triangleReflectionCertificateBundleType: Term = prod(
  eq(Triangle2, pair(ra, pair(rb, rc)), pair(pair(numeral(1), numeral(2)), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6))))),
  prod(
    eq(Nat, app(app(distanceSq, ra), rb), numeral(11)),
    prod(
      eq(Nat, app(app(distanceSq, rb), rc), numeral(39)),
      prod(
        eq(Point2, app(app(midpoint, ra), rb), pair(numeral(1), numeral(4))),
        eq(Nat, app(app(dot2, ra), rb), numeral(11))))));

export const triangleReflectionCertificateBundleProof: Term = pair(
  refl(Triangle2, pair(pair(numeral(1), numeral(2)), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6))))),
  pair(
    refl(Nat, numeral(11)),
    pair(
      refl(Nat, numeral(39)),
      pair(
        refl(Point2, pair(numeral(1), numeral(4))),
        refl(Nat, numeral(11))))));
