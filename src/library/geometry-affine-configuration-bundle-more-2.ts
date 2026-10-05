import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { normSq } from './geometry-metrics';
import { onCircle } from './geometry-circle';
import { onVerticalLine } from './geometry-line';
import { incidence } from './geometry-incidence';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const k = numeral(2);
const d = pair(numeral(3), numeral(1));
const transform = (p: Term): Term => app(app(translate, app(rotate90, app(app(scaleVec, k), p))), d);
const p = transform(pair(numeral(1), numeral(2)));
const q = transform(pair(numeral(2), numeral(1)));
const pLine = pair(pair(numeral(7), numeral(0)), pair(numeral(1), numeral(0)));
const qLine = pair(pair(numeral(5), numeral(0)), pair(numeral(1), numeral(0)));

/** First transformed point and all of its basic coordinate certificates. */
export const pCoordinateType: Term = eq(Point2, p, pair(numeral(7), numeral(3)));
export const pCoordinateProof: Term = refl(Point2, pair(numeral(7), numeral(3)));
export const pNormType: Term = eq(Nat, app(normSq, p), numeral(58));
export const pNormProof: Term = refl(Nat, numeral(58));
export const pCircleType: Term = app(app(onCircle, p), pair(p, numeral(58)));
export const pCircleProof: Term = refl(Nat, numeral(58));
export const pVerticalType: Term = app(app(onVerticalLine, p), numeral(7));
export const pVerticalProof: Term = refl(Nat, numeral(7));
export const pIncidenceType: Term = app(app(incidence, p), pLine);
export const pIncidenceProof: Term = refl(Nat, numeral(7));

/** A second transformed point supplies an independent configuration certificate. */
export const qCoordinateType: Term = eq(Point2, q, pair(numeral(5), numeral(5)));
export const qCoordinateProof: Term = refl(Point2, pair(numeral(5), numeral(5)));
export const qNormType: Term = eq(Nat, app(normSq, q), numeral(50));
export const qNormProof: Term = refl(Nat, numeral(50));
export const qCircleType: Term = app(app(onCircle, q), pair(q, numeral(50)));
export const qCircleProof: Term = refl(Nat, numeral(50));
export const qVerticalType: Term = app(app(onVerticalLine, q), numeral(5));
export const qVerticalProof: Term = refl(Nat, numeral(5));
export const qIncidenceType: Term = app(app(incidence, q), qLine);
export const qIncidenceProof: Term = refl(Nat, numeral(5));
