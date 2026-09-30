import { Term, Nat, prod, pair, app, eq, refl, fst, snd } from '../syntax/ast';
import { addVec2 } from './geometry-vectors';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const u: Term = pair(numeral(2), numeral(1));
const v: Term = pair(numeral(3), numeral(4));
const sum: Term = app(app(addVec2, u), v);

/** A concrete vector sum carries both projections and its norm-square. */
export const vectorSumProjectionBundleType: Term = prod(
  eq(Nat, fst(sum), numeral(5)),
  prod(
    eq(Nat, snd(sum), numeral(5)),
    eq(Nat, app(normSq, sum), numeral(50))));

export const vectorSumProjectionBundleProof: Term = pair(
  refl(Nat, numeral(5)),
  pair(refl(Nat, numeral(5)), refl(Nat, numeral(50))));
