import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { normSq, dot2 } from './geometry-metrics';
import { scaleVec } from './geometry-scalar';
import { addVec2 } from './geometry-vectors';
import { translate } from './geometry-transform';

export const Vec2: Term = prod(Nat, Nat);

/** Norm of a concrete scaled vector sum computes. */
export const scaledSumNormType: Term = eq(Nat,
  app(normSq, app(app(scaleVec, numeral(2)), app(app(addVec2, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4))))), numeral(208));
export const scaledSumNormProof: Term = refl(Nat, numeral(208));

/** Dot product of a translated scaled vector with a concrete vector computes. */
export const translatedScaledDotType: Term = eq(Nat,
  app(app(dot2, app(app(translate, pair(numeral(1), numeral(1))), app(app(scaleVec, numeral(2)), pair(numeral(2), numeral(3))))), pair(numeral(1), numeral(2))), numeral(19));
export const translatedScaledDotProof: Term = refl(Nat, numeral(19));

/** A nested metric expression remains kernel reducible. */
export const nestedMetricType: Term = eq(Nat,
  app(normSq, app(app(translate, pair(numeral(2), numeral(3))), app(app(addVec2, pair(numeral(1), numeral(1))), pair(numeral(2), numeral(2))))), numeral(61));
export const nestedMetricProof: Term = refl(Nat, numeral(61));
