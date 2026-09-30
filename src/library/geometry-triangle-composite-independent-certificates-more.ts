import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { distanceSq } from './geometry-distance';
import { normSq } from './geometry-metrics';
import { midpoint } from './geometry-segment';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const a: Term = pair(numeral(1), numeral(2));
const b: Term = pair(numeral(3), numeral(4));
const c: Term = pair(numeral(5), numeral(6));
const ra: Term = app(rotate90, a);
const rb: Term = app(rotate90, b);

export const rotatedFirstVertexType: Term = eq(Point2, ra, pair(numeral(2), numeral(1)));
export const rotatedFirstVertexProof: Term = refl(Point2, pair(numeral(2), numeral(1)));
export const reflectedThirdVertexType: Term = eq(Point2, app(reflectX, c), pair(numeral(5), numeral(6)));
export const reflectedThirdVertexProof: Term = refl(Point2, pair(numeral(5), numeral(6)));
export const rotatedEdgeDistanceType: Term = eq(Nat, app(app(distanceSq, ra), rb), numeral(11));
export const rotatedEdgeDistanceProof: Term = refl(Nat, numeral(11));
export const translatedThirdNormType: Term = eq(Nat, app(normSq, app(app(translate, c), pair(numeral(2), numeral(1)))), numeral(98));
export const translatedThirdNormProof: Term = refl(Nat, numeral(98));
export const rotatedEdgeMidpointType: Term = eq(Point2, app(app(midpoint, ra), rb), pair(numeral(2), numeral(3)));
export const rotatedEdgeMidpointProof: Term = refl(Point2, pair(numeral(2), numeral(3)));
