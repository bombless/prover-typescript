import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { distanceSq } from './geometry-distance';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const a: Term = pair(numeral(2), numeral(1));
const b: Term = pair(numeral(4), numeral(3));
const c: Term = pair(numeral(6), numeral(5));

export const edgeABType: Term = eq(Nat, app(app(distanceSq, a), b), numeral(11));
export const edgeABProof: Term = refl(Nat, numeral(11));
export const edgeBCType: Term = eq(Nat, app(app(distanceSq, b), c), numeral(39));
export const edgeBCProof: Term = refl(Nat, numeral(39));
export const edgeCAType: Term = eq(Nat, app(app(distanceSq, c), a), numeral(17));
export const edgeCAProof: Term = refl(Nat, numeral(17));
