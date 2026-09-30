import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { dot2, normSq } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const u: Term = pair(numeral(2), numeral(5));
const v: Term = pair(numeral(1), numeral(3));

export const uvDotType: Term = eq(Nat, app(app(dot2, u), v), numeral(17));
export const uvDotProof: Term = refl(Nat, numeral(17));
export const uvCrossType: Term = eq(Nat, app(app(cross2, u), v), numeral(11));
export const uvCrossProof: Term = refl(Nat, numeral(11));
export const uNormType: Term = eq(Nat, app(normSq, u), numeral(29));
export const uNormProof: Term = refl(Nat, numeral(29));
export const vNormType: Term = eq(Nat, app(normSq, v), numeral(10));
export const vNormProof: Term = refl(Nat, numeral(10));
