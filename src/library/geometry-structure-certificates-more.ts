import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { Circle2, onCircle } from './geometry-circle';
import { Line2 } from './geometry-line';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);

/** Circle center and radius projections are available together. */
export const circleProjectionBundleType: Term = pi(Circle2,
  prod(eq(Point2, fst(variable(0)), fst(variable(0))), eq(Nat, snd(variable(0)), snd(variable(0)))), 'c');
export const circleProjectionBundleProof: Term = lambda(Circle2,
  pair(refl(Point2, fst(variable(0))), refl(Nat, snd(variable(0)))), 'c');

/** Line base and direction projections are available together. */
export const lineProjectionBundleType: Term = pi(Line2,
  prod(eq(Point2, fst(variable(0)), fst(variable(0))), eq(Point2, snd(variable(0)), snd(variable(0)))), 'l');
export const lineProjectionBundleProof: Term = lambda(Line2,
  pair(refl(Point2, fst(variable(0))), refl(Point2, snd(variable(0)))), 'l');

/** A concrete point lies on a concrete circle under the discrete distance definition. */
export const concreteCircleMembershipType: Term = app(app(onCircle,
  pair(numeral(2), numeral(3))), pair(pair(numeral(1), numeral(1)), numeral(5)));
export const concreteCircleMembershipProof: Term = refl(Nat, numeral(5));
