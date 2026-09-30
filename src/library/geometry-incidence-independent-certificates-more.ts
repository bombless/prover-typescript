import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { incidence } from './geometry-incidence';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Line2: Term = prod(Point2, prod(Nat, Nat));

const p1: Term = pair(numeral(2), numeral(7));
const l1: Term = pair(pair(numeral(2), numeral(1)), pair(numeral(3), numeral(4)));
const p2: Term = pair(numeral(5), numeral(1));
const l2: Term = pair(pair(numeral(5), numeral(9)), pair(numeral(2), numeral(6)));

export const incidenceFirstType: Term = app(app(incidence, p1), l1);
export const incidenceFirstProof: Term = refl(Nat, numeral(2));
export const incidenceSecondType: Term = app(app(incidence, p2), l2);
export const incidenceSecondProof: Term = refl(Nat, numeral(5));
export const incidenceOriginType: Term = app(app(incidence, pair({ kind: 'Zero' }, { kind: 'Zero' })), pair(pair({ kind: 'Zero' }, { kind: 'Zero' }), pair({ kind: 'Zero' }, { kind: 'Zero' })));
export const incidenceOriginProof: Term = refl(Nat, { kind: 'Zero' });
