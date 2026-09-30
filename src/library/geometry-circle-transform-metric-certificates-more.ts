import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { onCircle } from './geometry-circle';
import { normSq } from './geometry-metrics';
import { distanceSq } from './geometry-distance';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(3), numeral(4));
const moved: Term = app(app(translate, p), pair(numeral(1), numeral(2)));
const turned: Term = app(rotate90, moved);
const reflected: Term = app(reflectX, turned);

export const movedPointType: Term = eq(Point2, moved, pair(numeral(4), numeral(6)));
export const movedPointProof: Term = refl(Point2, pair(numeral(4), numeral(6)));
export const turnedPointType: Term = eq(Point2, turned, pair(numeral(6), numeral(4)));
export const turnedPointProof: Term = refl(Point2, pair(numeral(6), numeral(4)));
export const reflectedPointType: Term = eq(Point2, reflected, pair(numeral(6), numeral(4)));
export const reflectedPointProof: Term = refl(Point2, pair(numeral(6), numeral(4)));
export const reflectedNormType: Term = eq(Nat, app(normSq, reflected), numeral(52));
export const reflectedNormProof: Term = refl(Nat, numeral(52));
export const reflectedCircleType: Term = app(app(onCircle, reflected), pair(reflected, numeral(52)));
export const reflectedCircleProof: Term = refl(Nat, numeral(52));
export const transformedDistanceType: Term = eq(Nat, app(app(distanceSq, reflected), p), numeral(34));
export const transformedDistanceProof: Term = refl(Nat, numeral(34));
