import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(2), numeral(5));

export const rotatePointType: Term = eq(Point2, app(rotate90, p), pair(numeral(5), numeral(2)));
export const rotatePointProof: Term = refl(Point2, pair(numeral(5), numeral(2)));
export const reflectPointType: Term = eq(Point2, app(reflectX, p), pair(numeral(2), numeral(5)));
export const reflectPointProof: Term = refl(Point2, pair(numeral(2), numeral(5)));
export const translatePointType: Term = eq(Point2, app(app(translate, p), pair(numeral(3), numeral(4))), pair(numeral(5), numeral(9)));
export const translatePointProof: Term = refl(Point2, pair(numeral(5), numeral(9)));
