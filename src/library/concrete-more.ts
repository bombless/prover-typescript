import { Term, Nat, Bool, True, False, Zero, succ, eq, refl } from '../syntax/ast';
import { numeral, addTerm } from './nat';
import { mulTerm } from './mul';
import { powTerm } from './pow';
import { pred } from './pred';
import { sub } from './sub';
import { boolNot } from './bool';

/** Additional closed computation certificates. */
export const addEightSevenType: Term = eq(Nat, addTerm(numeral(8), numeral(7)), numeral(15));
export const addEightSevenProof: Term = refl(Nat, numeral(15));
export const mulThreeFiveType: Term = eq(Nat, mulTerm(numeral(3), numeral(5)), numeral(15));
export const mulThreeFiveProof: Term = refl(Nat, numeral(15));
export const powThreeThreeType: Term = eq(Nat, powTerm(numeral(3), numeral(3)), numeral(27));
export const powThreeThreeProof: Term = refl(Nat, numeral(27));
export const predSixType: Term = eq(Nat, { kind: 'App', fn: pred, arg: succ(numeral(5)) }, numeral(5));
export const predSixProof: Term = refl(Nat, numeral(5));
export const subNineFourType: Term = eq(Nat, { kind: 'App', fn: { kind: 'App', fn: sub, arg: numeral(9) }, arg: numeral(4) }, numeral(5));
export const subNineFourProof: Term = refl(Nat, numeral(5));
export const notTrueConcreteType: Term = eq(Bool, { kind: 'App', fn: boolNot, arg: True }, False);
export const notTrueConcreteProof: Term = refl(Bool, False);
export const notFalseConcreteType: Term = eq(Bool, { kind: 'App', fn: boolNot, arg: False }, True);
export const notFalseConcreteProof: Term = refl(Bool, True);
