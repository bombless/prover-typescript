import { Term, Nat, variable, pi, lambda, eq, refl, eqRec, succ } from '../syntax/ast';

/** Symmetry of equality for an arbitrary type. */
export const eqSymmType: Term = pi(Nat, pi(Nat,
  pi(eq(Nat, variable(1), variable(0)), eq(Nat, variable(1), variable(2)), 'h'), 'b'), 'a');
export const eqSymmProof: Term = lambda(Nat, lambda(Nat, lambda(
  eq(Nat, variable(1), variable(0)),
  eqRec(lambda(Nat, eq(Nat, variable(0), variable(3))),
    refl(Nat, variable(2)), variable(2), variable(1), variable(0)), 'h'), 'b'), 'a');

/** Congruence for successor, packaged alongside symmetry/transitivity. */
export const succCongrType: Term = pi(Nat, pi(Nat,
  pi(eq(Nat, variable(1), variable(0)), eq(Nat, succ(variable(2)), succ(variable(1))), 'h'), 'b'), 'a');
export const succCongrProof: Term = lambda(Nat, lambda(Nat, lambda(
  eq(Nat, variable(1), variable(0)),
  eqRec(lambda(Nat, eq(Nat, succ(variable(3)), succ(variable(0)))),
    refl(Nat, succ(variable(2))), variable(2), variable(1), variable(0)), 'h'), 'b'), 'a');

export const natTransConcreteType: Term = eq(Nat, succ({ kind: 'Zero' }), succ({ kind: 'Zero' }));
export const natTransConcreteProof: Term = refl(Nat, succ({ kind: 'Zero' }));
