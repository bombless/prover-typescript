import { Term, Nat, Zero, variable, pi, lambda, app, succ, eq, refl } from '../syntax/ast';
import { sub } from './sub';
import { pred } from './pred';

/** sub n 0 = n; subtraction recurses on its second argument. */
export const subZeroType: Term = pi(Nat, eq(Nat, app(app(sub, variable(0)), Zero), variable(0)), 'n');
export const subZeroProof: Term = lambda(Nat, refl(Nat, variable(0)), 'n');

/** sub n (Succ m) = pred (sub n m). */
export const subSuccType: Term = pi(Nat, pi(Nat,
  eq(Nat,
    app(app(sub, variable(1)), succ(variable(0))),
    app(pred, app(app(sub, variable(1)), variable(0)))), 'm'), 'n');
export const subSuccProof: Term = lambda(Nat, lambda(Nat,
  refl(Nat, app(pred, app(app(sub, variable(1)), variable(0)))), 'm'), 'n');

/** Subtraction by two is two predecessor steps. */
export const subTwoType: Term = pi(Nat,
  eq(Nat, app(app(sub, variable(0)), succ(succ(Zero))),
    app(pred, app(pred, variable(0)))), 'n');
export const subTwoProof: Term = lambda(Nat,
  refl(Nat, app(pred, app(pred, variable(0)))), 'n');

/** Truncated subtraction by three is three predecessor steps. */
export const subThreeType: Term = pi(Nat,
  eq(Nat, app(app(sub, variable(0)), succ(succ(succ(Zero)))),
    app(pred, app(pred, app(pred, variable(0))))), 'n');
export const subThreeProof: Term = lambda(Nat,
  refl(Nat, app(pred, app(pred, app(pred, variable(0))))), 'n');

/** Truncated subtraction by four is four predecessor steps. */
const subFourExpr: Term = app(pred, app(pred, app(pred, app(pred, variable(0)))));
export const subFourType: Term = pi(Nat,
  eq(Nat, app(app(sub, variable(0)), succ(succ(succ(succ(Zero))))),
    subFourExpr), 'n');
export const subFourProof: Term = lambda(Nat,
  refl(Nat, subFourExpr), 'n');
