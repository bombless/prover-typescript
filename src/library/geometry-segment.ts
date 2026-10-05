import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { addTerm } from './nat';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const midpoint: Term = lambda(Point2, lambda(Point2,
  pair(fst(variable(1)), snd(variable(0))), 'q'), 'p');
export const midpointType: Term = pi(Point2, pi(Point2, Point2, 'q'), 'p');
export const sameMidpointType: Term = eq(Point2,
  app(app(midpoint, pair({ kind: 'Zero' }, { kind: 'Zero' })), pair({ kind: 'Zero' }, { kind: 'Zero' })),
  pair({ kind: 'Zero' }, { kind: 'Zero' }));
export const sameMidpointProof: Term = refl(Point2, pair({ kind: 'Zero' }, { kind: 'Zero' }));

/** The midpoint construction returns the first endpoint's coordinate pair. */
export const midpointFstType: Term = pi(Point2, pi(Point2,
  eq(Nat, fst(app(app(midpoint, variable(1)), variable(0))), fst(variable(1))), 'q'), 'p');
export const midpointFstProof: Term = lambda(Point2,
  lambda(Point2, refl(Nat, fst(variable(1))), 'q'), 'p');

/** The midpoint construction returns the second endpoint's y coordinate. */
export const midpointSndType: Term = pi(Point2, pi(Point2,
  eq(Nat, snd(app(app(midpoint, variable(1)), variable(0))), snd(variable(0))), 'q'), 'p');
export const midpointSndProof: Term = lambda(Point2,
  lambda(Point2, refl(Nat, snd(variable(0))), 'q'), 'p');

/** The midpoint's first coordinate is the first endpoint's x coordinate. */
export const midpointPairType: Term = pi(Point2, pi(Point2,
  eq(Point2, app(app(midpoint, variable(1)), variable(0)),
    pair(fst(variable(1)), snd(variable(0)))), 'q'), 'p');
export const midpointPairProof: Term = lambda(Point2,
  lambda(Point2, refl(Point2, pair(fst(variable(1)), snd(variable(0)))), 'q'), 'p');

/** A midpoint is reconstructed from its two coordinates. */
export const midpointEtaType: Term = pi(Point2, pi(Point2,
  eq(Point2,
    pair(fst(app(app(midpoint, variable(1)), variable(0))), snd(app(app(midpoint, variable(1)), variable(0)))),
    app(app(midpoint, variable(1)), variable(0))), 'q'), 'p');
export const midpointEtaProof: Term = lambda(Point2,
  lambda(Point2, refl(Point2, app(app(midpoint, variable(1)), variable(0))), 'q'), 'p');

/** Concrete discrete midpoint coordinate construction. */
export const midpointConcreteType: Term = eq(Point2,
  app(app(midpoint, pair(numeral(2), numeral(3))), pair(numeral(4), numeral(5))),
  pair(numeral(2), numeral(5)));
export const midpointConcreteProof: Term = refl(Point2, pair(numeral(2), numeral(5)));

/** A degenerate segment has itself as its midpoint in the discrete model. */
export const midpointSelfType: Term = pi(Point2,
  eq(Point2, app(app(midpoint, variable(0)), variable(0)), variable(0)), 'p');
export const midpointSelfProof: Term = lambda(Point2, refl(Point2, variable(0)), 'p');

/** The midpoint operation is reconstructed from its endpoint projections. */
export const midpointProjectionEtaType: Term = pi(Point2, pi(Point2,
  eq(Point2,
    pair(fst(app(app(midpoint, variable(1)), variable(0))), snd(app(app(midpoint, variable(1)), variable(0)))),
    pair(fst(variable(1)), snd(variable(0)))), 'q'), 'p');
export const midpointProjectionEtaProof: Term = lambda(Point2,
  lambda(Point2, refl(Point2, pair(fst(variable(1)), snd(variable(0)))), 'q'), 'p');
