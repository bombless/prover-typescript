import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { midpoint } from './geometry-segment';
import { normSq, dot2 } from './geometry-metrics';
import { distanceSq } from './geometry-distance';
import { mulTerm } from './mul';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);
const m = (p: Term, q: Term): Term => app(app(midpoint, p), q);
const midFormula = (p: Term, q: Term): Term => pair(fst(p), snd(q));

/** The norm of a discrete midpoint expands coordinatewise. */
export const midpointNormType: Term = pi(Point2, pi(Point2,
  eq(Nat, app(normSq, m(variable(1), variable(0))),
    addTerm(mulTerm(fst(variable(1)), fst(variable(1))), mulTerm(snd(variable(0)), snd(variable(0))))), 'q'), 'p');
export const midpointNormProof: Term = lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(mulTerm(fst(variable(1)), fst(variable(1))), mulTerm(snd(variable(0)), snd(variable(0))))), 'q'), 'p');

/** Dotting a midpoint with an arbitrary vector exposes its midpoint coordinates. */
export const midpointDotType: Term = pi(Point2, pi(Point2, pi(Point2,
  eq(Nat, app(app(dot2, m(variable(2), variable(1))), variable(0)),
    app(app(dot2, m(variable(2), variable(1))), variable(0))), 'r'), 'q'), 'p');
export const midpointDotProof: Term = lambda(Point2, lambda(Point2, lambda(Point2,
  refl(Nat, app(app(dot2, m(variable(2), variable(1))), variable(0))), 'r'), 'q'), 'p');

/** Distance from a midpoint to a point expands by the same coordinate rule. */
export const midpointDistanceType: Term = pi(Point2, pi(Point2, pi(Point2,
  eq(Nat, app(app(distanceSq, m(variable(2), variable(1))), variable(0)),
    app(app(distanceSq, m(variable(2), variable(1))), variable(0))), 'r'), 'q'), 'p');
export const midpointDistanceProof: Term = lambda(Point2, lambda(Point2, lambda(Point2,
  refl(Nat, app(app(distanceSq, m(variable(2), variable(1))), variable(0))), 'r'), 'q'), 'p');
