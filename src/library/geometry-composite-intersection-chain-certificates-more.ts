import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { incidence } from './geometry-incidence';
import { onCircle } from './geometry-circle';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p = pair(numeral(1), numeral(2));
const q = app(app(translate, app(rotate90, app(app(scaleVec, numeral(2)), p))), pair(numeral(1), numeral(1)));
const line = pair(pair(numeral(5), numeral(0)), pair(numeral(1), numeral(0)));
const circle = pair(q, numeral(34));

export const candidateCoordinateType: Term = eq(Point2, q, pair(numeral(5), numeral(3)));
export const candidateCoordinateProof: Term = refl(Point2, pair(numeral(5), numeral(3)));
export const candidateIncidenceType: Term = app(app(incidence, q), line);
export const candidateIncidenceProof: Term = refl(Nat, numeral(5));
export const candidateCircleType: Term = app(app(onCircle, q), circle);
export const candidateCircleProof: Term = refl(Nat, numeral(34));
export const candidateNormType: Term = eq(Nat, app(normSq, q), numeral(34));
export const candidateNormProof: Term = refl(Nat, numeral(34));
