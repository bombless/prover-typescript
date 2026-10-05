import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { midpoint } from './geometry-segment';
import { translate } from './geometry-transform';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);
const first = (t: Term): Term => fst(t);
const second = (t: Term): Term => fst(snd(t));

/** The first edge midpoint after translating both endpoints has an explicit coordinate form. */
export const translatedFirstEdgeMidpointType: Term = pi(Point2, pi(Triangle2,
  eq(Point2,
    app(app(midpoint, app(app(translate, first(variable(0))), variable(1))),
      app(app(translate, second(variable(0))), variable(1))),
    pair(
      addTerm(fst(first(variable(0))), fst(variable(1))),
      addTerm(snd(second(variable(0))), snd(variable(1)))
    )), 't'), 'd');

export const translatedFirstEdgeMidpointProof: Term = lambda(Point2, lambda(Triangle2,
  refl(Point2, pair(
    addTerm(fst(first(variable(0))), fst(variable(1))),
    addTerm(snd(second(variable(0))), snd(variable(1)))
  )), 't'), 'd');
