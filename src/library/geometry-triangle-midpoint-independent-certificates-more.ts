import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { midpoint } from './geometry-segment';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { distanceSq } from './geometry-distance';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const a: Term = pair(numeral(2), numeral(4));
const b: Term = pair(numeral(6), numeral(8));
const m: Term = app(app(midpoint, a), b);

export const midpointType: Term = eq(Point2, m, pair(numeral(2), numeral(8)));
export const midpointProof: Term = refl(Point2, pair(numeral(2), numeral(8)));
export const rotatedMidpointType: Term = eq(Point2, app(rotate90, m), pair(numeral(8), numeral(2)));
export const rotatedMidpointProof: Term = refl(Point2, pair(numeral(8), numeral(2)));
export const reflectedMidpointType: Term = eq(Point2, app(reflectX, m), m);
export const reflectedMidpointProof: Term = refl(Point2, pair(numeral(2), numeral(8)));
export const midpointNormType: Term = eq(Nat, app(normSq, m), numeral(68));
export const midpointNormProof: Term = refl(Nat, numeral(68));
export const midpointToAType: Term = eq(Nat, app(app(distanceSq, m), a), numeral(36));
export const midpointToAProof: Term = refl(Nat, numeral(36));
