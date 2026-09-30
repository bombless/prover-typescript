import { Term, Nat, prod, pair, fst, snd, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';

export const Point2: Term = prod(Nat, Nat);
export const Triangle2: Term = prod(Point2, prod(Point2, Point2));
const triangle: Term = pair(pair(numeral(1), numeral(2)), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6))));
const shift: Term = pair(numeral(1), numeral(1));

const a = fst(triangle);
const b = fst(snd(triangle));
const c = snd(snd(triangle));

export const translatedAType: Term = eq(Point2, app(app(translate, a), shift), pair(numeral(2), numeral(3)));
export const translatedAProof: Term = refl(Point2, pair(numeral(2), numeral(3)));
export const translatedBType: Term = eq(Point2, app(app(translate, b), shift), pair(numeral(4), numeral(5)));
export const translatedBProof: Term = refl(Point2, pair(numeral(4), numeral(5)));
export const translatedCType: Term = eq(Point2, app(app(translate, c), shift), pair(numeral(6), numeral(7)));
export const translatedCProof: Term = refl(Point2, pair(numeral(6), numeral(7)));

export const rotatedAType: Term = eq(Point2, app(rotate90, a), pair(numeral(2), numeral(1)));
export const rotatedAProof: Term = refl(Point2, pair(numeral(2), numeral(1)));
export const rotatedBType: Term = eq(Point2, app(rotate90, b), pair(numeral(4), numeral(3)));
export const rotatedBProof: Term = refl(Point2, pair(numeral(4), numeral(3)));
export const rotatedCType: Term = eq(Point2, app(rotate90, c), pair(numeral(6), numeral(5)));
export const rotatedCProof: Term = refl(Point2, pair(numeral(6), numeral(5)));

export const reflectedAType: Term = eq(Point2, app(reflectX, a), pair(numeral(1), numeral(2)));
export const reflectedAProof: Term = refl(Point2, pair(numeral(1), numeral(2)));
export const reflectedBType: Term = eq(Point2, app(reflectX, b), pair(numeral(3), numeral(4)));
export const reflectedBProof: Term = refl(Point2, pair(numeral(3), numeral(4)));
export const reflectedCType: Term = eq(Point2, app(reflectX, c), pair(numeral(5), numeral(6)));
export const reflectedCProof: Term = refl(Point2, pair(numeral(5), numeral(6)));
