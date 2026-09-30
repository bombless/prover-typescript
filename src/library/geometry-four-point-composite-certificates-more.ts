import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { distanceSq } from './geometry-distance';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const transform = (p: Term): Term => app(app(translate, app(rotate90, p)), pair(numeral(2), numeral(1)));
const a = transform(pair(numeral(1), numeral(2)));
const b = transform(pair(numeral(3), numeral(1)));
const c = transform(pair(numeral(2), numeral(4)));
const d = transform(pair(numeral(5), numeral(2)));

export const aType: Term = eq(Point2, a, pair(numeral(4), numeral(2)));
export const aProof: Term = refl(Point2, pair(numeral(4), numeral(2)));
export const bType: Term = eq(Point2, b, pair(numeral(3), numeral(4)));
export const bProof: Term = refl(Point2, pair(numeral(3), numeral(4)));
export const cType: Term = eq(Point2, c, pair(numeral(6), numeral(3)));
export const cProof: Term = refl(Point2, pair(numeral(6), numeral(3)));
export const dType: Term = eq(Point2, d, pair(numeral(4), numeral(6)));
export const dProof: Term = refl(Point2, pair(numeral(4), numeral(6)));
export const aNormType: Term = eq(Nat, app(normSq, a), numeral(20));
export const aNormProof: Term = refl(Nat, numeral(20));
