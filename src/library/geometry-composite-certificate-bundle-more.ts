import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { addVec2 } from './geometry-vectors';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const p = pair(numeral(3), numeral(2));
const sum = app(app(addVec2, p), pair(numeral(1), numeral(4)));
const scaled = app(app(scaleVec, numeral(2)), sum);
const rotated = app(rotate90, scaled);
const translated = app(app(translate, rotated), pair(numeral(1), numeral(3)));
const finalPoint = app(reflectX, translated);

/** A single product packages all stages of a concrete affine computation. */
export const compositeCertificateBundleType: Term = prod(
  eq(Vec2, sum, pair(numeral(4), numeral(6))),
  prod(
    eq(Vec2, scaled, pair(numeral(8), numeral(12))),
    prod(
      eq(Vec2, rotated, pair(numeral(12), numeral(8))),
      prod(
        eq(Vec2, finalPoint, pair(numeral(13), numeral(11))),
        eq(Nat, app(normSq, finalPoint), numeral(290))))));

export const compositeCertificateBundleProof: Term = pair(
  refl(Vec2, pair(numeral(4), numeral(6))),
  pair(
    refl(Vec2, pair(numeral(8), numeral(12))),
    pair(
      refl(Vec2, pair(numeral(12), numeral(8))),
      pair(
        refl(Vec2, pair(numeral(13), numeral(11))),
        refl(Nat, numeral(290))))));
