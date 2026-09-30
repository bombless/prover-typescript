import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { incidence } from './geometry-incidence';
import { onCircle } from './geometry-circle';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const point: Term = pair(numeral(2), numeral(3));
const line: Term = pair(pair(numeral(2), numeral(1)), pair(numeral(1), numeral(0)));
const circle: Term = pair(pair(numeral(1), numeral(1)), numeral(5));
const displacement: Term = pair(numeral(1), numeral(2));

/** A concrete configuration combines incidence, circle membership, translation, and rotation certificates. */
export const configurationCertificateBundleType: Term = prod(
  app(app(incidence, point), line),
  prod(
    app(app(onCircle, point), circle),
    prod(
      eq(Point2, app(app(translate, point), displacement), pair(numeral(3), numeral(5))),
      eq(Point2, app(rotate90, point), pair(numeral(3), numeral(2))))));

export const configurationCertificateBundleProof: Term = pair(
  refl(Nat, numeral(2)),
  pair(
    refl(Nat, numeral(5)),
    pair(
      refl(Point2, pair(numeral(3), numeral(5))),
      refl(Point2, pair(numeral(3), numeral(2))))));
