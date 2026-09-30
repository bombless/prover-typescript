import { Term, Nat, prod, pair, app, eq, refl, fst, snd } from '../syntax/ast';
import { numeral } from './nat';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { onVerticalLine } from './geometry-line';
import { incidence } from './geometry-incidence';

export const Point2: Term = prod(Nat, Nat);
export const Line2: Term = prod(Point2, prod(Nat, Nat));

/** A transformed point can be fed into the vertical-line predicate. */
export const translatedVerticalType: Term = app(app(onVerticalLine,
  app(app(translate, pair(numeral(2), numeral(3))), pair(numeral(4), numeral(5)))), numeral(6));
export const translatedVerticalProof: Term = refl(Nat, numeral(6));

/** Rotation followed by vertical-line checking computes the x-coordinate. */
export const rotatedVerticalType: Term = app(app(onVerticalLine, app(rotate90, pair(numeral(2), numeral(6)))), numeral(6));
export const rotatedVerticalProof: Term = refl(Nat, numeral(6));

/** A translated point and concrete line can be checked for incidence. */
export const translatedIncidenceType: Term = app(app(incidence,
  app(app(translate, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4)))),
  pair(pair(numeral(4), numeral(2)), pair(numeral(1), numeral(0))));
export const translatedIncidenceProof: Term = refl(Nat, numeral(4));

/** A rotated line-like pair exposes its concrete base and direction. */
export const rotatedLineProjectionType: Term = eq(Line2,
  pair(fst(pair(app(rotate90, pair(numeral(2), numeral(3))), pair(numeral(1), numeral(0)))), snd(pair(app(rotate90, pair(numeral(2), numeral(3))), pair(numeral(1), numeral(0))))),
  pair(pair(numeral(3), numeral(2)), pair(numeral(1), numeral(0))));
export const rotatedLineProjectionProof: Term = refl(Line2, pair(pair(numeral(3), numeral(2)), pair(numeral(1), numeral(0))));
