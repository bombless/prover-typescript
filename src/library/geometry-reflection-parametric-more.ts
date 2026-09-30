import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);

/** Reflection preserves both coordinates for arbitrary points. */
export const reflectFstGeneralType: Term = pi(Point2, eq(Nat, fst(app(reflectX, variable(0))), fst(variable(0))), 'p');
export const reflectFstGeneralProof: Term = lambda(Point2, refl(Nat, fst(variable(0))), 'p');
export const reflectSndGeneralType: Term = pi(Point2, eq(Nat, snd(app(reflectX, variable(0))), snd(variable(0))), 'p');
export const reflectSndGeneralProof: Term = lambda(Point2, refl(Nat, snd(variable(0))), 'p');

/** Reflection after translation computes on a concrete point. */
export const reflectTranslatedPointType: Term = eq(Point2,
  app(reflectX, app(app(translate, pair(numeral(2), numeral(4))), pair(numeral(3), numeral(5)))),
  pair(numeral(5), numeral(9)));
export const reflectTranslatedPointProof: Term = refl(Point2, pair(numeral(5), numeral(9)));
