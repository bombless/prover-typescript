import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { normSq } from './geometry-metrics';
import { distanceSq } from './geometry-distance';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(2), numeral(3));
const d: Term = pair(numeral(1), numeral(4));
const moved: Term = app(app(translate, p), d);
const turned: Term = app(rotate90, moved);
const reflected: Term = app(reflectX, turned);

/** A three-stage point pipeline exposes each intermediate point and final norm. */
export const transformStagesType: Term = prod(
  eq(Point2, moved, pair(numeral(3), numeral(7))),
  prod(
    eq(Point2, turned, pair(numeral(7), numeral(3))),
    prod(
      eq(Point2, reflected, pair(numeral(7), numeral(3))),
      eq(Nat, app(normSq, reflected), numeral(58)))));
export const transformStagesProof: Term = pair(
  refl(Point2, pair(numeral(3), numeral(7))),
  pair(
    refl(Point2, pair(numeral(7), numeral(3))),
    pair(refl(Point2, pair(numeral(7), numeral(3))), refl(Nat, numeral(58)))));

/** The same pipeline gives a concrete distance from the original point. */
export const transformDistanceType: Term = eq(Nat, app(app(distanceSq, reflected), p), numeral(23));
export const transformDistanceProof: Term = refl(Nat, numeral(23));
