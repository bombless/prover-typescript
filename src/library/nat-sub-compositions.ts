import { Term, Nat, Zero, variable, pi, lambda, app, succ, eq, refl } from '../syntax/ast';
import { sub } from './sub';
import { pred } from './pred';
import { numeral } from './nat';

/** Closed truncated subtraction computations. */
export const subConcreteType: Term = eq(Nat, app(app(sub, numeral(9)), numeral(4)), numeral(5));
export const subConcreteProof: Term = refl(Nat, numeral(5));
export const subUnderflowType: Term = eq(Nat, app(app(sub, numeral(3)), numeral(8)), Zero);
export const subUnderflowProof: Term = refl(Nat, Zero);

/** Subtracting one agrees with predecessor for a concrete input. */
export const subPredConcreteType: Term = eq(Nat, app(app(sub, numeral(7)), succ(Zero)), app(pred, numeral(7)));
export const subPredConcreteProof: Term = refl(Nat, numeral(6));

/** Several predecessor steps compute through subtraction. */
export const subThreeConcreteType: Term = eq(Nat, app(app(sub, numeral(10)), numeral(3)), numeral(7));
export const subThreeConcreteProof: Term = refl(Nat, numeral(7));

/** Subtraction by zero preserves any closed numeral. */
export const subZeroConcreteType: Term = eq(Nat, app(app(sub, numeral(12)), Zero), numeral(12));
export const subZeroConcreteProof: Term = refl(Nat, numeral(12));

/** A successor input and successor amount expose one predecessor step. */
export const subSuccSuccType: Term = pi(Nat,
  eq(Nat, app(app(sub, succ(variable(0))), succ(Zero)), variable(0)), 'n');
export const subSuccSuccProof: Term = lambda(Nat, refl(Nat, variable(0)), 'n');
