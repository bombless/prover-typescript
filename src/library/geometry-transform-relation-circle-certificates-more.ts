import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { onCircle } from './geometry-circle';
import { incidence } from './geometry-incidence';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p = pair(numeral(2), numeral(3));
const transformed = app(reflectX, app(rotate90, app(app(translate, p), pair(numeral(1), numeral(2)))));
const line = pair(pair(numeral(5), numeral(0)), pair(numeral(1), numeral(0)));

export const transformedCoordinateType: Term = eq(Point2, transformed, pair(numeral(5), numeral(3)));
export const transformedCoordinateProof: Term = refl(Point2, pair(numeral(5), numeral(3)));
export const transformedIncidenceType: Term = app(app(incidence, transformed), line);
export const transformedIncidenceProof: Term = refl(Nat, numeral(5));
export const transformedCircleType: Term = app(app(onCircle, transformed), pair(transformed, numeral(34)));
export const transformedCircleProof: Term = refl(Nat, numeral(34));
export const transformedNormType: Term = eq(Nat, app(normSq, transformed), numeral(34));
export const transformedNormProof: Term = refl(Nat, numeral(34));
