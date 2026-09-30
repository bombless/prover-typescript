import { Term, Nat, prod, pair, app, eq, refl, fst, snd } from '../syntax/ast';
import { addVec2 } from './geometry-vectors';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const u: Term = pair(numeral(4), numeral(1));
const v: Term = pair(numeral(3), numeral(6));
const z: Term = pair({ kind: 'Zero' }, { kind: 'Zero' });

export const sumFstType: Term = eq(Nat, fst(app(app(addVec2, u), v)), numeral(7));
export const sumFstProof: Term = refl(Nat, numeral(7));
export const sumSndType: Term = eq(Nat, snd(app(app(addVec2, u), v)), numeral(7));
export const sumSndProof: Term = refl(Nat, numeral(7));
export const zeroLeftFstType: Term = eq(Nat, fst(app(app(addVec2, z), u)), numeral(4));
export const zeroLeftFstProof: Term = refl(Nat, numeral(4));
export const zeroRightSndType: Term = eq(Nat, snd(app(app(addVec2, u), z)), numeral(1));
export const zeroRightSndProof: Term = refl(Nat, numeral(1));
