import { Term, Nat, prod, pair, app, eq, refl, fst, snd } from '../syntax/ast';
import { translate } from './geometry-transform';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const u: Term = pair(numeral(2), numeral(5));
const d: Term = pair(numeral(3), numeral(4));
const t: Term = app(app(translate, u), d);

export const translateFstCoordinateType: Term = eq(Nat, fst(t), numeral(5));
export const translateFstCoordinateProof: Term = refl(Nat, numeral(5));
export const translateSndCoordinateType: Term = eq(Nat, snd(t), numeral(9));
export const translateSndCoordinateProof: Term = refl(Nat, numeral(9));
export const translateZeroFstType: Term = eq(Nat, fst(app(app(translate, u), pair({ kind: 'Zero' }, { kind: 'Zero' }))), numeral(2));
export const translateZeroFstProof: Term = refl(Nat, numeral(2));
export const translateZeroSndType: Term = eq(Nat, snd(app(app(translate, u), pair({ kind: 'Zero' }, { kind: 'Zero' }))), numeral(5));
export const translateZeroSndProof: Term = refl(Nat, numeral(5));
