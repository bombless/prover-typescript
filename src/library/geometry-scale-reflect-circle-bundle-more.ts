import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { reflectX } from './geometry-reflections';
import { onCircle } from './geometry-circle';
import { normSq, dot2 } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(2), numeral(3));
const scaled: Term = app(app(scaleVec, numeral(2)), p);
const reflected: Term = app(reflectX, scaled);

/** A scale-then-reflect point carries coordinates, norm, dot, and circle certificates. */
export const scaleReflectCircleBundleType: Term = prod(
  eq(Point2, reflected, pair(numeral(4), numeral(6))),
  prod(
    eq(Nat, app(normSq, reflected), numeral(52)),
    prod(
      eq(Nat, app(app(dot2, reflected), p), numeral(26)),
      app(app(onCircle, reflected), pair(reflected, numeral(52))))));

export const scaleReflectCircleBundleProof: Term = pair(
  refl(Point2, pair(numeral(4), numeral(6))),
  pair(
    refl(Nat, numeral(52)),
    pair(refl(Nat, numeral(26)), refl(Nat, numeral(52)))));
