import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { reflectX } from './geometry-reflections';
import { onCircle } from './geometry-circle';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const point: Term = pair(numeral(1), numeral(2));
const scaled: Term = app(app(scaleVec, numeral(2)), point);
const rotated: Term = app(rotate90, scaled);
const translated: Term = app(app(translate, rotated), pair(numeral(1), numeral(1)));
const finalPoint: Term = app(reflectX, translated);

/** A four-stage concrete point transform has a fully checked final certificate. */
export const fourStagePointCertificateType: Term = prod(
  eq(Point2, scaled, pair(numeral(2), numeral(4))),
  prod(
    eq(Point2, rotated, pair(numeral(4), numeral(2))),
    prod(
      eq(Point2, translated, pair(numeral(5), numeral(3))),
      prod(
        eq(Point2, finalPoint, pair(numeral(5), numeral(3))),
        prod(
          eq(Nat, app(normSq, finalPoint), numeral(34)),
          app(app(onCircle, finalPoint), pair(finalPoint, numeral(34))))))));

export const fourStagePointCertificateProof: Term = pair(
  refl(Point2, pair(numeral(2), numeral(4))),
  pair(
    refl(Point2, pair(numeral(4), numeral(2))),
    pair(
      refl(Point2, pair(numeral(5), numeral(3))),
      pair(
        refl(Point2, pair(numeral(5), numeral(3))),
        pair(refl(Nat, numeral(34)), refl(Nat, numeral(34)))))));
