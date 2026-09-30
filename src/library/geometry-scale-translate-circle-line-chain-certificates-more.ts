import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { translate } from './geometry-transform';
import { onCircle } from './geometry-circle';
import { incidence } from './geometry-incidence';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p = pair(numeral(2), numeral(1));
const q = app(app(translate, app(app(scaleVec, numeral(3)), p)), pair(numeral(1), numeral(2)));
const line = pair(pair(numeral(7), numeral(0)), pair(numeral(1), numeral(0)));

export const pointType: Term = eq(Point2, q, pair(numeral(7), numeral(5)));
export const pointProof: Term = refl(Point2, pair(numeral(7), numeral(5)));
export const normType: Term = eq(Nat, app(normSq, q), numeral(74));
export const normProof: Term = refl(Nat, numeral(74));
export const circleType: Term = app(app(onCircle, q), pair(q, numeral(74)));
export const circleProof: Term = refl(Nat, numeral(74));
export const incidenceType: Term = app(app(incidence, q), line);
export const incidenceProof: Term = refl(Nat, numeral(7));
