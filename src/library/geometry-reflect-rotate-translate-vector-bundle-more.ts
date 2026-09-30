import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { normSq, dot2 } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const v = pair(numeral(2), numeral(3));
const w = pair(numeral(1), numeral(4));
const tv = app(app(translate, app(reflectX, app(rotate90, v))), pair(numeral(2), numeral(1)));
const tw = app(app(translate, app(reflectX, app(rotate90, w))), pair(numeral(2), numeral(1)));

export const vType: Term = eq(Vec2, tv, pair(numeral(5), numeral(3)));
export const vProof: Term = refl(Vec2, pair(numeral(5), numeral(3)));
export const wType: Term = eq(Vec2, tw, pair(numeral(6), numeral(2)));
export const wProof: Term = refl(Vec2, pair(numeral(6), numeral(2)));
export const vNormType: Term = eq(Nat, app(normSq, tv), numeral(34));
export const vNormProof: Term = refl(Nat, numeral(34));
export const wNormType: Term = eq(Nat, app(normSq, tw), numeral(40));
export const wNormProof: Term = refl(Nat, numeral(40));
export const dotType: Term = eq(Nat, app(app(dot2, tv), tw), numeral(36));
export const dotProof: Term = refl(Nat, numeral(36));
export const crossType: Term = eq(Nat, app(app(cross2, tv), tw), numeral(28));
export const crossProof: Term = refl(Nat, numeral(28));
