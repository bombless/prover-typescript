import { Term, Nat, prod, pair, variable, pi, lambda, app, fst, snd, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { midpoint } from './geometry-segment';
import { normSq } from './geometry-metrics';
import { Chain10, Point2 } from './geometry-ten-point-chain-eta-more';

const transform = (k: Term, p: Term, d: Term): Term => app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, k), p)))), d);
const first = (q: Term): Term => fst(q);
const last = (q: Term): Term => { let c = q; for (let i = 0; i < 9; i++) c = snd(c); return c; };
const midpointOf = (k: Term, q: Term, d: Term): Term => app(app(midpoint, transform(k, first(q), d)), transform(k, last(q), d));

/** Coordinate projections and norm self equality for the transformed endpoint midpoint. */
export const endpointMidpointCoordinateType: Term = pi(Nat, pi(Chain10, pi(Point2,
  prod(
    { kind: 'Eq', type: Nat, left: fst(midpointOf(variable(2), variable(1), variable(0))), right: fst(midpointOf(variable(2), variable(1), variable(0))) },
    prod(
      { kind: 'Eq', type: Nat, left: snd(midpointOf(variable(2), variable(1), variable(0))), right: snd(midpointOf(variable(2), variable(1), variable(0))) },
      { kind: 'Eq', type: Nat, left: app(normSq, midpointOf(variable(2), variable(1), variable(0))), right: app(normSq, midpointOf(variable(2), variable(1), variable(0))) }
    )
  ), 'd'), 'q'), 'k');
export const endpointMidpointCoordinateProof: Term = lambda(Nat, lambda(Chain10, lambda(Point2,
  pair(
    refl(Nat, fst(midpointOf(variable(2), variable(1), variable(0)))),
    pair(
      refl(Nat, snd(midpointOf(variable(2), variable(1), variable(0)))),
      refl(Nat, app(normSq, midpointOf(variable(2), variable(1), variable(0))))
    )
  ), 'd'), 'q'), 'k');
