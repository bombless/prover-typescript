import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { scaleVec } from './geometry-scalar';
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

/** A scaled triangle carries all three edge metrics, all vertex norms, and its area certificate. */
export const triangleScaleFullMetricBundleType: Term = prod(
  eq(Nat, app(app(distanceSq, sa), sb), numeral(44)),
  prod(
    eq(Nat, app(app(distanceSq, sb), sc), numeral(156)),
    prod(
      eq(Nat, app(app(distanceSq, sc), sa), numeral(68)),
      prod(
        eq(Nat, app(normSq, sa), numeral(20)),
        prod(
          eq(Nat, app(normSq, sb), numeral(100)),
          prod(
            eq(Nat, app(normSq, sc), numeral(244)),
            eq(Nat, app(app(app(twiceArea, sa), sb), sc), { kind: 'Zero' })))))));

export const triangleScaleFullMetricBundleProof: Term = pair(
  refl(Nat, numeral(44)),
  pair(
    refl(Nat, numeral(156)),
    pair(
      refl(Nat, numeral(68)),
      pair(
        refl(Nat, numeral(20)),
        pair(
          refl(Nat, numeral(100)),
          pair(refl(Nat, numeral(244)), refl(Nat, { kind: 'Zero' })))))));
