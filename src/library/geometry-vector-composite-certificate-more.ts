import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { addVec2 } from './geometry-vectors';
import { dot2 } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const u: Term = pair(numeral(1), numeral(2));
const v: Term = pair(numeral(3), numeral(4));

/** A concrete vector pair carries sum, dot, and cross certificates together. */
export const vectorCompositeCertificateType: Term = prod(
  eq(Vec2, app(app(addVec2, u), v), pair(numeral(4), numeral(6))),
  prod(
    eq(Nat, app(app(dot2, u), v), numeral(11)),
    eq(Nat, app(app(cross2, u), v), numeral(10))));

export const vectorCompositeCertificateProof: Term = pair(
  refl(Vec2, pair(numeral(4), numeral(6))),
  pair(refl(Nat, numeral(11)), refl(Nat, numeral(10))));
