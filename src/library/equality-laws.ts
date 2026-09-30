import { Term, Nat, Type, variable, pi, lambda, eq, refl, eqRec } from '../syntax/ast';

/** Equality reflexivity as a polymorphic theorem. */
export const eqReflType: Term = pi(Type, pi(variable(0), eq(variable(1), variable(0), variable(0)), 'x'), 'A');
export const eqReflProof: Term = lambda(Type, lambda(variable(0), refl(variable(1), variable(0)), 'x'), 'A');




/** A concrete, kernel-checked equality theorem for natural numbers. */
export const eqNatThreeType: Term = eq(Nat, { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } } }, { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } } });
export const eqNatThreeProof: Term = refl(Nat, { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } } });
