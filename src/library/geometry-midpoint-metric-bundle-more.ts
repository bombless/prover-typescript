import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { midpoint } from './geometry-segment';
import { distanceSq } from './geometry-distance';
import { normSq } from './geometry-metrics';
import { onCircle } from './geometry-circle';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(2), numeral(3));
const q: Term = pair(numeral(4), numeral(5));
const m: Term = app(app(midpoint, p), q);

/** A concrete midpoint carries its coordinates, norm, distance from an endpoint, and circle membership. */
export const midpointMetricBundleType: Term = prod(
  eq(Point2, m, pair(numeral(2), numeral(5))),
  prod(
    eq(Nat, app(normSq, m), numeral(29)),
    prod(
      eq(Nat, app(app(distanceSq, m), p), numeral(19)),
      app(app(onCircle, m), pair(m, numeral(29))))));

export const midpointMetricBundleProof: Term = pair(
  refl(Point2, pair(numeral(2), numeral(5))),
  pair(
    refl(Nat, numeral(29)),
    pair(refl(Nat, numeral(19)), refl(Nat, numeral(29)))));
