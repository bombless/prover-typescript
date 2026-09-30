import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { normSq } from './geometry-metrics';
import { onCircle } from './geometry-circle';
import { incidence } from './geometry-incidence';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const a = pair(numeral(1), numeral(2));
const transformed = app(app(translate, app(rotate90, a)), pair(numeral(2), numeral(1)));
const line = pair(pair(numeral(4), numeral(0)), pair(numeral(1), numeral(0)));

export const coordinateType: Term = eq(Point2, transformed, pair(numeral(4), numeral(2)));
export const coordinateProof: Term = refl(Point2, pair(numeral(4), numeral(2)));
export const normType: Term = eq(Nat, app(normSq, transformed), numeral(20));
export const normProof: Term = refl(Nat, numeral(20));
export const circleType: Term = app(app(onCircle, transformed), pair(transformed, numeral(20)));
export const circleProof: Term = refl(Nat, numeral(20));
export const incidenceType: Term = app(app(incidence, transformed), line);
export const incidenceProof: Term = refl(Nat, numeral(4));
