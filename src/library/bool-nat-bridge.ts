import { Term, Nat, Bool, True, False, Zero, variable, pi, lambda, succ, natRec, eq, refl } from '../syntax/ast';
import { isZero } from './nat-predicates';

/** A Boolean guard that returns a Nat witness: zero stays zero, successors
 * return one. This gives a simple bridge from propositions to arithmetic. */
export const boolToNat: Term = lambda(Bool, natRec(lambda(Bool, Nat), { kind: 'Succ', value: Zero }, Zero, variable(0)), 'b');
export const boolToNatType: Term = pi(Bool, Nat, 'b');
export const trueToNatType: Term = eq(Nat, { kind: 'Succ', value: Zero }, { kind: 'Succ', value: Zero });
export const trueToNatProof: Term = refl(Nat, { kind: 'Succ', value: Zero });
export const falseToNatType: Term = eq(Nat, Zero, Zero);
export const falseToNatProof: Term = refl(Nat, Zero);
