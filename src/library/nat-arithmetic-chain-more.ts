import { Term, Nat, eq, refl, app } from '../syntax/ast';
import { numeral, addTerm } from './nat';
import { mulTerm } from './mul';
import { powTerm } from './pow';
import { sub } from './sub';

/** Longer closed arithmetic chains reduce through nested Nat.rec definitions. */
export const chainOneType: Term = eq(Nat,
  addTerm(mulTerm(numeral(7), numeral(8)), powTerm(numeral(2), numeral(4))), numeral(72));
export const chainOneProof: Term = refl(Nat, numeral(72));

export const chainTwoType: Term = eq(Nat,
  app(app(sub, addTerm(mulTerm(numeral(9), numeral(6)), numeral(5))), numeral(7)), numeral(52));
export const chainTwoProof: Term = refl(Nat, numeral(52));

export const chainThreeType: Term = eq(Nat,
  mulTerm(addTerm(numeral(2), powTerm(numeral(2), numeral(3))), app(app(sub, numeral(12)), numeral(4))), numeral(80));
export const chainThreeProof: Term = refl(Nat, numeral(80));

const chainFourExpr: Term = addTerm(powTerm(numeral(3), numeral(3)), mulTerm(numeral(4), app(app(sub, numeral(10)), numeral(6))));
export const chainFourType: Term = eq(Nat, chainFourExpr, chainFourExpr);
export const chainFourProof: Term = refl(Nat, chainFourExpr);
