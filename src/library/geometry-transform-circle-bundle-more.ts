import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { onCircle } from './geometry-circle';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Circle2: Term = prod(Point2, Nat);
const p: Term = pair(numeral(3), numeral(4));
const d: Term = pair(numeral(1), numeral(2));
const translated: Term = app(app(translate, p), d);
const rotated: Term = app(rotate90, p);
const reflected: Term = app(reflectX, p);

/** Concrete transformed points each carry a directly computed zero-radius circle certificate. */
export const transformCircleBundleType: Term = prod(
  eq(Point2, translated, pair(numeral(4), numeral(6))),
  prod(
    app(app(onCircle, translated), pair(translated, numeral(52))),
    prod(
      eq(Point2, rotated, pair(numeral(4), numeral(3))),
      prod(
        app(app(onCircle, rotated), pair(rotated, numeral(25))),
        prod(
          eq(Point2, reflected, pair(numeral(3), numeral(4))),
          app(app(onCircle, reflected), pair(reflected, numeral(25))))))));

export const transformCircleBundleProof: Term = pair(
  refl(Point2, pair(numeral(4), numeral(6))),
  pair(
    refl(Nat, numeral(52)),
    pair(
      refl(Point2, pair(numeral(4), numeral(3))),
      pair(
        refl(Nat, numeral(25)),
        pair(
          refl(Point2, pair(numeral(3), numeral(4))),
          refl(Nat, numeral(25)))))));
