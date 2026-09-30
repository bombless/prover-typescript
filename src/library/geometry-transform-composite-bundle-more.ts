import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(2), numeral(3));
const d: Term = pair(numeral(1), numeral(2));
const translated: Term = app(app(translate, p), d);
const rotated: Term = app(rotate90, translated);
const reflected: Term = app(reflectX, rotated);

/** A three-stage concrete transform is accompanied by coordinates and a final metric. */
export const transformCompositeBundleType: Term = prod(
  eq(Point2, translated, pair(numeral(3), numeral(5))),
  prod(
    eq(Point2, rotated, pair(numeral(5), numeral(3))),
    prod(
      eq(Point2, reflected, pair(numeral(5), numeral(3))),
      eq(Nat, app(normSq, reflected), numeral(34)))));

export const transformCompositeBundleProof: Term = pair(
  refl(Point2, pair(numeral(3), numeral(5))),
  pair(
    refl(Point2, pair(numeral(5), numeral(3))),
    pair(
      refl(Point2, pair(numeral(5), numeral(3))),
      refl(Nat, numeral(34)))));
