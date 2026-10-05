import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { normSq, dot2 } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { distanceSq } from './geometry-distance';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p = app(reflectX, app(app(translate, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4))));
const q = app(reflectX, app(app(translate, pair(numeral(2), numeral(1))), pair(numeral(4), numeral(3))));

export const pType: Term = eq(Point2, p, pair(numeral(4), numeral(6)));
export const pProof: Term = refl(Point2, pair(numeral(4), numeral(6)));
export const qType: Term = eq(Point2, q, pair(numeral(6), numeral(4)));
export const qProof: Term = refl(Point2, pair(numeral(6), numeral(4)));
export const pNormType: Term = eq(Nat, app(normSq, p), numeral(52));
export const pNormProof: Term = refl(Nat, numeral(52));
export const qNormType: Term = eq(Nat, app(normSq, q), numeral(52));
export const qNormProof: Term = refl(Nat, numeral(52));
export const pqDistanceType: Term = eq(Nat, app(app(distanceSq, p), q), numeral(48));
export const pqDistanceProof: Term = refl(Nat, numeral(48));
export const pqDotType: Term = eq(Nat, app(app(dot2, p), q), numeral(48));
export const pqDotProof: Term = refl(Nat, numeral(48));
export const pqCrossType: Term = eq(Nat, app(app(cross2, p), q), numeral(52));
export const pqCrossProof: Term = refl(Nat, numeral(52));
