import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { reflectX } from './geometry-reflections';
import { dot2, normSq } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const v: Term = pair(numeral(1), numeral(2));
const scaled: Term = app(app(scaleVec, numeral(2)), v);
const rotated: Term = app(rotate90, scaled);
const translated: Term = app(app(translate, rotated), pair(numeral(1), numeral(1)));
const finalVec: Term = app(reflectX, translated);
const w: Term = pair(numeral(2), numeral(1));

/** A four-stage vector transform carries final coordinates and three metric certificates. */
export const fourStageVectorMetricBundleType: Term = prod(
  eq(Vec2, finalVec, pair(numeral(5), numeral(3))),
  prod(
    eq(Nat, app(normSq, finalVec), numeral(34)),
    prod(
      eq(Nat, app(app(dot2, finalVec), w), numeral(13)),
      eq(Nat, app(app(cross2, finalVec), w), numeral(11)))));

export const fourStageVectorMetricBundleProof: Term = pair(
  refl(Vec2, pair(numeral(5), numeral(3))),
  pair(
    refl(Nat, numeral(34)),
    pair(refl(Nat, numeral(13)), refl(Nat, numeral(11)))));
