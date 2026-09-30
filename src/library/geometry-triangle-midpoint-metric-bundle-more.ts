import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { distanceSq } from './geometry-distance';
import { midpointDiscrete } from './geometry-barycentric';
import { twiceArea } from './geometry-area';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const a: Term = pair(numeral(1), numeral(2));
const b: Term = pair(numeral(3), numeral(4));
const c: Term = pair(numeral(5), numeral(6));

/** One concrete triangle carries its midpoint, two side measurements, and area certificate. */
export const triangleMidpointMetricBundleType: Term = prod(
  eq(Point2, app(app(midpointDiscrete, a), b), pair(numeral(1), numeral(4))),
  prod(
    eq(Nat, app(app(distanceSq, a), b), numeral(11)),
    prod(
      eq(Nat, app(app(distanceSq, b), c), numeral(39)),
      eq(Nat, app(app(app(twiceArea, a), b), c), { kind: 'Zero' }))));

export const triangleMidpointMetricBundleProof: Term = pair(
  refl(Point2, pair(numeral(1), numeral(4))),
  pair(
    refl(Nat, numeral(11)),
    pair(refl(Nat, numeral(39)), refl(Nat, { kind: 'Zero' }))));
