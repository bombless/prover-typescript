import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { swapPoint } from './geometry-projections';
import { translate } from './geometry-transform';
import { distanceSq } from './geometry-distance';
import { normSq } from './geometry-metrics';
import { midpoint } from './geometry-segment';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p = pair(numeral(2), numeral(5));
const q = pair(numeral(7), numeral(1));
const d = pair(numeral(1), numeral(3));
const tp = app(app(translate, app(swapPoint, p)), d);
const tq = app(app(translate, app(swapPoint, q)), d);
const m = app(app(midpoint, tp), tq);

export const transformedPType: Term = eq(Point2, tp, pair(numeral(6), numeral(5)));
export const transformedPProof: Term = refl(Point2, pair(numeral(6), numeral(5)));
export const transformedQType: Term = eq(Point2, tq, pair(numeral(2), numeral(10)));
export const transformedQProof: Term = refl(Point2, pair(numeral(2), numeral(10)));
export const transformedMidpointType: Term = eq(Point2, m, pair(numeral(6), numeral(10)));
export const transformedMidpointProof: Term = refl(Point2, pair(numeral(6), numeral(10)));
export const transformedMidpointNormType: Term = eq(Nat, app(normSq, m), numeral(136));
export const transformedMidpointNormProof: Term = refl(Nat, numeral(136));
