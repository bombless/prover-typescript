import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { onCircle } from './geometry-circle';
import { normSq, dot2 } from './geometry-metrics';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const v: Term = pair(numeral(2), numeral(3));
const scaled: Term = app(app(scaleVec, numeral(2)), v);

/** A scaled vector carries coordinates, norm, dot, and circle certificates. */
export const scaleCircleMetricBundleType: Term = prod(
  eq(Vec2, scaled, pair(numeral(4), numeral(6))),
  prod(
    eq(Nat, app(normSq, scaled), numeral(52)),
    prod(
      eq(Nat, app(app(dot2, scaled), v), numeral(26)),
      app(app(onCircle, scaled), pair(scaled, numeral(52))))));

export const scaleCircleMetricBundleProof: Term = pair(
  refl(Vec2, pair(numeral(4), numeral(6))),
  pair(
    refl(Nat, numeral(52)),
    pair(refl(Nat, numeral(26)), refl(Nat, numeral(52)))));
