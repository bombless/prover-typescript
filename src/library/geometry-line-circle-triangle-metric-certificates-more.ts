import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { incidence } from './geometry-incidence';
import { onCircle } from './geometry-circle';
import { onVerticalLine } from './geometry-line';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Line2: Term = prod(Point2, prod(Nat, Nat));
const p: Term = pair(numeral(2), numeral(4));
const moved: Term = app(app(translate, p), pair(numeral(1), numeral(2)));
const turned: Term = app(rotate90, moved);
const line: Term = pair(pair(numeral(6), numeral(0)), pair(numeral(1), numeral(0)));

export const movedCoordinateType: Term = eq(Point2, moved, pair(numeral(3), numeral(6)));
export const movedCoordinateProof: Term = refl(Point2, pair(numeral(3), numeral(6)));
export const turnedCoordinateType: Term = eq(Point2, turned, pair(numeral(6), numeral(3)));
export const turnedCoordinateProof: Term = refl(Point2, pair(numeral(6), numeral(3)));
export const turnedVerticalType: Term = app(app(onVerticalLine, turned), numeral(6));
export const turnedVerticalProof: Term = refl(Nat, numeral(6));
export const turnedIncidenceType: Term = app(app(incidence, turned), line);
export const turnedIncidenceProof: Term = refl(Nat, numeral(6));
export const turnedCircleType: Term = app(app(onCircle, turned), pair(turned, numeral(45)));
export const turnedCircleProof: Term = refl(Nat, numeral(45));
export const turnedNormType: Term = eq(Nat, app(normSq, turned), numeral(45));
export const turnedNormProof: Term = refl(Nat, numeral(45));
