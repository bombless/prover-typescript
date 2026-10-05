import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { Quadrilateral2 } from './geometry-quadrilateral-four-stage-structure-laws-more';
import { midpoint } from './geometry-segment';
import { translate } from './geometry-transform';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);
const first = (q: Term): Term => fst(q);
const second = (q: Term): Term => fst(snd(q));

/** The translated first edge midpoint of a quadrilateral has an explicit coordinate form. */
export const firstEdgeTranslatedMidpointType: Term = pi(Point2, pi(Quadrilateral2,
  eq(Point2,
    app(app(midpoint, app(app(translate, first(variable(0))), variable(1))),
      app(app(translate, second(variable(0))), variable(1))),
    pair(
      addTerm(fst(first(variable(0))), fst(variable(1))),
      addTerm(snd(second(variable(0))), snd(variable(1)))
    )), 'q'), 'd');

export const firstEdgeTranslatedMidpointProof: Term = lambda(Point2, lambda(Quadrilateral2,
  refl(Point2, pair(
    addTerm(fst(first(variable(0))), fst(variable(1))),
    addTerm(snd(second(variable(0))), snd(variable(1)))
  )), 'q'), 'd');
