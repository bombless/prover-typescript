import { Term, Nat, Zero, succ, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { pred } from './pred';

/** Closed predecessor chains reduce through Nat.rec. */
export const predNineType: Term = eq(Nat, app(pred, numeral(9)), numeral(8));
export const predNineProof: Term = refl(Nat, numeral(8));
export const predPredNineType: Term = eq(Nat, app(pred, app(pred, numeral(9))), numeral(7));
export const predPredNineProof: Term = refl(Nat, numeral(7));
export const predZeroAgainType: Term = eq(Nat, app(pred, app(pred, Zero)), Zero);
export const predZeroAgainProof: Term = refl(Nat, Zero);

/** Successor followed by predecessor computes on a concrete numeral. */
export const predSuccSevenType: Term = eq(Nat, app(pred, succ(numeral(7))), numeral(7));
export const predSuccSevenProof: Term = refl(Nat, numeral(7));
