import { Term, Nat, Zero, app, eq, refl } from '../syntax/ast';
import { numeral, addTerm } from './nat';
import { mulTerm } from './mul';
import { powTerm } from './pow';
import { sub } from './sub';

const subTerm = (a: Term, b: Term): Term => app(app(sub, a), b);
const e = (a: Term, b: Term): Term => eq(Nat, a, b);
const p = (n: number): Term => refl(Nat, numeral(n));

export const mulSevenEightType = e(mulTerm(numeral(7), numeral(8)), numeral(56));
export const mulSevenEightProof = p(56);
export const mulNineNineType = e(mulTerm(numeral(9), numeral(9)), numeral(81));
export const mulNineNineProof = p(81);
export const powFourThreeType = e(powTerm(numeral(4), numeral(3)), numeral(64));
export const powFourThreeProof = p(64);
export const subTwentyThreeSevenType = e(subTerm(numeral(23), numeral(7)), numeral(16));
export const subTwentyThreeSevenProof = p(16);

export const nestedMulPowType = e(
  addTerm(mulTerm(numeral(3), numeral(7)), powTerm(numeral(2), numeral(4))),
  numeral(37),
);
export const nestedMulPowProof = p(37);

export const nestedSubMulPowType = e(
  subTerm(mulTerm(numeral(5), numeral(6)), powTerm(numeral(2), numeral(3))),
  numeral(22),
);
export const nestedSubMulPowProof = p(22);

export const underflowCompositionType = e(
  subTerm(Zero, addTerm(numeral(2), numeral(3))), Zero,
);
export const underflowCompositionProof = p(0);
