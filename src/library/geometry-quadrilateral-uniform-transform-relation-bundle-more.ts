import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { normSq, dot2 } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { onCircle } from './geometry-circle';
import { incidence } from './geometry-incidence';
import { onVerticalLine } from './geometry-line';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const transform = (p: Term): Term => app(app(translate, app(rotate90, p)), pair(numeral(1), numeral(2)));
const a = transform(pair(numeral(1), numeral(1)));
const b = transform(pair(numeral(2), numeral(3)));
const c = transform(pair(numeral(4), numeral(2)));
const line = pair(pair(numeral(4), numeral(0)), pair(numeral(1), numeral(0)));

export const acCrossType: Term = eq(Nat, app(app(cross2, a), c), app(app(cross2, a), c));
export const acCrossProof: Term = refl(Nat, app(app(cross2, a), c));
export const acDotType: Term = eq(Nat, app(app(dot2, a), c), numeral(24));
export const acDotProof: Term = refl(Nat, numeral(24));
export const cCircleType: Term = app(app(onCircle, c), pair(c, numeral(45)));
export const cCircleProof: Term = refl(Nat, numeral(45));
export const bIncidenceType: Term = app(app(incidence, b), line);
export const bIncidenceProof: Term = refl(Nat, numeral(4));
export const aVerticalType: Term = app(app(onVerticalLine, a), numeral(2));
export const aVerticalProof: Term = refl(Nat, numeral(2));
export const aNormType: Term = eq(Nat, app(normSq, a), numeral(13));
export const aNormProof: Term = refl(Nat, numeral(13));
