import { Term, Nat, Zero, variable, pi, lambda, eq, refl } from '../syntax/ast';
import { mulTerm } from './mul';

/** 0 * n = 0 by the defining equation of multiplication. */
export const mulZeroType: Term = pi(Nat, eq(Nat, mulTerm(Zero, variable(0)), Zero), 'n');
export const mulZeroProof: Term = lambda(Nat, refl(Nat, Zero), 'n');

/** A concrete arithmetic proof useful as a regression/example theorem. */
export const mulTwoThreeType: Term = eq(Nat, mulTerm({ kind: 'Succ', value: { kind: 'Succ', value: Zero } }, { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: Zero } } }), { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } } } } });
export const mulTwoThreeProof: Term = refl(Nat, { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: Zero } } } } });
