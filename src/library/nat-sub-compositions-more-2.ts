import { Term, Nat, Zero, variable, pi, lambda, app, succ, eq, refl } from '../syntax/ast';
import { sub } from './sub';
import { pred } from './pred';

/** Subtracting zero preserves every natural number. */
export const subZeroParametricType: Term = pi(Nat,
  eq(Nat, app(app(sub, variable(0)), Zero), variable(0)), 'n');
export const subZeroParametricProof: Term = lambda(Nat, refl(Nat, variable(0)), 'n');

/** Subtracting a successor is one predecessor step. */
export const subSuccParametricType: Term = pi(Nat, pi(Nat,
  eq(Nat, app(app(sub, variable(1)), succ(variable(0))),
    app(pred, app(app(sub, variable(1)), variable(0)))), 'm'), 'n');
export const subSuccParametricProof: Term = lambda(Nat, lambda(Nat,
  refl(Nat, app(pred, app(app(sub, variable(1)), variable(0)))), 'm'), 'n');

/** Subtracting two is two predecessor steps. */
export const subTwiceParametricType: Term = pi(Nat,
  eq(Nat, app(app(sub, variable(0)), succ(succ(Zero))),
    app(pred, app(pred, variable(0)))), 'n');
export const subTwiceParametricProof: Term = lambda(Nat,
  refl(Nat, app(pred, app(pred, variable(0)))), 'n');
