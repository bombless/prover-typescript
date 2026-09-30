import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const midpointDiscrete: Term = lambda(Point2, lambda(Point2,
  pair(fst(variable(1)), snd(variable(0))), 'q'), 'p');
export const midpointDiscreteType: Term = pi(Point2, pi(Point2, Point2, 'q'), 'p');
export const midpointOriginType: Term = eq(Point2,
  app(app(midpointDiscrete, pair({ kind: 'Zero' }, { kind: 'Zero' })), pair({ kind: 'Zero' }, { kind: 'Zero' })),
  pair({ kind: 'Zero' }, { kind: 'Zero' }));
export const midpointOriginProof: Term = refl(Point2, pair({ kind: 'Zero' }, { kind: 'Zero' }));

/** Discrete midpoint's first coordinate is inherited from the first point. */
export const midpointDiscreteFstType: Term = pi(Point2, pi(Point2,
  eq(Nat, fst(app(app(midpointDiscrete, variable(1)), variable(0))), fst(variable(1))), 'q'), 'p');
export const midpointDiscreteFstProof: Term = lambda(Point2,
  lambda(Point2, refl(Nat, fst(variable(1))), 'q'), 'p');

/** Discrete midpoint's second coordinate is inherited from the second point. */
export const midpointDiscreteSndType: Term = pi(Point2, pi(Point2,
  eq(Nat, snd(app(app(midpointDiscrete, variable(1)), variable(0))), snd(variable(0))), 'q'), 'p');
export const midpointDiscreteSndProof: Term = lambda(Point2,
  lambda(Point2, refl(Nat, snd(variable(0))), 'q'), 'p');
