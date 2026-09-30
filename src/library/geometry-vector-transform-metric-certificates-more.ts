import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { normSq, dot2 } from './geometry-metrics';

export const Vec2: Term = prod(Nat, Nat);
const v: Term = pair(numeral(2), numeral(3));
const delta: Term = pair(numeral(4), numeral(1));
const moved: Term = app(app(translate, v), delta);
const turned: Term = app(rotate90, moved);
const reflected: Term = app(reflectX, turned);

export const movedType: Term = eq(Vec2, moved, pair(numeral(6), numeral(4)));
export const movedProof: Term = refl(Vec2, pair(numeral(6), numeral(4)));
export const turnedType: Term = eq(Vec2, turned, pair(numeral(4), numeral(6)));
export const turnedProof: Term = refl(Vec2, pair(numeral(4), numeral(6)));
export const reflectedType: Term = eq(Vec2, reflected, pair(numeral(4), numeral(6)));
export const reflectedProof: Term = refl(Vec2, pair(numeral(4), numeral(6)));
export const turnedNormType: Term = eq(Nat, app(normSq, turned), numeral(52));
export const turnedNormProof: Term = refl(Nat, numeral(52));
export const reflectedDotType: Term = eq(Nat, app(app(dot2, reflected), reflected), numeral(52));
export const reflectedDotProof: Term = refl(Nat, numeral(52));
