import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { reflectX } from './geometry-reflections';
import { scaleVec } from './geometry-scalar';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);

/** Reflection after scaling computes a concrete vector. */
export const reflectScaleType: Term = eq(Vec2,
  app(reflectX, app(app(scaleVec, numeral(3)), pair(numeral(2), numeral(4)))),
  pair(numeral(6), numeral(12)));
export const reflectScaleProof: Term = refl(Vec2, pair(numeral(6), numeral(12)));

/** The reflected scaled vector's norm is directly computable. */
export const reflectScaleNormType: Term = eq(Nat,
  app(normSq, app(reflectX, app(app(scaleVec, numeral(3)), pair(numeral(2), numeral(4))))), numeral(180));
export const reflectScaleNormProof: Term = refl(Nat, numeral(180));
