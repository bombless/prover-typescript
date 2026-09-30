import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { distanceSq } from './geometry-distance';
import { normSq } from './geometry-metrics';
import { twiceArea } from './geometry-area';

export const Point2: Term = prod(Nat, Nat);
export const Triangle2: Term = prod(Point2, prod(Point2, Point2));
const a: Term = pair(numeral(1), numeral(2));
const b: Term = pair(numeral(3), numeral(4));
const c: Term = pair(numeral(5), numeral(6));
const sa: Term = app(app(scaleVec, numeral(2)), a);
const sb: Term = app(app(scaleVec, numeral(2)), b);
const sc: Term = app(app(scaleVec, numeral(2)), c);
const ra: Term = app(rotate90, sa);
const rb: Term = app(rotate90, sb);
const rc: Term = app(rotate90, sc);

/** A scale-then-rotate chain carries transformed vertices, edge metrics, norms, and area. */
export const triangleScaleRotateBundleType: Term = prod(
  eq(Triangle2, pair(ra, pair(rb, rc)), pair(pair(numeral(4), numeral(2)), pair(pair(numeral(8), numeral(6)), pair(numeral(12), numeral(10))))),
  prod(
    eq(Nat, app(app(distanceSq, ra), rb), numeral(44)),
    prod(
      eq(Nat, app(app(distanceSq, rb), rc), numeral(156)),
      prod(
        eq(Nat, app(normSq, ra), numeral(20)),
        prod(
          eq(Nat, app(normSq, rb), numeral(100)),
          prod(
            eq(Nat, app(normSq, rc), numeral(244)),
            eq(Nat, app(app(app(twiceArea, ra), rb), rc), { kind: 'Zero' })))))));

export const triangleScaleRotateBundleProof: Term = pair(
  refl(Triangle2, pair(pair(numeral(4), numeral(2)), pair(pair(numeral(8), numeral(6)), pair(numeral(12), numeral(10))))),
  pair(
    refl(Nat, numeral(44)),
    pair(
      refl(Nat, numeral(156)),
      pair(
        refl(Nat, numeral(20)),
        pair(
          refl(Nat, numeral(100)),
          pair(refl(Nat, numeral(244)), refl(Nat, { kind: 'Zero' })))))));
