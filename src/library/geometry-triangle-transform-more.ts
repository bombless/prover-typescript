import { Term, Nat, prod, pair, fst, snd, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { distanceSq } from './geometry-distance';

export const Point2: Term = prod(Nat, Nat);
export const Triangle2: Term = prod(Point2, prod(Point2, Point2));
const triangle: Term = pair(pair(numeral(1), numeral(2)), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6))));

/** Transforming each vertex of a concrete triangle yields a new triangle. */
const transformed: Term = pair(
  app(rotate90, fst(triangle)),
  pair(app(rotate90, fst(snd(triangle))), app(rotate90, snd(snd(triangle)))));
export const transformedTriangleType: Term = eq(Triangle2, transformed,
  pair(pair(numeral(2), numeral(1)), pair(pair(numeral(4), numeral(3)), pair(numeral(6), numeral(5)))));
export const transformedTriangleProof: Term = refl(Triangle2,
  pair(pair(numeral(2), numeral(1)), pair(pair(numeral(4), numeral(3)), pair(numeral(6), numeral(5)))));

/** A transformed triangle side remains directly measurable. */
export const transformedSideType: Term = eq(Nat,
  app(app(distanceSq, app(rotate90, fst(triangle))), app(rotate90, fst(snd(triangle)))), numeral(11));
export const transformedSideProof: Term = refl(Nat, numeral(11));

/** A reflected and translated vertex computes as a concrete point. */
const reflectedTranslatedVertex: Term = app(reflectX, app(app(translate, pair(numeral(2), numeral(3))), snd(snd(triangle))));
export const reflectedTranslatedVertexType: Term = eq(Point2, reflectedTranslatedVertex, reflectedTranslatedVertex);
export const reflectedTranslatedVertexProof: Term = refl(Point2, reflectedTranslatedVertex);
