import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { normSq, dot2 } from './geometry-metrics';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const v = pair(numeral(4), numeral(1));
const translated = app(app(translate, v), pair(numeral(2), numeral(3)));
const rotated = app(rotate90, translated);
const reflected = app(reflectX, rotated);

export const translatedType: Term = eq(Vec2, translated, pair(numeral(6), numeral(4)));
export const translatedProof: Term = refl(Vec2, pair(numeral(6), numeral(4)));
export const rotatedType: Term = eq(Vec2, rotated, pair(numeral(4), numeral(6)));
export const rotatedProof: Term = refl(Vec2, pair(numeral(4), numeral(6)));
export const reflectedType: Term = eq(Vec2, reflected, pair(numeral(4), numeral(6)));
export const reflectedProof: Term = refl(Vec2, pair(numeral(4), numeral(6)));
export const rotatedNormType: Term = eq(Nat, app(normSq, rotated), numeral(52));
export const rotatedNormProof: Term = refl(Nat, numeral(52));
export const reflectedDotType: Term = eq(Nat, app(app(dot2, reflected), reflected), numeral(52));
export const reflectedDotProof: Term = refl(Nat, numeral(52));
