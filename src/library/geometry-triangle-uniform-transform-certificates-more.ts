import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const a = pair(numeral(1), numeral(2));
const b = pair(numeral(2), numeral(4));
const c = pair(numeral(3), numeral(1));
const transform = (p: Term): Term => app(app(translate, app(reflectX, app(rotate90, p))), pair(numeral(2), numeral(1)));
const ta = transform(a);
const tb = transform(b);
const tc = transform(c);

export const aType: Term = eq(Point2, ta, pair(numeral(4), numeral(2)));
export const aProof: Term = refl(Point2, pair(numeral(4), numeral(2)));
export const bType: Term = eq(Point2, tb, pair(numeral(6), numeral(3)));
export const bProof: Term = refl(Point2, pair(numeral(6), numeral(3)));
export const cType: Term = eq(Point2, tc, pair(numeral(3), numeral(4)));
export const cProof: Term = refl(Point2, pair(numeral(3), numeral(4)));
export const aNormType: Term = eq(Nat, app(normSq, ta), numeral(20));
export const aNormProof: Term = refl(Nat, numeral(20));
export const bNormType: Term = eq(Nat, app(normSq, tb), numeral(45));
export const bNormProof: Term = refl(Nat, numeral(45));
