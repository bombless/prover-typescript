import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { onCircle } from './geometry-circle';
import { incidence } from './geometry-incidence';
import { onVerticalLine } from './geometry-line';
import { parallelVec } from './geometry-parallel';
import { perpendicularVec } from './geometry-relations';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p = pair(numeral(1), numeral(3));
const q = app(app(translate, app(rotate90, p)), pair(numeral(1), numeral(2)));
const line = pair(pair(numeral(4), numeral(0)), pair(numeral(1), numeral(0)));

export const qType: Term = eq(Point2, q, pair(numeral(4), numeral(3)));
export const qProof: Term = refl(Point2, pair(numeral(4), numeral(3)));
export const circleType: Term = app(app(onCircle, q), pair(q, numeral(25)));
export const circleProof: Term = refl(Nat, numeral(25));
export const incidenceType: Term = app(app(incidence, q), line);
export const incidenceProof: Term = refl(Nat, numeral(4));
export const verticalType: Term = app(app(onVerticalLine, q), numeral(4));
export const verticalProof: Term = refl(Nat, numeral(4));
export const parallelType: Term = app(app(parallelVec, pair(numeral(2), { kind: 'Zero' })), pair(numeral(9), { kind: 'Zero' }));
export const parallelProof: Term = refl(Nat, { kind: 'Zero' });
export const perpendicularType: Term = app(app(perpendicularVec, pair(numeral(2), { kind: 'Zero' })), pair({ kind: 'Zero' }, numeral(6)));
export const perpendicularProof: Term = refl(Nat, { kind: 'Zero' });
