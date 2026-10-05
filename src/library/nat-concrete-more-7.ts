import { Term, Nat, Zero, app, eq, refl, succ } from '../syntax/ast';
import { numeral, addTerm } from './nat';
import { mulTerm } from './mul';
import { pow } from './pow';
import { pred } from './pred';
import { sub } from './sub';

/** Additional closed arithmetic certificates checked by definitional equality. */
export const addLargeType: Term = eq(Nat, addTerm(numeral(27), numeral(15)), numeral(42));
export const addLargeProof: Term = refl(Nat, numeral(42));

export const mulSevenType: Term = eq(Nat, mulTerm(numeral(7), numeral(8)), numeral(56));
export const mulSevenProof: Term = refl(Nat, numeral(56));

export const powThreeType: Term = eq(Nat, app(app(pow, numeral(3)), numeral(4)), numeral(81));
export const powThreeProof: Term = refl(Nat, numeral(81));

export const predLargeType: Term = eq(Nat, app(pred, numeral(64)), numeral(63));
export const predLargeProof: Term = refl(Nat, numeral(63));

export const subLargeType: Term = eq(Nat, app(app(sub, numeral(42)), numeral(19)), numeral(23));
export const subLargeProof: Term = refl(Nat, numeral(23));

export const mixedArithmeticType: Term = eq(Nat, addTerm(mulTerm(numeral(6), numeral(7)), app(app(sub, numeral(20)), numeral(8))), numeral(54));
export const mixedArithmeticProof: Term = refl(Nat, numeral(54));

export const successorArithmeticType: Term = eq(Nat, succ(addTerm(numeral(18), numeral(23))), numeral(42));
export const successorArithmeticProof: Term = refl(Nat, numeral(42));

export const underflowLargeType: Term = eq(Nat, app(app(sub, numeral(11)), numeral(25)), Zero);
export const underflowLargeProof: Term = refl(Nat, Zero);
