import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { addVec2 } from './geometry-vectors';
import { rotate90 } from './geometry-rotations';
import { scaleVec } from './geometry-scalar';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const u: Term = pair(numeral(1), numeral(2));
const v: Term = pair(numeral(3), numeral(4));
const sum: Term = app(app(addVec2, u), v);
const transformed: Term = app(rotate90, app(app(scaleVec, numeral(2)), sum));

/** A vector transform chain and its final norm-square are jointly certified. */
export const vectorTransformCertificateType: Term = prod(
  eq(Vec2, transformed, pair(numeral(12), numeral(8))),
  eq(Nat, app(normSq, transformed), numeral(208)));

export const vectorTransformCertificateProof: Term = pair(
  refl(Vec2, pair(numeral(12), numeral(8))),
  refl(Nat, numeral(208)));
