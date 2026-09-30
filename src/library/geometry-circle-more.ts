import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { onCircle } from './geometry-circle';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';

export const Point2: Term = prod(Nat, Nat);
export const Circle2: Term = prod(Point2, Nat);

/** Concrete circle membership reduces through distance and radius definitions. */
export const concreteMembershipType: Term = app(app(onCircle, pair(numeral(3), numeral(4))),
  pair(pair(numeral(3), numeral(4)), numeral(25)));
export const concreteMembershipProof: Term = refl(Nat, numeral(25));

/** A translated point and translated center form a directly computable membership expression. */
export const translatedMembershipType: Term = app(app(onCircle,
  app(app(translate, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4)))),
  pair(app(app(translate, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4))), numeral(52)));
export const translatedMembershipProof: Term = refl(Nat, numeral(52));

/** Rotation of a point can be checked as circle membership at its computed radius. */
export const rotatedMembershipType: Term = app(app(onCircle, app(rotate90, pair(numeral(3), numeral(4)))),
  pair(app(rotate90, pair(numeral(3), numeral(4))), numeral(25)));
export const rotatedMembershipProof: Term = refl(Nat, numeral(25));
