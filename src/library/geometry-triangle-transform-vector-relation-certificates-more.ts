import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { dot2, normSq } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const a = pair(numeral(1), numeral(2));
const b = pair(numeral(3), numeral(4));
const t = (p: Term): Term => app(app(translate, app(rotate90, p)), pair(numeral(1), numeral(1)));
const ta = t(a);
const tb = t(b);

export const taType: Term = eq(Point2, ta, pair(numeral(3), numeral(2)));
export const taProof: Term = refl(Point2, pair(numeral(3), numeral(2)));
export const tbType: Term = eq(Point2, tb, pair(numeral(5), numeral(4)));
export const tbProof: Term = refl(Point2, pair(numeral(5), numeral(4)));
export const dotType: Term = eq(Nat, app(app(dot2, ta), tb), numeral(23));
export const dotProof: Term = refl(Nat, numeral(23));
export const crossType: Term = eq(Nat, app(app(cross2, ta), tb), numeral(22));
export const crossProof: Term = refl(Nat, numeral(22));
export const normType: Term = eq(Nat, app(normSq, ta), numeral(13));
export const normProof: Term = refl(Nat, numeral(13));
