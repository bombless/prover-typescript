import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { dot2, normSq } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const u: Term = pair(numeral(2), numeral(3));
const v: Term = pair(numeral(1), numeral(4));

/** Dot, cross, and norm-square values for one concrete vector pair. */
export const vectorInvariantBundleType: Term = prod(
  eq(Nat, app(app(dot2, u), v), numeral(14)),
  prod(
    eq(Nat, app(app(cross2, u), v), numeral(11)),
    eq(Nat, app(normSq, u), numeral(13))));

export const vectorInvariantBundleProof: Term = pair(
  refl(Nat, numeral(14)),
  pair(
    refl(Nat, numeral(11)),
    refl(Nat, numeral(13))));
