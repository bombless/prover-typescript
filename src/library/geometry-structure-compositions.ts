import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { Triangle2 } from './geometry-triangle';
import { Circle2 } from './geometry-circle-laws';
import { Line2 } from './geometry-line';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { distanceSq } from './geometry-distance';

export const Point2: Term = prod(Nat, Nat);

const triangle: Term = pair(pair(numeral(1), numeral(2)), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6))));
const circle: Term = pair(pair(numeral(3), numeral(4)), numeral(5));
const line: Term = pair(pair(numeral(2), numeral(3)), pair(numeral(1), numeral(0)));

/** Transform the first vertex of a concrete triangle. */
export const transformedTriangleVertexType: Term = eq(Point2,
  app(rotate90, fst(triangle)), pair(numeral(2), numeral(1)));
export const transformedTriangleVertexProof: Term = refl(Point2, pair(numeral(2), numeral(1)));

/** Translate a circle center as a concrete point computation. */
export const translatedCircleCenterType: Term = eq(Point2,
  app(app(translate, fst(circle)), pair(numeral(2), numeral(3))), pair(numeral(5), numeral(7)));
export const translatedCircleCenterProof: Term = refl(Point2, pair(numeral(5), numeral(7)));

/** Distance from a line base to a concrete point. */
export const lineBaseDistanceType: Term = eq(Nat,
  app(app(distanceSq, fst(line)), pair(numeral(5), numeral(7))), numeral(31));
export const lineBaseDistanceProof: Term = refl(Nat, numeral(31));

/** A nested structure projection followed by translation is still reducible. */
export const translatedSecondVertexType: Term = eq(Point2,
  app(app(translate, fst(snd(triangle))), pair(numeral(1), numeral(1))), pair(numeral(4), numeral(5)));
export const translatedSecondVertexProof: Term = refl(Point2, pair(numeral(4), numeral(5)));

/** Triangle tail projection preserves its pair type. */
export const triangleTailProjectionType: Term = pi(Triangle2,
  eq(prod(Point2, Point2), snd(variable(0)), snd(variable(0))), 't');
export const triangleTailProjectionProof: Term = lambda(Triangle2, refl(prod(Point2, Point2), snd(variable(0))), 't');

/** Circle center/radius reconstruction for every circle. */
export const circleStructureType: Term = pi(Circle2,
  eq(Circle2, pair(fst(variable(0)), snd(variable(0))), variable(0)), 'c');
export const circleStructureProof: Term = lambda(Circle2, refl(Circle2, variable(0)), 'c');

/** Line base/direction reconstruction for every line. */
export const lineStructureType: Term = pi(Line2,
  eq(Line2, pair(fst(variable(0)), snd(variable(0))), variable(0)), 'l');
export const lineStructureProof: Term = lambda(Line2, refl(Line2, variable(0)), 'l');
