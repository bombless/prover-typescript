import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { midpoint } from './geometry-segment';
import { onCircle } from './geometry-circle';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(1), numeral(2));
const q: Term = pair(numeral(3), numeral(4));
const tp: Term = app(app(translate, app(rotate90, app(app(scaleVec, numeral(2)), p))), pair(numeral(1), numeral(1)));
const tq: Term = app(app(translate, app(rotate90, app(app(scaleVec, numeral(2)), q))), pair(numeral(1), numeral(1)));

/** Two transformed points carry their coordinates, a midpoint, and circle membership for the first point. */
export const twoPointTransformMidpointBundleType: Term = prod(
  eq(Point2, tp, pair(numeral(5), numeral(3))),
  prod(
    eq(Point2, tq, pair(numeral(9), numeral(7))),
    prod(
      eq(Point2, app(app(midpoint, tp), tq), pair(numeral(5), numeral(7))),
      app(app(onCircle, tp), pair(tp, numeral(34))))));

export const twoPointTransformMidpointBundleProof: Term = pair(
  refl(Point2, pair(numeral(5), numeral(3))),
  pair(
    refl(Point2, pair(numeral(9), numeral(7))),
    pair(
      refl(Point2, pair(numeral(5), numeral(7))),
      refl(Nat, numeral(34)))));
