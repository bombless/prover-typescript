import { Term, Nat, prod, pair, fst, snd, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Triangle2: Term = prod(Point2, prod(Point2, Point2));
const triangle: Term = pair(pair(numeral(1), numeral(2)), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6))));

export const firstProjectionType: Term = eq(Point2, fst(triangle), pair(numeral(1), numeral(2)));
export const firstProjectionProof: Term = refl(Point2, pair(numeral(1), numeral(2)));
export const secondProjectionType: Term = eq(Point2, fst(snd(triangle)), pair(numeral(3), numeral(4)));
export const secondProjectionProof: Term = refl(Point2, pair(numeral(3), numeral(4)));
export const thirdProjectionType: Term = eq(Point2, snd(snd(triangle)), pair(numeral(5), numeral(6)));
export const thirdProjectionProof: Term = refl(Point2, pair(numeral(5), numeral(6)));
export const tailProjectionType: Term = eq(prod(Point2, Point2), snd(triangle), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6))));
export const tailProjectionProof: Term = refl(prod(Point2, Point2), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6))));
