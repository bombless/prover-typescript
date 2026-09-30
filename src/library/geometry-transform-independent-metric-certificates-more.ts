import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(2), numeral(5));

export const rotateNormType: Term = eq(Nat, app(normSq, app(rotate90, p)), numeral(29));
export const rotateNormProof: Term = refl(Nat, numeral(29));
export const reflectNormType: Term = eq(Nat, app(normSq, app(reflectX, p)), numeral(29));
export const reflectNormProof: Term = refl(Nat, numeral(29));
export const translateNormType: Term = eq(Nat, app(normSq, app(app(translate, p), pair(numeral(3), numeral(4)))), numeral(106));
export const translateNormProof: Term = refl(Nat, numeral(106));
