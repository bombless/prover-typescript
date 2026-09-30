import { Term, Nat, prod, pair, app, eq, refl, fst, snd } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const u: Term = pair(numeral(2), numeral(5));

export const scaleTwoFstType: Term = eq(Nat, fst(app(app(scaleVec, numeral(2)), u)), numeral(4));
export const scaleTwoFstProof: Term = refl(Nat, numeral(4));
export const scaleTwoSndType: Term = eq(Nat, snd(app(app(scaleVec, numeral(2)), u)), numeral(10));
export const scaleTwoSndProof: Term = refl(Nat, numeral(10));
export const scaleThreeFstType: Term = eq(Nat, fst(app(app(scaleVec, numeral(3)), u)), numeral(6));
export const scaleThreeFstProof: Term = refl(Nat, numeral(6));
export const scaleThreeSndType: Term = eq(Nat, snd(app(app(scaleVec, numeral(3)), u)), numeral(15));
export const scaleThreeSndProof: Term = refl(Nat, numeral(15));
