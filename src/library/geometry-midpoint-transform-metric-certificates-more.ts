import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { midpoint } from './geometry-segment';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { onVerticalLine } from './geometry-line';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const a = pair(numeral(1), numeral(3));
const b = pair(numeral(5), numeral(7));
const m = app(app(midpoint, a), b);
const shifted = app(app(translate, m), pair(numeral(2), numeral(1)));
const turned = app(rotate90, shifted);

export const shiftedMidpointType: Term = eq(Point2, shifted, pair(numeral(3), numeral(8)));
export const shiftedMidpointProof: Term = refl(Point2, pair(numeral(3), numeral(8)));
export const turnedMidpointType: Term = eq(Point2, turned, pair(numeral(8), numeral(3)));
export const turnedMidpointProof: Term = refl(Point2, pair(numeral(8), numeral(3)));
export const turnedMidpointVerticalType: Term = app(app(onVerticalLine, turned), numeral(8));
export const turnedMidpointVerticalProof: Term = refl(Nat, numeral(8));
export const turnedMidpointNormType: Term = eq(Nat, app(normSq, turned), numeral(73));
export const turnedMidpointNormProof: Term = refl(Nat, numeral(73));
