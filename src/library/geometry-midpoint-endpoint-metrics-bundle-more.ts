import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { midpoint } from './geometry-segment';
import { distanceSq } from './geometry-distance';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(2), numeral(3));
const q: Term = pair(numeral(4), numeral(5));
const m: Term = app(app(midpoint, p), q);

/** The discrete midpoint and its two endpoint metric certificates are bundled together. */
export const midpointEndpointMetricsBundleType: Term = prod(
  eq(Point2, m, pair(numeral(2), numeral(5))),
  prod(
    eq(Nat, app(app(distanceSq, m), p), numeral(19)),
    eq(Nat, app(app(distanceSq, m), q), numeral(33))));

export const midpointEndpointMetricsBundleProof: Term = pair(
  refl(Point2, pair(numeral(2), numeral(5))),
  pair(refl(Nat, numeral(19)), refl(Nat, numeral(33))));
