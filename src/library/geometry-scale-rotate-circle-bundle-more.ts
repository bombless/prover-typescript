import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { onCircle } from './geometry-circle';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(2), numeral(3));
const scaled: Term = app(app(scaleVec, numeral(2)), p);
const turned: Term = app(rotate90, scaled);

/** A scale-then-rotate point carries its coordinates, norm, and circle membership. */
export const scaleRotateCircleBundleType: Term = prod(
  eq(Point2, turned, pair(numeral(6), numeral(4))),
  prod(
    eq(Nat, app(normSq, turned), numeral(52)),
    app(app(onCircle, turned), pair(turned, numeral(52)))));

export const scaleRotateCircleBundleProof: Term = pair(
  refl(Point2, pair(numeral(6), numeral(4))),
  pair(refl(Nat, numeral(52)), refl(Nat, numeral(52))));
