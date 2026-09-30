import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { incidence } from './geometry-incidence';
import { onCircle } from './geometry-circle';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(2), numeral(3));
const moved: Term = app(app(translate, p), pair(numeral(1), numeral(2)));
const turned: Term = app(rotate90, p);
const line: Term = pair(pair(numeral(2), numeral(0)), pair(numeral(1), numeral(0)));
const circle: Term = pair(pair(numeral(1), numeral(1)), numeral(5));

/** A concrete point, its translation, and its rotation carry incidence and circle certificates. */
export const transformIncidenceCircleBundleType: Term = prod(
  app(app(incidence, p), line),
  prod(
    app(app(onCircle, p), circle),
    prod(
      eq(Point2, moved, pair(numeral(3), numeral(5))),
      prod(
        eq(Point2, turned, pair(numeral(3), numeral(2))),
        app(app(onCircle, turned), pair(turned, numeral(13)))))));

export const transformIncidenceCircleBundleProof: Term = pair(
  refl(Nat, numeral(2)),
  pair(
    refl(Nat, numeral(5)),
    pair(
      refl(Point2, pair(numeral(3), numeral(5))),
      pair(
        refl(Point2, pair(numeral(3), numeral(2))),
        refl(Nat, numeral(13))))));
