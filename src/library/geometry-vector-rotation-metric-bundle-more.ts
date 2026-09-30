import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { dot2, normSq } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const u: Term = pair(numeral(2), numeral(3));
const v: Term = pair(numeral(4), numeral(5));
const ru: Term = app(rotate90, u);
const rv: Term = app(rotate90, v);

/** Rotated concrete vectors carry coordinates, dot, cross, and norm certificates. */
export const vectorRotationMetricBundleType: Term = prod(
  eq(Vec2, ru, pair(numeral(3), numeral(2))),
  prod(
    eq(Vec2, rv, pair(numeral(5), numeral(4))),
    prod(
      eq(Nat, app(app(dot2, ru), rv), numeral(23)),
      prod(
        eq(Nat, app(app(cross2, ru), rv), numeral(22)),
        prod(
          eq(Nat, app(normSq, ru), numeral(13)),
          eq(Nat, app(normSq, rv), numeral(41)))))));

export const vectorRotationMetricBundleProof: Term = pair(
  refl(Vec2, pair(numeral(3), numeral(2))),
  pair(
    refl(Vec2, pair(numeral(5), numeral(4))),
    pair(
      refl(Nat, numeral(23)),
      pair(
        refl(Nat, numeral(22)),
        pair(refl(Nat, numeral(13)), refl(Nat, numeral(41)))))));
