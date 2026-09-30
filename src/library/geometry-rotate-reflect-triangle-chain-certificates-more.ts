import { Term, Nat, prod, pair, fst, snd, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { distanceSq } from './geometry-distance';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const a = pair(numeral(1), numeral(2));
const b = pair(numeral(3), numeral(1));
const c = pair(numeral(2), numeral(4));
const transform = (p: Term): Term => app(reflectX, app(rotate90, p));
const ta = transform(a);
const tb = transform(b);
const tc = transform(c);

export const aType: Term = eq(Point2, ta, pair(numeral(2), numeral(1)));
export const aProof: Term = refl(Point2, pair(numeral(2), numeral(1)));
export const bType: Term = eq(Point2, tb, pair(numeral(1), numeral(3)));
export const bProof: Term = refl(Point2, pair(numeral(1), numeral(3)));
export const cType: Term = eq(Point2, tc, pair(numeral(4), numeral(2)));
export const cProof: Term = refl(Point2, pair(numeral(4), numeral(2)));
export const cNormType: Term = eq(Nat, app(normSq, tc), numeral(20));
export const cNormProof: Term = refl(Nat, numeral(20));
