import { Term, Nat, prod, pair, fst, snd, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { Triangle2 } from './geometry-triangle';
import { Circle2 } from './geometry-circle-laws';
import { Line2 } from './geometry-line';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';

export const Point2: Term = prod(Nat, Nat);
const triangle: Term = pair(pair(numeral(1), numeral(2)), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6))));
const circle: Term = pair(pair(numeral(3), numeral(4)), numeral(5));
const line: Term = pair(pair(numeral(2), numeral(3)), pair(numeral(1), numeral(0)));

/** A triangle projection can be transformed and reassembled as a concrete point. */
export const triangleTailVertexRotateType: Term = eq(Point2,
  app(rotate90, snd(snd(triangle))), pair(numeral(6), numeral(5)));
export const triangleTailVertexRotateProof: Term = refl(Point2, pair(numeral(6), numeral(5)));

/** Circle radius projection remains available after translating its center. */
export const translatedCircleRadiusType: Term = eq(Nat, snd(circle), numeral(5));
export const translatedCircleRadiusProof: Term = refl(Nat, numeral(5));

/** A rotated line direction remains a concrete pair. */
export const rotatedLineDirectionType: Term = eq(Point2, app(rotate90, snd(line)), pair(numeral(0), numeral(1)));
export const rotatedLineDirectionProof: Term = refl(Point2, pair(numeral(0), numeral(1)));

/** Translating a line base is directly computable. */
export const translatedLineBaseType: Term = eq(Point2,
  app(app(translate, fst(line)), pair(numeral(2), numeral(1))), pair(numeral(4), numeral(4)));
export const translatedLineBaseProof: Term = refl(Point2, pair(numeral(4), numeral(4)));
