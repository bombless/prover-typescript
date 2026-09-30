import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { parallelVec } from './geometry-parallel';
import { perpendicularVec } from './geometry-relations';
import { collinear2 } from './geometry-collinear';
import { incidence } from './geometry-incidence';
import { onVerticalLine } from './geometry-line';
import { rightAngle } from './geometry-angle';

export const Point2: Term = prod(Nat, Nat);
export const Vec2: Term = Point2;
export const Line2: Term = prod(Point2, Vec2);

/** Concrete axis vectors satisfy the parallel relation in the current model. */
export const parallelZeroType: Term = app(app(parallelVec, pair(numeral(2), { kind: 'Zero' })), pair(numeral(4), { kind: 'Zero' }));
export const parallelZeroProof: Term = refl(Nat, { kind: 'Zero' });

/** Concrete axis vectors satisfy the perpendicular relation. */
export const perpendicularAxisType: Term = app(app(perpendicularVec, pair(numeral(3), { kind: 'Zero' })), pair({ kind: 'Zero' }, numeral(5)));
export const perpendicularAxisProof: Term = refl(Nat, { kind: 'Zero' });

/** Collinearity reduces for a concrete triple in the discrete model. */
export const collinearConcreteMoreType: Term = app(app(app(collinear2, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4))), pair(numeral(5), numeral(6)));
export const collinearConcreteMoreProof: Term = refl(Nat, { kind: 'Zero' });

/** Incidence and vertical-line predicates can be composed on concrete data. */
export const incidenceConcreteMoreType: Term = app(app(incidence, pair(numeral(7), numeral(9))),
  pair(pair(numeral(7), numeral(1)), pair(numeral(2), numeral(3))));
export const incidenceConcreteMoreProof: Term = refl(Nat, numeral(7));

export const verticalConcreteMoreType: Term = app(app(onVerticalLine, pair(numeral(6), numeral(8))), numeral(6));
export const verticalConcreteMoreProof: Term = refl(Nat, numeral(6));

export const rightAngleConcreteMoreType: Term = app(app(rightAngle, pair(numeral(4), { kind: 'Zero' })), pair({ kind: 'Zero' }, numeral(7)));
export const rightAngleConcreteMoreProof: Term = refl(Nat, { kind: 'Zero' });
