import { Term, Nat, variable, pi, lambda, eq, refl, eqRec, succ } from '../syntax/ast';

/** Equality is symmetric for arbitrary natural numbers. */
export const natSymmType: Term = pi(Nat, pi(Nat,
  pi(eq(Nat, variable(1), variable(0)), eq(Nat, variable(1), variable(2)), 'h'), 'b'), 'a');
export const natSymmProof: Term = lambda(Nat, lambda(Nat, lambda(
  eq(Nat, variable(1), variable(0)),
  eqRec(lambda(Nat, eq(Nat, variable(0), variable(3))),
    refl(Nat, variable(2)), variable(2), variable(1), variable(0)), 'h'), 'b'), 'a');

/** Successor is compatible with equality, as a reusable function congruence. */
export const natSuccCongrType: Term = pi(Nat, pi(Nat,
  pi(eq(Nat, variable(1), variable(0)), eq(Nat, succ(variable(2)), succ(variable(1))), 'h'), 'b'), 'a');
export const natSuccCongrProof: Term = lambda(Nat, lambda(Nat, lambda(
  eq(Nat, variable(1), variable(0)),
  eqRec(lambda(Nat, eq(Nat, succ(variable(3)), succ(variable(0)))),
    refl(Nat, succ(variable(2))), variable(2), variable(1), variable(0)), 'h'), 'b'), 'a');

/** Equality is transitive for arbitrary natural numbers. */
export const natTransConcreteType: Term = eq(Nat, succ(succ({ kind: 'Zero' })), succ(succ({ kind: 'Zero' })));
export const natTransConcreteProof: Term = refl(Nat, succ(succ({ kind: 'Zero' })));
