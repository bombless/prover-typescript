import { Term, Nat, prod, pair, app, eq, refl, fst, snd } from '../syntax/ast';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { Circle2 } from './geometry-circle';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const center: Term = pair(numeral(1), numeral(2));
const radius: Term = numeral(5);
const moved: Term = app(app(translate, center), pair(numeral(3), numeral(4)));

/** A concrete circle center is translated, then rotated, while radius is retained. */
export const transformedCircleBundleType: Term = prod(
  eq(Point2, moved, pair(numeral(4), numeral(6))),
  prod(
    eq(Point2, app(rotate90, moved), pair(numeral(6), numeral(4))),
    eq(Nat, radius, numeral(5))));

export const transformedCircleBundleProof: Term = pair(
  refl(Point2, pair(numeral(4), numeral(6))),
  pair(
    refl(Point2, pair(numeral(6), numeral(4))),
    refl(Nat, numeral(5))));
