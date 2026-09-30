import { Term, Nat, prod, pair, app, eq, refl, fst, snd } from '../syntax/ast';
import { numeral } from './nat';
import { incidence } from './geometry-incidence';
import { onVerticalLine } from './geometry-line';
import { onCircle } from './geometry-circle';

export const Point2: Term = prod(Nat, Nat);
export const Line2: Term = prod(Point2, prod(Nat, Nat));
export const Circle2: Term = prod(Point2, Nat);

/** A concrete point-line incidence expression reduces to coordinate equality. */
export const incidenceConcreteType: Term = app(app(incidence, pair(numeral(4), numeral(7))),
  pair(pair(numeral(4), numeral(2)), pair(numeral(1), numeral(0))));
export const incidenceConcreteProof: Term = refl(Nat, numeral(4));

/** A concrete vertical-line predicate exposes the point x-coordinate. */
export const verticalConcreteType: Term = app(app(onVerticalLine, pair(numeral(6), numeral(8))), numeral(6));
export const verticalConcreteProof: Term = refl(Nat, numeral(6));

/** A circle's center and radius projections compose into membership data. */
export const circleProjectionType: Term = eq(Circle2,
  pair(fst(pair(pair(numeral(3), numeral(4)), numeral(5))), snd(pair(pair(numeral(3), numeral(4)), numeral(5)))),
  pair(pair(numeral(3), numeral(4)), numeral(5)));
export const circleProjectionProof: Term = refl(Circle2, pair(pair(numeral(3), numeral(4)), numeral(5)));

/** A line base and direction can be reconstructed from a concrete line. */
export const lineProjectionType: Term = eq(Line2,
  pair(fst(pair(pair(numeral(2), numeral(3)), pair(numeral(1), numeral(0)))), snd(pair(pair(numeral(2), numeral(3)), pair(numeral(1), numeral(0))))),
  pair(pair(numeral(2), numeral(3)), pair(numeral(1), numeral(0))));
export const lineProjectionProof: Term = refl(Line2, pair(pair(numeral(2), numeral(3)), pair(numeral(1), numeral(0))));
