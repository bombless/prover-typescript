import { Term, Nat, prod, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { addTerm } from './nat';
import { translate } from './geometry-transform';

export const Point2: Term = prod(Nat, Nat);
export const Triangle2: Term = prod(Point2, prod(Point2, Point2));

/** The first coordinate of a translated triangle's first vertex. */
export const translatedFirstVertexFstType: Term = pi(Point2, pi(Triangle2,
  eq(Nat,
    fst(app(app(translate, fst(variable(0))), variable(1))),
    addTerm(fst(fst(variable(0))), fst(variable(1)))), 't'), 'd');
export const translatedFirstVertexFstProof: Term = lambda(Point2, lambda(Triangle2,
  refl(Nat, addTerm(fst(fst(variable(0))), fst(variable(1)))), 't'), 'd');

/** The second coordinate of a translated triangle's first vertex. */
export const translatedFirstVertexSndType: Term = pi(Point2, pi(Triangle2,
  eq(Nat,
    snd(app(app(translate, fst(variable(0))), variable(1))),
    addTerm(snd(fst(variable(0))), snd(variable(1)))), 't'), 'd');
export const translatedFirstVertexSndProof: Term = lambda(Point2, lambda(Triangle2,
  refl(Nat, addTerm(snd(fst(variable(0))), snd(variable(1)))), 't'), 'd');

/** The translated triangle's tail remains a pair of transformed vertices. */
export const translatedSecondVertexType: Term = pi(Point2, pi(Triangle2,
  eq(Point2,
    app(app(translate, fst(snd(variable(0)))), variable(1)),
    app(app(translate, fst(snd(variable(0)))), variable(1))), 't'), 'd');
export const translatedSecondVertexProof: Term = lambda(Point2, lambda(Triangle2,
  refl(Point2, app(app(translate, fst(snd(variable(0)))), variable(1))), 't'), 'd');

/** A concrete translated triangle first vertex computes. */
import { numeral } from './nat';
import { pair } from '../syntax/ast';
const concreteTriangle: Term = pair(pair(numeral(1), numeral(2)), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6))));
export const translatedConcreteVertexType: Term = eq(Point2,
  app(app(translate, fst(concreteTriangle)), pair(numeral(4), numeral(5))),
  pair(numeral(5), numeral(7)));
export const translatedConcreteVertexProof: Term = refl(Point2, pair(numeral(5), numeral(7)));
