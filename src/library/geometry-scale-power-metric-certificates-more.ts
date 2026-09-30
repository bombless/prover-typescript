import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { normSq } from './geometry-metrics';
import { scaleVec } from './geometry-scalar';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(3), numeral(4));

/** Concrete scale factors produce the expected norm-square values. */
export const scaleThreeNormType: Term = eq(Nat, app(normSq, app(app(scaleVec, numeral(3)), p)), numeral(225));
export const scaleThreeNormProof: Term = refl(Nat, numeral(225));
export const scaleFourNormType: Term = eq(Nat, app(normSq, app(app(scaleVec, numeral(4)), p)), numeral(400));
export const scaleFourNormProof: Term = refl(Nat, numeral(400));

/** Nested scaling computes the norm-square of the resulting vector. */
export const nestedScaleNormType: Term = eq(Nat,
  app(normSq, app(app(scaleVec, numeral(2)), app(app(scaleVec, numeral(3)), p))), numeral(900));
export const nestedScaleNormProof: Term = refl(Nat, numeral(900));
