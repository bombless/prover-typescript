import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { translate } from './geometry-transform';
import { incidence } from './geometry-incidence';
import { onVerticalLine } from './geometry-line';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Line2: Term = prod(Point2, prod(Nat, Nat));

/** The x-coordinate of a translated point is the coordinate sum. */
export const translatedPointFstType: Term = pi(Point2, pi(Point2,
  eq(Nat, fst(app(app(translate, variable(1)), variable(0))),
    addTerm(fst(variable(1)), fst(variable(0)))), 'd'), 'p');
export const translatedPointFstProof: Term = lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(fst(variable(1)), fst(variable(0)))), 'd'), 'p');

/** A translated point lies on the vertical line named by its resulting x-coordinate. */
export const translatedSelfVerticalType: Term = pi(Point2, pi(Point2,
  app(app(onVerticalLine,
    app(app(translate, variable(1)), variable(0))),
    addTerm(fst(variable(1)), fst(variable(0)))), 'd'), 'p');
export const translatedSelfVerticalProof: Term = lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(fst(variable(1)), fst(variable(0)))), 'd'), 'p');

/** A translated point is incident to a line whose base has the translated x-coordinate. */
export const translatedIncidenceType: Term = pi(Point2, pi(Point2, pi(Point2,
  app(app(incidence,
    app(app(translate, variable(2)), variable(1))),
    pair(pair(addTerm(fst(variable(2)), fst(variable(1))), snd(variable(0))), variable(0))),
  'dir'), 'd'), 'p');
export const translatedIncidenceProof: Term = lambda(Point2, lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(fst(variable(2)), fst(variable(1)))), 'dir'), 'd'), 'p');

/** A translated line base exposes both coordinate sums. */
export const translatedLineBaseType: Term = pi(Point2, pi(Point2,
  eq(Point2,
    app(app(translate, variable(1)), variable(0)),
    pair(addTerm(fst(variable(1)), fst(variable(0))), addTerm(snd(variable(1)), snd(variable(0))))), 'd'), 'p');
export const translatedLineBaseProof: Term = lambda(Point2, lambda(Point2,
  refl(Point2, pair(addTerm(fst(variable(1)), fst(variable(0))), addTerm(snd(variable(1)), snd(variable(0))))), 'd'), 'p');
