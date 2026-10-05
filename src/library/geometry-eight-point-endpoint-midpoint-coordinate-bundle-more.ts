import { Term, Nat, prod, pair, variable, pi, lambda, app, fst, snd, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { midpoint } from './geometry-segment';
import { normSq } from './geometry-metrics';

export const Point2: Term = prod(Nat, Nat);
export const Chain8: Term = prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, Point2)))))));
const transform = (k: Term, p: Term, d: Term): Term => app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, k), p)))), d);
const first = (q: Term): Term => fst(q);
const last = (q: Term): Term => snd(snd(snd(snd(snd(snd(snd(q)))))));
const mid = (k: Term, q: Term, d: Term): Term => app(app(midpoint, transform(k, first(q), d)), transform(k, last(q), d));
const m = (k: Term, q: Term, d: Term): Term => mid(k, q, d);

/** Coordinate projections and norm formula for the transformed endpoint midpoint. */
export const endpointMidpointCoordinateType: Term = pi(Nat, pi(Chain8, pi(Point2,
  prod(
    { kind: 'Eq', type: Nat, left: fst(m(variable(2), variable(1), variable(0))), right: fst(transform(variable(2), first(variable(1)), variable(0))) },
    prod(
      { kind: 'Eq', type: Nat, left: snd(m(variable(2), variable(1), variable(0))), right: snd(transform(variable(2), last(variable(1)), variable(0))) },
      { kind: 'Eq', type: Nat, left: app(normSq, m(variable(2), variable(1), variable(0))), right: app(normSq, m(variable(2), variable(1), variable(0))) }
    )
  ), 'd'), 'q'), 'k');
export const endpointMidpointCoordinateProof: Term = lambda(Nat, lambda(Chain8, lambda(Point2,
  pair(
    refl(Nat, fst(transform(variable(2), first(variable(1)), variable(0)))),
    pair(
      refl(Nat, snd(transform(variable(2), last(variable(1)), variable(0)))),
      refl(Nat, app(normSq, m(variable(2), variable(1), variable(0))))
    )
  ), 'd'), 'q'), 'k');
