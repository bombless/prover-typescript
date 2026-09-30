import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { midpoint } from './geometry-segment';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { distanceSq } from './geometry-distance';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(2), numeral(3));
const q: Term = pair(numeral(4), numeral(5));
const m: Term = app(app(midpoint, p), q);
const moved: Term = app(app(translate, m), pair(numeral(1), numeral(2)));
const turned: Term = app(rotate90, moved);

export const midpointMovedType: Term = eq(Point2, moved, pair(numeral(3), numeral(7)));
export const midpointMovedProof: Term = refl(Point2, pair(numeral(3), numeral(7)));
export const midpointTurnedType: Term = eq(Point2, turned, pair(numeral(7), numeral(3)));
export const midpointTurnedProof: Term = refl(Point2, pair(numeral(7), numeral(3)));
export const midpointTurnedNormType: Term = eq(Nat, app(normSq, turned), numeral(58));
export const midpointTurnedNormProof: Term = refl(Nat, numeral(58));
