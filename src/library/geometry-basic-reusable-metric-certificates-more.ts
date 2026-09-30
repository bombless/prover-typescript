import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { midpoint } from './geometry-segment';
import { distanceSq } from './geometry-distance';
import { normSq } from './geometry-metrics';
import { onCircle } from './geometry-circle';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(1), numeral(2));
const q: Term = pair(numeral(3), numeral(4));
const moved: Term = app(app(translate, p), pair(numeral(2), numeral(3)));
const m: Term = app(app(midpoint, p), q);

export const reflectedNormType: Term = eq(Nat, app(normSq, app(reflectX, p)), numeral(5));
export const reflectedNormProof: Term = refl(Nat, numeral(5));
export const rotatedNormType: Term = eq(Nat, app(normSq, app(rotate90, p)), numeral(5));
export const rotatedNormProof: Term = refl(Nat, numeral(5));
export const movedPointNormType: Term = eq(Nat, app(normSq, moved), numeral(34));
export const movedPointNormProof: Term = refl(Nat, numeral(34));
export const movedPointCircleType: Term = app(app(onCircle, moved), pair(moved, numeral(34)));
export const movedPointCircleProof: Term = refl(Nat, numeral(34));
export const rotatedEdgeDistanceType: Term = eq(Nat, app(app(distanceSq, app(rotate90, p)), app(rotate90, q)), numeral(11));
export const rotatedEdgeDistanceProof: Term = refl(Nat, numeral(11));
export const midpointNormType: Term = eq(Nat, app(normSq, m), numeral(17));
export const midpointNormProof: Term = refl(Nat, numeral(17));
