import { Term, Nat, eq, refl } from '../syntax/ast';
import { addTerm, numeral } from './nat';

export const addCommConcreteType: Term = eq(Nat, addTerm(numeral(4), numeral(9)), addTerm(numeral(9), numeral(4)));
export const addCommConcreteProof: Term = refl(Nat, numeral(13));
export const addAssocConcreteType: Term = eq(Nat, addTerm(addTerm(numeral(1), numeral(2)), numeral(3)), addTerm(numeral(1), addTerm(numeral(2), numeral(3))));
export const addAssocConcreteProof: Term = refl(Nat, numeral(6));
