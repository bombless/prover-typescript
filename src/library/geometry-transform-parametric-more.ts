import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { numeral, addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);

/** First coordinate after rotating a translated point. */
export const rotateTranslateFstType: Term = pi(Point2, pi(Point2, pi(Point2,
  eq(Nat,
    fst(app(rotate90, app(app(translate, variable(1)), variable(0)))),
    addTerm(snd(variable(1)), snd(variable(0)))), 'd'), 'p'), 'q');
export const rotateTranslateFstProof: Term = lambda(Point2, lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(snd(variable(1)), snd(variable(0)))), 'd'), 'p'), 'q');

/** Second coordinate after rotating a translated point. */
export const rotateTranslateSndType: Term = pi(Point2, pi(Point2, pi(Point2,
  eq(Nat,
    snd(app(rotate90, app(app(translate, variable(1)), variable(0)))),
    addTerm(fst(variable(1)), fst(variable(0)))), 'd'), 'p'), 'q');
export const rotateTranslateSndProof: Term = lambda(Point2, lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(fst(variable(1)), fst(variable(0)))), 'd'), 'p'), 'q');

/** Two concrete translations associate by direct reduction. */
export const translateTwiceType: Term = eq(Point2,
  app(app(translate, app(app(translate, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4)))), pair(numeral(5), numeral(6))),
  pair(numeral(9), numeral(12)));
export const translateTwiceProof: Term = refl(Point2, pair(numeral(9), numeral(12)));
