import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { addVec2 } from './geometry-vectors';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const u: Term = pair(numeral(1), numeral(2));
const v: Term = pair(numeral(3), numeral(4));
const sum: Term = app(app(addVec2, u), v);
const scaled: Term = app(app(scaleVec, numeral(2)), sum);

/** Intermediate sum, scaled result, and rotated result are all certified. */
export const stagedTransformType: Term = prod(
  eq(Vec2, sum, pair(numeral(4), numeral(6))),
  prod(
    eq(Vec2, scaled, pair(numeral(8), numeral(12))),
    eq(Vec2, app(rotate90, scaled), pair(numeral(12), numeral(8)))));

export const stagedTransformProof: Term = pair(
  refl(Vec2, pair(numeral(4), numeral(6))),
  pair(
    refl(Vec2, pair(numeral(8), numeral(12))),
    refl(Vec2, pair(numeral(12), numeral(8)))));
