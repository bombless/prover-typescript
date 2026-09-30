import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { normSq, dot2 } from './geometry-metrics';
import { onCircle } from './geometry-circle';
import { numeral } from './nat';

/** A second independent concrete chain of transformed points and metrics. */
export const Point2: Term = prod(Nat, Nat);
const map = (p: Term): Term => app(app(translate, app(rotate90, p)), pair(numeral(1), numeral(2)));
const p = map(pair(numeral(1), numeral(3)));
const q = map(pair(numeral(2), numeral(4)));
const r = map(pair(numeral(3), numeral(5)));
const s = map(pair(numeral(4), numeral(6)));
const t = map(pair(numeral(5), numeral(7)));
const u = map(pair(numeral(6), numeral(8)));

export const pType: Term = eq(Point2, p, pair(numeral(4), numeral(3)));
export const pProof: Term = refl(Point2, pair(numeral(4), numeral(3)));
export const qType: Term = eq(Point2, q, pair(numeral(5), numeral(4)));
export const qProof: Term = refl(Point2, pair(numeral(5), numeral(4)));
export const rType: Term = eq(Point2, r, pair(numeral(6), numeral(5)));
export const rProof: Term = refl(Point2, pair(numeral(6), numeral(5)));
export const sType: Term = eq(Point2, s, pair(numeral(7), numeral(6)));
export const sProof: Term = refl(Point2, pair(numeral(7), numeral(6)));
export const tType: Term = eq(Point2, t, pair(numeral(8), numeral(7)));
export const tProof: Term = refl(Point2, pair(numeral(8), numeral(7)));
export const uType: Term = eq(Point2, u, pair(numeral(9), numeral(8)));
export const uProof: Term = refl(Point2, pair(numeral(9), numeral(8)));

export const pNormType: Term = eq(Nat, app(normSq, p), numeral(25));
export const pNormProof: Term = refl(Nat, numeral(25));
export const qNormType: Term = eq(Nat, app(normSq, q), numeral(41));
export const qNormProof: Term = refl(Nat, numeral(41));
export const pqDotType: Term = eq(Nat, app(app(dot2, p), q), numeral(32));
export const pqDotProof: Term = refl(Nat, numeral(32));
export const rCircleType: Term = app(app(onCircle, r), pair(r, numeral(61)));
export const rCircleProof: Term = refl(Nat, numeral(61));
