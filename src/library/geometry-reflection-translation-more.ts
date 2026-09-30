import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { normSq } from './geometry-metrics';

export const Point2: Term = prod(Nat, Nat);

/** Reflection after translation and translation after reflection are both computable. */
export const reflectTranslateType: Term = eq(Point2,
  app(reflectX, app(app(translate, pair(numeral(2), numeral(1))), pair(numeral(3), numeral(4)))),
  pair(numeral(5), numeral(5)));
export const reflectTranslateProof: Term = refl(Point2, pair(numeral(5), numeral(5)));

export const translateReflectType: Term = eq(Point2,
  app(app(translate, app(reflectX, pair(numeral(2), numeral(5)))), pair(numeral(3), numeral(4))),
  pair(numeral(5), numeral(9)));
export const translateReflectProof: Term = refl(Point2, pair(numeral(5), numeral(9)));

/** A reflection-rotation-translation pipeline has a concrete norm. */
export const reflectRotateTranslateNormType: Term = eq(Nat,
  app(normSq, app(reflectX, app(rotate90, app(app(translate, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4)))))), numeral(52));
export const reflectRotateTranslateNormProof: Term = refl(Nat, numeral(52));
