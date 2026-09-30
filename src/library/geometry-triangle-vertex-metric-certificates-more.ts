import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { dot2, normSq } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const a: Term = pair(numeral(1), numeral(2));
const b: Term = pair(numeral(3), numeral(4));
const c: Term = pair(numeral(5), numeral(6));

export const vertexADotType: Term = eq(Nat, app(app(dot2, a), a), numeral(5));
export const vertexADotProof: Term = refl(Nat, numeral(5));
export const vertexANormType: Term = eq(Nat, app(normSq, a), numeral(5));
export const vertexANormProof: Term = refl(Nat, numeral(5));
export const vertexACrossType: Term = eq(Nat, app(app(cross2, a), a), numeral(4));
export const vertexACrossProof: Term = refl(Nat, numeral(4));

export const vertexBDotType: Term = eq(Nat, app(app(dot2, b), b), numeral(25));
export const vertexBDotProof: Term = refl(Nat, numeral(25));
export const vertexBNormType: Term = eq(Nat, app(normSq, b), numeral(25));
export const vertexBNormProof: Term = refl(Nat, numeral(25));
export const vertexBCrossType: Term = eq(Nat, app(app(cross2, b), b), numeral(24));
export const vertexBCrossProof: Term = refl(Nat, numeral(24));

export const vertexCDotType: Term = eq(Nat, app(app(dot2, c), c), numeral(61));
export const vertexCDotProof: Term = refl(Nat, numeral(61));
export const vertexCNormType: Term = eq(Nat, app(normSq, c), numeral(61));
export const vertexCNormProof: Term = refl(Nat, numeral(61));
export const vertexCCrossType: Term = eq(Nat, app(app(cross2, c), c), numeral(60));
export const vertexCCrossProof: Term = refl(Nat, numeral(60));
