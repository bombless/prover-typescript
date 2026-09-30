import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { normSq, dot2 } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { onCircle } from './geometry-circle';
import { incidence } from './geometry-incidence';
import { onVerticalLine } from './geometry-line';
import { numeral } from './nat';

/** Five independently checked points under the concrete map (x,y) ↦ (y+2,x+1). */
export const Point2: Term = prod(Nat, Nat);
const transform = (p: Term): Term => app(app(translate, app(rotate90, p)), pair(numeral(2), numeral(1)));
const a = transform(pair(numeral(0), numeral(1)));
const b = transform(pair(numeral(1), numeral(0)));
const c = transform(pair(numeral(2), numeral(3)));
const d = transform(pair(numeral(3), numeral(2)));
const e = transform(pair(numeral(4), numeral(1)));

export const aType: Term = eq(Point2, a, pair(numeral(3), numeral(1)));
export const aProof: Term = refl(Point2, pair(numeral(3), numeral(1)));
export const bType: Term = eq(Point2, b, pair(numeral(2), numeral(2)));
export const bProof: Term = refl(Point2, pair(numeral(2), numeral(2)));
export const cType: Term = eq(Point2, c, pair(numeral(5), numeral(3)));
export const cProof: Term = refl(Point2, pair(numeral(5), numeral(3)));
export const dType: Term = eq(Point2, d, pair(numeral(4), numeral(4)));
export const dProof: Term = refl(Point2, pair(numeral(4), numeral(4)));
export const eType: Term = eq(Point2, e, pair(numeral(3), numeral(5)));
export const eProof: Term = refl(Point2, pair(numeral(3), numeral(5)));

export const aNormType: Term = eq(Nat, app(normSq, a), numeral(10));
export const aNormProof: Term = refl(Nat, numeral(10));
export const cNormType: Term = eq(Nat, app(normSq, c), numeral(34));
export const cNormProof: Term = refl(Nat, numeral(34));
export const acDotType: Term = eq(Nat, app(app(dot2, a), c), numeral(18));
export const acDotProof: Term = refl(Nat, numeral(18));
export const bdCrossType: Term = eq(Nat, app(app(cross2, b), d), numeral(16));
export const bdCrossProof: Term = refl(Nat, numeral(16));

export const cCircleType: Term = app(app(onCircle, c), pair(c, numeral(34)));
export const cCircleProof: Term = refl(Nat, numeral(34));
export const dIncidenceType: Term = app(app(incidence, d), pair(pair(numeral(4), numeral(0)), pair(numeral(1), numeral(0))));
export const dIncidenceProof: Term = refl(Nat, numeral(4));
export const eVerticalType: Term = app(app(onVerticalLine, e), numeral(3));
export const eVerticalProof: Term = refl(Nat, numeral(3));
