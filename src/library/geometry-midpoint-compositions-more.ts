import { Term, Nat, prod, pair, app, eq, refl, fst, snd } from '../syntax/ast';
import { numeral } from './nat';
import { midpoint } from './geometry-segment';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';

export const Point2: Term = prod(Nat, Nat);

/** A midpoint can be translated as a concrete point in the discrete model. */
export const translatedMidpointType: Term = eq(Point2,
  app(app(translate, app(app(midpoint, pair(numeral(2), numeral(3))), pair(numeral(4), numeral(5)))), pair(numeral(1), numeral(2))),
  pair(numeral(3), numeral(7)));
export const translatedMidpointProof: Term = refl(Point2, pair(numeral(3), numeral(7)));

/** Rotation of a discrete midpoint computes coordinatewise. */
export const rotatedMidpointType: Term = eq(Point2,
  app(rotate90, app(app(midpoint, pair(numeral(2), numeral(3))), pair(numeral(4), numeral(5)))),
  pair(numeral(5), numeral(2)));
export const rotatedMidpointProof: Term = refl(Point2, pair(numeral(5), numeral(2)));

/** Projections of a transformed midpoint remain concrete. */
export const translatedMidpointFstType: Term = eq(Nat,
  fst(app(app(translate, app(app(midpoint, pair(numeral(2), numeral(3))), pair(numeral(4), numeral(5)))), pair(numeral(1), numeral(2)))), numeral(3));
export const translatedMidpointFstProof: Term = refl(Nat, numeral(3));

export const translatedMidpointSndType: Term = eq(Nat,
  snd(app(app(translate, app(app(midpoint, pair(numeral(2), numeral(3))), pair(numeral(4), numeral(5)))), pair(numeral(1), numeral(2)))), numeral(7));
export const translatedMidpointSndProof: Term = refl(Nat, numeral(7));
