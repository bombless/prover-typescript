import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { translate } from './geometry-transform';
import { dot2, normSq } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(1), numeral(2));
const d: Term = pair(numeral(3), numeral(4));
const moved: Term = app(app(translate, p), d);

/** A translated vector is accompanied by concrete norm, dot, and cross certificates. */
export const translationVectorMetricBundleType: Term = prod(
  eq(Vec2, moved, pair(numeral(4), numeral(6))),
  prod(
    eq(Nat, app(normSq, moved), numeral(52)),
    prod(
      eq(Nat, app(app(dot2, moved), d), numeral(36)),
      eq(Nat, app(app(cross2, moved), d), numeral(34)))));

export const translationVectorMetricBundleProof: Term = pair(
  refl(Vec2, pair(numeral(4), numeral(6))),
  pair(
    refl(Nat, numeral(52)),
    pair(refl(Nat, numeral(36)), refl(Nat, numeral(34)))));
