import { Term, Nat, Zero, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { pred } from './pred';
import { sub } from './sub';

/** Predecessor and truncated subtraction compose on closed numerals. */
export const predSubType: Term = eq(Nat, app(pred, app(app(sub, numeral(12)), numeral(5))), numeral(6));
export const predSubProof: Term = refl(Nat, numeral(6));

export const subPredType: Term = eq(Nat, app(app(sub, app(pred, numeral(12))), numeral(5)), numeral(6));
export const subPredProof: Term = refl(Nat, numeral(6));

export const underflowPredType: Term = eq(Nat, app(pred, app(app(sub, numeral(3)), numeral(8))), Zero);
export const underflowPredProof: Term = refl(Nat, Zero);
