import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { scaleVec } from './geometry-scalar';
import { distanceSq } from './geometry-distance';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const a = pair(numeral(1), numeral(3));
const b = pair(numeral(2), numeral(1));
const c = pair(numeral(4), numeral(2));
const f = (p: Term): Term => app(app(translate, app(rotate90, app(app(scaleVec, numeral(2)), p))), pair(numeral(1), numeral(1)));
const ta = f(a);
const tb = f(b);
const tc = f(c);

export const taType: Term = eq(Point2, ta, pair(numeral(7), numeral(3)));
export const taProof: Term = refl(Point2, pair(numeral(7), numeral(3)));
export const tbType: Term = eq(Point2, tb, pair(numeral(3), numeral(5)));
export const tbProof: Term = refl(Point2, pair(numeral(3), numeral(5)));
export const tcType: Term = eq(Point2, tc, pair(numeral(5), numeral(9)));
export const tcProof: Term = refl(Point2, pair(numeral(5), numeral(9)));
export const tcNormType: Term = eq(Nat, app(normSq, tc), numeral(106));
export const tcNormProof: Term = refl(Nat, numeral(106));
