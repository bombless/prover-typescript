import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { normSq } from './geometry-metrics';
import { distanceSq } from './geometry-distance';
import { onCircle } from './geometry-circle';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Circle2: Term = prod(Point2, Nat);
const center: Term = pair(numeral(2), numeral(5));
const movedCenter: Term = app(app(translate, center), pair(numeral(3), numeral(1)));
const rotatedCenter: Term = app(rotate90, center);
const reflectedCenter: Term = app(reflectX, center);

export const movedCenterType: Term = eq(Point2, movedCenter, pair(numeral(5), numeral(6)));
export const movedCenterProof: Term = refl(Point2, pair(numeral(5), numeral(6)));
export const rotatedCenterType: Term = eq(Point2, rotatedCenter, pair(numeral(5), numeral(2)));
export const rotatedCenterProof: Term = refl(Point2, pair(numeral(5), numeral(2)));
export const reflectedCenterType: Term = eq(Point2, reflectedCenter, center);
export const reflectedCenterProof: Term = refl(Point2, center);
export const movedCenterNormType: Term = eq(Nat, app(normSq, movedCenter), numeral(61));
export const movedCenterNormProof: Term = refl(Nat, numeral(61));
export const rotatedCenterCircleType: Term = app(app(onCircle, rotatedCenter), pair(rotatedCenter, numeral(29)));
export const rotatedCenterCircleProof: Term = refl(Nat, numeral(29));
export const reflectedCenterDistanceType: Term = eq(Nat, app(app(distanceSq, reflectedCenter), center), numeral(29));
export const reflectedCenterDistanceProof: Term = refl(Nat, numeral(29));
