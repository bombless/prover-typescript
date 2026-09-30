import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { distanceSq } from './geometry-distance';
import { normSq } from './geometry-metrics';

export const Point2: Term = prod(Nat, Nat);
export const Triangle2: Term = prod(Point2, prod(Point2, Point2));
const a: Term = pair(numeral(1), numeral(2));
const b: Term = pair(numeral(3), numeral(4));
const c: Term = pair(numeral(5), numeral(6));
const d: Term = pair(numeral(1), numeral(2));
const ta: Term = app(app(translate, app(rotate90, app(app(scaleVec, numeral(2)), a))), d);
const tb: Term = app(app(translate, app(rotate90, app(app(scaleVec, numeral(2)), b))), d);
const tc: Term = app(app(translate, app(rotate90, app(app(scaleVec, numeral(2)), c))), d);

/** A three-stage triangle transform carries final vertices, edge metrics, and vertex norms. */
export const triangleScaleRotateTranslateBundleType: Term = prod(
  eq(Triangle2, pair(ta, pair(tb, tc)), pair(pair(numeral(5), numeral(4)), pair(pair(numeral(9), numeral(8)), pair(numeral(13), numeral(12))))),
  prod(
    eq(Nat, app(app(distanceSq, ta), tb), numeral(77)),
    prod(
      eq(Nat, app(app(distanceSq, tb), tc), numeral(213)),
      prod(
        eq(Nat, app(normSq, ta), numeral(41)),
        prod(
          eq(Nat, app(normSq, tb), numeral(145)),
          eq(Nat, app(normSq, tc), numeral(313)))))));

export const triangleScaleRotateTranslateBundleProof: Term = pair(
  refl(Triangle2, pair(pair(numeral(5), numeral(4)), pair(pair(numeral(9), numeral(8)), pair(numeral(13), numeral(12))))),
  pair(
    refl(Nat, numeral(77)),
    pair(
      refl(Nat, numeral(213)),
      pair(
        refl(Nat, numeral(41)),
        pair(refl(Nat, numeral(145)), refl(Nat, numeral(313)))))));
