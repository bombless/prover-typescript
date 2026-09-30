import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { onCircle } from './geometry-circle';
import { incidence } from './geometry-incidence';
import { onVerticalLine } from './geometry-line';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p = pair(numeral(3), numeral(1));
const q = app(app(translate, app(rotate90, p)), pair(numeral(1), numeral(2)));
const line = pair(pair(numeral(2), numeral(0)), pair(numeral(1), numeral(0)));

export const qType: Term = eq(Point2, q, pair(numeral(2), numeral(5)));
export const qProof: Term = refl(Point2, pair(numeral(2), numeral(5)));
export const circleType: Term = app(app(onCircle, q), pair(q, numeral(29)));
export const circleProof: Term = refl(Nat, numeral(29));
export const incidenceType: Term = app(app(incidence, q), line);
export const incidenceProof: Term = refl(Nat, numeral(2));
export const verticalType: Term = app(app(onVerticalLine, q), numeral(2));
export const verticalProof: Term = refl(Nat, numeral(2));
