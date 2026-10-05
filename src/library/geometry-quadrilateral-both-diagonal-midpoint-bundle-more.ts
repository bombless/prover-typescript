import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { midpoint } from './geometry-segment';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const t = (p: Term): Term => app(app(translate, app(rotate90, p)), pair(numeral(1), numeral(2)));
const a = t(pair(numeral(1), numeral(1)));
const b = t(pair(numeral(2), numeral(3)));
const c = t(pair(numeral(4), numeral(2)));
const d = t(pair(numeral(5), numeral(4)));
const ac = app(app(midpoint, a), c);
const bd = app(app(midpoint, b), d);

const e1 = eq(Point2, a, pair(numeral(2), numeral(3)));
const e2 = eq(Point2, b, pair(numeral(4), numeral(4)));
const e3 = eq(Point2, c, pair(numeral(3), numeral(6)));
const e4 = eq(Point2, d, pair(numeral(5), numeral(7)));
const e5 = eq(Point2, ac, pair(numeral(2), numeral(6)));
const e6 = eq(Point2, bd, pair(numeral(4), numeral(7)));
const e7 = eq(Nat, app(normSq, ac), numeral(40));
const e8 = eq(Nat, app(normSq, bd), numeral(65));

export const quadrilateralBothDiagonalMidpointType: Term =
  prod(e1, prod(e2, prod(e3, prod(e4, prod(e5, prod(e6, prod(e7, e8)))))));

const p1 = refl(Point2, pair(numeral(2), numeral(3)));
const p2 = refl(Point2, pair(numeral(4), numeral(4)));
const p3 = refl(Point2, pair(numeral(3), numeral(6)));
const p4 = refl(Point2, pair(numeral(5), numeral(7)));
const p5 = refl(Point2, pair(numeral(2), numeral(6)));
const p6 = refl(Point2, pair(numeral(4), numeral(7)));
const p7 = refl(Nat, numeral(40));
const p8 = refl(Nat, numeral(65));
const proofBundle = pair(p1, pair(p2, pair(p3, pair(p4, pair(p5, pair(p6, pair(p7, p8)))))));
export const quadrilateralBothDiagonalMidpointProof: Term = proofBundle;
