import { Term, Nat, prod, pair, app, eq, refl, fst, snd } from '../syntax/ast';
import { numeral } from './nat';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { onCircle } from './geometry-circle';

export const Point2: Term = prod(Nat, Nat);
export const Circle2: Term = prod(Point2, Nat);

/** Transforming a concrete circle center is directly computable. */
export const translatedCenterType: Term = eq(Point2,
  app(app(translate, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4))),
  pair(numeral(4), numeral(6)));
export const translatedCenterProof: Term = refl(Point2, pair(numeral(4), numeral(6)));

export const rotatedCenterType: Term = eq(Point2, app(rotate90, pair(numeral(3), numeral(4))), pair(numeral(4), numeral(3)));
export const rotatedCenterProof: Term = refl(Point2, pair(numeral(4), numeral(3)));

/** A transformed point and center can be checked as a concrete circle member. */
export const transformedCircleMemberType: Term = app(app(onCircle,
  app(reflectX, app(rotate90, pair(numeral(3), numeral(4))))),
  pair(app(reflectX, app(rotate90, pair(numeral(3), numeral(4)))), numeral(25)));
export const transformedCircleMemberProof: Term = refl(Nat, numeral(25));

/** Center/radius projections remain definitionally available after construction. */
export const constructedCircleProjectionType: Term = eq(Circle2,
  pair(fst(pair(app(rotate90, pair(numeral(3), numeral(4))), numeral(25))), snd(pair(app(rotate90, pair(numeral(3), numeral(4))), numeral(25)))),
  pair(pair(numeral(4), numeral(3)), numeral(25)));
export const constructedCircleProjectionProof: Term = refl(Circle2, pair(pair(numeral(4), numeral(3)), numeral(25)));
