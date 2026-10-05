import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { midpoint } from './geometry-segment';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { scaleVec } from './geometry-scalar';
import { addTerm } from './nat';
import { mulTerm } from './mul';

export const Point2: Term = prod(Nat, Nat);
const v1 = (t: Term): Term => fst(t);
const v2 = (t: Term): Term => fst(snd(t));
const transformed = (k: Term, p: Term, d: Term): Term =>
  app(app(translate, app(rotate90, app(app(scaleVec, k), p))), d);

/** The transformed midpoint of the first edge exposes both coordinate formulas. */
export const firstEdgeTransformedMidpointType: Term = pi(Nat, pi(Point2, pi(Triangle2,
  eq(Point2,
    app(app(midpoint, transformed(variable(2), v1(variable(0)), variable(1))),
      transformed(variable(2), v2(variable(0)), variable(1))),
    pair(
      addTerm(mulTerm(variable(2), snd(v1(variable(0)))), fst(variable(1))),
      addTerm(mulTerm(variable(2), fst(v2(variable(0)))), snd(variable(1)))
    )), 't'), 'd'), 'k');

export const firstEdgeTransformedMidpointProof: Term = lambda(Nat, lambda(Point2, lambda(Triangle2,
  refl(Point2, pair(
    addTerm(mulTerm(variable(2), snd(v1(variable(0)))), fst(variable(1))),
    addTerm(mulTerm(variable(2), fst(v2(variable(0)))), snd(variable(1)))
  )), 't'), 'd'), 'k');
