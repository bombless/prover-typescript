import { Term, Nat, eq, refl, app } from '../syntax/ast';
import { numeral } from './nat';
import { mulTerm } from './mul';
import { powTerm } from './pow';

/** Closed multiplication and exponentiation certificates checked by reduction. */
export const mulConcreteType: Term = eq(Nat, mulTerm(numeral(6), numeral(7)), numeral(42));
export const mulConcreteProof: Term = refl(Nat, numeral(42));

export const mulNestedType: Term = eq(Nat, mulTerm(numeral(3), mulTerm(numeral(4), numeral(5))), numeral(60));
export const mulNestedProof: Term = refl(Nat, numeral(60));

export const powConcreteType: Term = eq(Nat, powTerm(numeral(2), numeral(5)), numeral(32));
export const powConcreteProof: Term = refl(Nat, numeral(32));

export const powMulCompositionType: Term = eq(Nat, mulTerm(powTerm(numeral(2), numeral(3)), numeral(4)), numeral(32));
export const powMulCompositionProof: Term = refl(Nat, numeral(32));

export const mulZeroRightType: Term = eq(Nat, mulTerm(numeral(9), { kind: 'Zero' }), { kind: 'Zero' });
export const mulZeroRightProof: Term = refl(Nat, { kind: 'Zero' });
