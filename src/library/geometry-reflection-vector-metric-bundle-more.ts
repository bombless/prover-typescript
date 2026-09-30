import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { reflectX } from './geometry-reflections';
import { dot2, normSq } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const u: Term = pair(numeral(2), numeral(5));
const v: Term = pair(numeral(3), numeral(4));
const ru: Term = app(reflectX, u);
const rv: Term = app(reflectX, v);

/** Reflected vectors carry concrete coordinates and all three basic metric certificates. */
export const reflectionVectorMetricBundleType: Term = prod(
  eq(Vec2, ru, pair(numeral(2), numeral(5))),
  prod(
    eq(Vec2, rv, pair(numeral(3), numeral(4))),
    prod(
      eq(Nat, app(app(dot2, ru), rv), numeral(26)),
      prod(
        eq(Nat, app(app(cross2, ru), rv), numeral(23)),
        prod(
          eq(Nat, app(normSq, ru), numeral(29)),
          eq(Nat, app(normSq, rv), numeral(25)))))));

export const reflectionVectorMetricBundleProof: Term = pair(
  refl(Vec2, pair(numeral(2), numeral(5))),
  pair(
    refl(Vec2, pair(numeral(3), numeral(4))),
    pair(
      refl(Nat, numeral(26)),
      pair(
        refl(Nat, numeral(23)),
        pair(refl(Nat, numeral(29)), refl(Nat, numeral(25)))))));
