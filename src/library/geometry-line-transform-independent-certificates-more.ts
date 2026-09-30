import { Term, Nat, prod, pair, app, eq, refl, fst, snd } from '../syntax/ast';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { onVerticalLine } from './geometry-line';
import { incidence } from './geometry-incidence';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Line2: Term = prod(Point2, Point2);
const line: Term = pair(pair(numeral(2), numeral(1)), pair(numeral(3), numeral(0)));
const translatedBase: Term = app(app(translate, fst(line)), pair(numeral(4), numeral(5)));
const rotatedDirection: Term = app(rotate90, snd(line));

export const translatedBaseType: Term = eq(Point2, translatedBase, pair(numeral(6), numeral(6)));
export const translatedBaseProof: Term = refl(Point2, pair(numeral(6), numeral(6)));
export const rotatedDirectionType: Term = eq(Point2, rotatedDirection, pair({ kind: 'Zero' }, numeral(3)));
export const rotatedDirectionProof: Term = refl(Point2, pair({ kind: 'Zero' }, numeral(3)));
export const translatedBaseVerticalType: Term = app(app(onVerticalLine, translatedBase), numeral(6));
export const translatedBaseVerticalProof: Term = refl(Nat, numeral(6));

const translatedLine: Term = pair(translatedBase, snd(line));
export const translatedBaseIncidenceType: Term = app(app(incidence, translatedBase), translatedLine);
export const translatedBaseIncidenceProof: Term = refl(Nat, numeral(6));
