import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { midpoint } from './geometry-segment';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const a: Term = pair(numeral(1), numeral(2));
const b: Term = pair(numeral(3), numeral(4));
const midpointPoint: Term = app(app(midpoint, a), b);

/** A concrete midpoint remains computable through rotation and translation. */
export const midpointTransformBundleType: Term = prod(
  eq(Point2, midpointPoint, pair(numeral(1), numeral(4))),
  prod(
    eq(Point2, app(rotate90, midpointPoint), pair(numeral(4), numeral(1))),
    eq(Point2, app(app(translate, midpointPoint), pair(numeral(2), numeral(3))), pair(numeral(3), numeral(7)))));

export const midpointTransformBundleProof: Term = pair(
  refl(Point2, pair(numeral(1), numeral(4))),
  pair(
    refl(Point2, pair(numeral(4), numeral(1))),
    refl(Point2, pair(numeral(3), numeral(7)))));
