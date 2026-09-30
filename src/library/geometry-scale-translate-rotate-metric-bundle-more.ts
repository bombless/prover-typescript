import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { normSq } from './geometry-metrics';
import { onCircle } from './geometry-circle';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(2), numeral(3));
const scaled: Term = app(app(scaleVec, numeral(2)), p);
const translated: Term = app(app(translate, scaled), pair(numeral(1), numeral(4)));
const turned: Term = app(rotate90, translated);

/** A concrete scale-translate-rotate chain carries its intermediate and final metric certificates. */
export const scaleTranslateRotateMetricBundleType: Term = prod(
  eq(Point2, scaled, pair(numeral(4), numeral(6))),
  prod(
    eq(Point2, translated, pair(numeral(5), numeral(10))),
    prod(
      eq(Point2, turned, pair(numeral(10), numeral(5))),
      prod(
        eq(Nat, app(normSq, turned), numeral(125)),
        app(app(onCircle, turned), pair(turned, numeral(125)))))));

export const scaleTranslateRotateMetricBundleProof: Term = pair(
  refl(Point2, pair(numeral(4), numeral(6))),
  pair(
    refl(Point2, pair(numeral(5), numeral(10))),
    pair(
      refl(Point2, pair(numeral(10), numeral(5))),
      pair(refl(Nat, numeral(125)), refl(Nat, numeral(125))))));
