import { Term, Nat, Zero, variable, pi, lambda, app, succ, eq, refl, natRec } from '../syntax/ast';
import { addTerm } from './nat';

/** n + 0 = n, exposed as a named library theorem alias. */
export const addRightZeroType: Term = pi(Nat, eq(Nat, addTerm(variable(0), Zero), variable(0)), 'n');

/** Zero plus n is definitionally n. */
export const addLeftZeroType: Term = pi(Nat, eq(Nat, addTerm(Zero, variable(0)), variable(0)), 'n');
export const addLeftZeroProof: Term = lambda(Nat, refl(Nat, variable(0)), 'n');

/** Succ n + m = Succ (n + m), the defining equation used by induction. */
export const addSuccLeftType: Term = pi(Nat, pi(Nat,
  eq(Nat, addTerm(succ(variable(1)), variable(0)), succ(addTerm(variable(1), variable(0)))), 'm'), 'n');
export const addSuccLeftProof: Term = lambda(Nat, lambda(Nat, refl(Nat, succ(addTerm(variable(1), variable(0)))), 'm'), 'n');

/** Adding two successors on the left unfolds to two successors. */
export const addSuccTwiceType: Term = pi(Nat, pi(Nat,
  eq(Nat, addTerm(succ(succ(variable(1))), variable(0)), succ(succ(addTerm(variable(1), variable(0))))), 'm'), 'n');
export const addSuccTwiceProof: Term = lambda(Nat, lambda(Nat, refl(Nat, succ(succ(addTerm(variable(1), variable(0))))), 'm'), 'n');

/** Adding three successors on the left unfolds to three successors. */
export const addSuccTripleType: Term = pi(Nat, pi(Nat,
  eq(Nat, addTerm(succ(succ(succ(variable(1)))), variable(0)),
    succ(succ(succ(addTerm(variable(1), variable(0)))))), 'm'), 'n');
export const addSuccTripleProof: Term = lambda(Nat, lambda(Nat,
  refl(Nat, succ(succ(succ(addTerm(variable(1), variable(0)))))), 'm'), 'n');

/** Adding zero on the left is an explicit reusable theorem alias. */
export const addLeftZeroAliasType: Term = pi(Nat, eq(Nat, addTerm(Zero, variable(0)), variable(0)), 'n');
export const addLeftZeroAliasProof: Term = lambda(Nat, refl(Nat, variable(0)), 'n');

/** Three nested successor additions normalize predictably. */
export const addSuccFourType: Term = pi(Nat, pi(Nat,
  eq(Nat, addTerm(succ(succ(succ(succ(variable(1))))), variable(0)),
    succ(succ(succ(succ(addTerm(variable(1), variable(0))))))), 'm'), 'n');
export const addSuccFourProof: Term = lambda(Nat, lambda(Nat,
  refl(Nat, succ(succ(succ(succ(addTerm(variable(1), variable(0))))))), 'm'), 'n');
