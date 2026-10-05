import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { midpoint } from './geometry-segment';
import { normSq } from './geometry-metrics';
import { onCircle } from './geometry-circle';
import { onVerticalLine } from './geometry-line';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const d = pair(numeral(1), numeral(2));
const transform = (p: Term): Term => app(app(translate, app(rotate90, p)), d);
const a = transform(pair(numeral(1), numeral(3)));
const b = transform(pair(numeral(2), numeral(4)));
const c = transform(pair(numeral(3), numeral(2)));
const e = transform(pair(numeral(4), numeral(1)));
const m = app(app(midpoint, a), c);

export const aType: Term = eq(Point2, a, pair(numeral(4), numeral(3)));
export const aProof: Term = refl(Point2, pair(numeral(4), numeral(3)));
export const bType: Term = eq(Point2, b, pair(numeral(5), numeral(4)));
export const bProof: Term = refl(Point2, pair(numeral(5), numeral(4)));
export const cType: Term = eq(Point2, c, pair(numeral(3), numeral(5)));
export const cProof: Term = refl(Point2, pair(numeral(3), numeral(5)));
export const eType: Term = eq(Point2, e, pair(numeral(2), numeral(6)));
export const eProof: Term = refl(Point2, pair(numeral(2), numeral(6)));
export const midpointType: Term = eq(Point2, m, pair(numeral(4), numeral(5)));
export const midpointProof: Term = refl(Point2, pair(numeral(4), numeral(5)));
export const aNormType: Term = eq(Nat, app(normSq, a), numeral(25));
export const aNormProof: Term = refl(Nat, numeral(25));
export const eCircleType: Term = app(app(onCircle, e), pair(e, numeral(40)));
export const eCircleProof: Term = refl(Nat, numeral(40));
export const bVerticalType: Term = app(app(onVerticalLine, b), numeral(5));
export const bVerticalProof: Term = refl(Nat, numeral(5));

/** The transformed quadrilateral tail is reconstructed from its vertices. */
export const acMidpointNormType: Term = eq(Nat, app(normSq, m), numeral(41));
export const acMidpointNormProof: Term = refl(Nat, numeral(41));

/** A second diagonal endpoint has a concrete circle certificate. */
export const aCircleType: Term = app(app(onCircle, a), pair(a, numeral(25)));
export const aCircleProof: Term = refl(Nat, numeral(25));
