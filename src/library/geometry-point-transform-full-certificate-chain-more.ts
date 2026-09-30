import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { normSq } from './geometry-metrics';
import { onCircle } from './geometry-circle';
import { incidence } from './geometry-incidence';
import { onVerticalLine } from './geometry-line';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p = pair(numeral(2), numeral(3));
const transformed = app(app(translate, app(reflectX, app(rotate90, p))), pair(numeral(1), numeral(4)));
const line = pair(pair(numeral(4), numeral(0)), pair(numeral(1), numeral(0)));

export const coordinateType: Term = eq(Point2, transformed, pair(numeral(4), numeral(6)));
export const coordinateProof: Term = refl(Point2, pair(numeral(4), numeral(6)));
export const normType: Term = eq(Nat, app(normSq, transformed), numeral(52));
export const normProof: Term = refl(Nat, numeral(52));
export const circleType: Term = app(app(onCircle, transformed), pair(transformed, numeral(52)));
export const circleProof: Term = refl(Nat, numeral(52));
export const incidenceType: Term = app(app(incidence, transformed), line);
export const incidenceProof: Term = refl(Nat, numeral(4));
export const verticalType: Term = app(app(onVerticalLine, transformed), numeral(4));
export const verticalProof: Term = refl(Nat, numeral(4));
