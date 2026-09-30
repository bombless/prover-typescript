import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { midpoint } from './geometry-segment';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { scaleVec } from './geometry-scalar';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(1), numeral(2));
const q: Term = pair(numeral(3), numeral(4));
const m: Term = app(app(midpoint, p), q);
const transformedM: Term = app(app(translate, app(rotate90, app(app(scaleVec, numeral(2)), m))), pair(numeral(1), numeral(1)));

/** A concrete midpoint can itself be transformed and its final coordinates checked. */
export const midpointTransformBundleType: Term = prod(
  eq(Point2, m, pair(numeral(1), numeral(4))),
  eq(Point2, transformedM, pair(numeral(9), numeral(3))));

export const midpointTransformBundleProof: Term = pair(
  refl(Point2, pair(numeral(1), numeral(4))),
  refl(Point2, pair(numeral(9), numeral(3))));
