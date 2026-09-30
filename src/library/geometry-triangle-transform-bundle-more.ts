import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { translate } from './geometry-transform';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const displacement: Term = pair(numeral(2), numeral(1));
const v1: Term = pair(numeral(1), numeral(2));
const v2: Term = pair(numeral(3), numeral(4));
const v3: Term = pair(numeral(5), numeral(6));

/** All three vertices of a concrete triangle are translated together. */
export const translatedTriangleBundleType: Term = prod(
  eq(Point2, app(app(translate, v1), displacement), pair(numeral(3), numeral(3))),
  prod(
    eq(Point2, app(app(translate, v2), displacement), pair(numeral(5), numeral(5))),
    eq(Point2, app(app(translate, v3), displacement), pair(numeral(7), numeral(7)))));

export const translatedTriangleBundleProof: Term = pair(
  refl(Point2, pair(numeral(3), numeral(3))),
  pair(
    refl(Point2, pair(numeral(5), numeral(5))),
    refl(Point2, pair(numeral(7), numeral(7)))));
