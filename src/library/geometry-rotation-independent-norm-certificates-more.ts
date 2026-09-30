import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(3), numeral(4));

export const rotateNormType: Term = eq(Nat, app(normSq, app(rotate90, p)), numeral(25));
export const rotateNormProof: Term = refl(Nat, numeral(25));
export const rotateTwiceNormType: Term = eq(Nat, app(normSq, app(rotate90, app(rotate90, p))), numeral(25));
export const rotateTwiceNormProof: Term = refl(Nat, numeral(25));
