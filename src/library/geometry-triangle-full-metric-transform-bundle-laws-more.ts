import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { scaleVec } from './geometry-scalar';
import { distanceSq } from './geometry-distance';
import { midpoint } from './geometry-segment';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const a = pair(numeral(1), numeral(2));
const b = pair(numeral(4), numeral(1));
const c = pair(numeral(2), numeral(5));
const f = (p: Term): Term => app(app(translate, app(rotate90, app(app(scaleVec, numeral(2)), p))), pair(numeral(1), numeral(2)));
const ta = f(a);
const tb = f(b);
const tc = f(c);
const m = app(app(midpoint, tb), tc);

export const taType: Term = eq(Point2, ta, pair(numeral(5), numeral(4)));
export const taProof: Term = refl(Point2, pair(numeral(5), numeral(4)));
export const tcType: Term = eq(Point2, tc, pair(numeral(11), numeral(6)));
export const tcProof: Term = refl(Point2, pair(numeral(11), numeral(6)));
export const taNormType: Term = eq(Nat, app(normSq, ta), numeral(41));
export const taNormProof: Term = refl(Nat, numeral(41));
export const midpointType: Term = eq(Point2, m, pair(numeral(3), numeral(6)));
export const midpointProof: Term = refl(Point2, pair(numeral(3), numeral(6)));
