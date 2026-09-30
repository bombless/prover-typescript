import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { dot2 } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { distanceSq } from './geometry-distance';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const a: Term = pair(numeral(1), numeral(2));
const b: Term = pair(numeral(3), numeral(4));
const c: Term = pair(numeral(5), numeral(6));

export const edgeABDistanceType: Term = eq(Nat, app(app(distanceSq, a), b), numeral(11));
export const edgeABDistanceProof: Term = refl(Nat, numeral(11));
export const edgeABDotType: Term = eq(Nat, app(app(dot2, a), b), numeral(11));
export const edgeABDotProof: Term = refl(Nat, numeral(11));
export const edgeABCrossType: Term = eq(Nat, app(app(cross2, a), b), numeral(10));
export const edgeABCrossProof: Term = refl(Nat, numeral(10));

export const edgeBCDistanceType: Term = eq(Nat, app(app(distanceSq, b), c), numeral(39));
export const edgeBCDistanceProof: Term = refl(Nat, numeral(39));
export const edgeBCDotType: Term = eq(Nat, app(app(dot2, b), c), numeral(39));
export const edgeBCDotProof: Term = refl(Nat, numeral(39));
export const edgeBCCrossType: Term = eq(Nat, app(app(cross2, b), c), numeral(38));
export const edgeBCCrossProof: Term = refl(Nat, numeral(38));

export const edgeCADistanceType: Term = eq(Nat, app(app(distanceSq, c), a), numeral(17));
export const edgeCADistanceProof: Term = refl(Nat, numeral(17));
export const edgeCADotType: Term = eq(Nat, app(app(dot2, c), a), numeral(17));
export const edgeCADotProof: Term = refl(Nat, numeral(17));
export const edgeCACrossType: Term = eq(Nat, app(app(cross2, c), a), numeral(16));
export const edgeCACrossProof: Term = refl(Nat, numeral(16));
