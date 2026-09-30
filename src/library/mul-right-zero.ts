import { Term, Nat, Zero, variable, pi, lambda, natRec, app, eq, refl } from '../syntax/ast';
import { mulTerm } from './mul';

/** n * 0 = 0, proved by induction on n. */
const motive: Term = lambda(Nat, eq(Nat, mulTerm(variable(0), Zero), Zero), 'n');
const step: Term = lambda(Nat, lambda(app(motive, variable(0)), variable(0), 'ih'), 'n');

export const mulRightZeroType: Term = pi(Nat, eq(Nat, mulTerm(variable(0), Zero), Zero), 'n');
export const mulRightZeroProof: Term = lambda(Nat, natRec(motive, refl(Nat, Zero), step, variable(0)), 'n');
