import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { onCircle } from './geometry-circle';
import { onVerticalLine } from './geometry-line';
import { incidence } from './geometry-incidence';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

/** A second concrete certificate bundle for a transformed point. */
export const Point2: Term = prod(Nat, Nat);
const p = app(app(translate, app(rotate90, pair(numeral(3), numeral(1)))), pair(numeral(2), numeral(4)));
const line = pair(pair(numeral(3), numeral(0)), pair(numeral(9), numeral(1)));
const circle = pair(p, numeral(58));

export const pointType: Term = eq(Point2, p, pair(numeral(3), numeral(7)));
export const pointProof: Term = refl(Point2, pair(numeral(3), numeral(7)));
export const normType: Term = eq(Nat, app(normSq, p), numeral(58));
export const normProof: Term = refl(Nat, numeral(58));
export const circleType: Term = app(app(onCircle, p), circle);
export const circleProof: Term = refl(Nat, numeral(58));
export const verticalType: Term = app(app(onVerticalLine, p), numeral(3));
export const verticalProof: Term = refl(Nat, numeral(3));
export const incidenceType: Term = app(app(incidence, p), line);
export const incidenceProof: Term = refl(Nat, numeral(3));
