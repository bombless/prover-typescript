import { Term, Nat, prod, pair, fst, snd, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { distanceSq } from './geometry-distance';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';

export const Point2: Term = prod(Nat, Nat);
export const Triangle2: Term = prod(Point2, prod(Point2, Point2));
const triangle: Term = pair(pair(numeral(1), numeral(2)), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6))));

/** The three concrete triangle vertices are available for side computations. */
export const firstSecondSideType: Term = eq(Nat,
  app(app(distanceSq, fst(triangle)), fst(snd(triangle))), numeral(11));
export const firstSecondSideProof: Term = refl(Nat, numeral(11));

export const secondThirdSideType: Term = eq(Nat,
  app(app(distanceSq, fst(snd(triangle))), snd(snd(triangle))), numeral(39));
export const secondThirdSideProof: Term = refl(Nat, numeral(39));

export const firstThirdSideType: Term = eq(Nat,
  app(app(distanceSq, fst(triangle)), snd(snd(triangle))), numeral(17));
export const firstThirdSideProof: Term = refl(Nat, numeral(17));

/** Rotating the first vertex before measuring a side is a closed computation. */
export const rotatedFirstSideType: Term = eq(Nat,
  app(app(distanceSq, app(rotate90, fst(triangle))), fst(snd(triangle))),
  app(app(distanceSq, app(rotate90, fst(triangle))), fst(snd(triangle))));
export const rotatedFirstSideProof: Term = refl(Nat, app(app(distanceSq, app(rotate90, fst(triangle))), fst(snd(triangle))));

/** A concrete rotated side measurement reduces through coordinate swapping. */
export const rotatedFirstSideConcreteType: Term = eq(Nat,
  app(app(distanceSq, app(rotate90, fst(triangle))), fst(snd(triangle))), numeral(10));
export const rotatedFirstSideConcreteProof: Term = refl(Nat, numeral(10));

/** Translating the third vertex before measuring a side computes directly. */
export const translatedThirdSideType: Term = eq(Nat,
  app(app(distanceSq, fst(snd(triangle))), app(app(translate, snd(snd(triangle))), pair(numeral(1), numeral(1)))),
  app(app(distanceSq, fst(snd(triangle))), app(app(translate, snd(snd(triangle))), pair(numeral(1), numeral(1)))));
export const translatedThirdSideProof: Term = refl(Nat, app(app(distanceSq, fst(snd(triangle))), app(app(translate, snd(snd(triangle))), pair(numeral(1), numeral(1)))));

/** A translated third vertex gives a concrete side measurement. */
export const translatedThirdSideConcreteType: Term = eq(Nat,
  app(app(distanceSq, fst(snd(triangle))), app(app(translate, snd(snd(triangle))), pair(numeral(1), numeral(1)))), numeral(46));
export const translatedThirdSideConcreteProof: Term = refl(Nat, numeral(46));
