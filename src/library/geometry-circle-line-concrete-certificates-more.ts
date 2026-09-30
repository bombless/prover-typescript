import { Term, Nat, prod, pair, app, refl } from '../syntax/ast';
import { onCircle } from './geometry-circle';
import { incidence } from './geometry-incidence';
import { onVerticalLine } from './geometry-line';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Line2: Term = prod(Point2, prod(Nat, Nat));
const p: Term = pair(numeral(2), numeral(3));
const circle: Term = pair(p, numeral(13));
const line: Term = pair(p, pair(numeral(1), numeral(0)));

export const selfCircleType: Term = app(app(onCircle, p), circle);
export const selfCircleProof: Term = refl(Nat, numeral(13));
export const lineIncidenceType: Term = app(app(incidence, p), line);
export const lineIncidenceProof: Term = refl(Nat, numeral(2));
export const verticalMembershipType: Term = app(app(onVerticalLine, p), numeral(2));
export const verticalMembershipProof: Term = refl(Nat, numeral(2));

const q: Term = pair(numeral(2), numeral(7));
export const sharedVerticalLineType: Term = app(app(incidence, q), line);
export const sharedVerticalLineProof: Term = refl(Nat, numeral(2));
