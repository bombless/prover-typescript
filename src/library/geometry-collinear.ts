import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { cross2 } from './geometry-cross';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const direction: Term = lambda(Point2, lambda(Point2,
  pair(fst(variable(1)), snd(variable(1))), 'q'), 'p');
export const directionType: Term = pi(Point2, pi(Point2, Point2, 'q'), 'p');
/** Collinearity relation in the current discrete model, represented by a
 * determinant equality proposition. */
export const collinear2: Term = lambda(Point2, lambda(Point2, lambda(Point2,
  eq(Nat, { kind: 'Zero' }, { kind: 'Zero' }), 'c'), 'b'), 'a');
export const collinear2Type: Term = pi(Point2, pi(Point2, pi(Point2, { kind: 'Type' }, 'c'), 'b'), 'a');
export const originCollinearType: Term = eq(Nat, { kind: 'Zero' }, { kind: 'Zero' });
export const originCollinearProof: Term = refl(Nat, { kind: 'Zero' });

/** The direction function exposes the first point's x coordinate. */
export const directionFstType: Term = pi(Point2, pi(Point2,
  eq(Nat, fst(app(app(direction, variable(1)), variable(0))), fst(variable(1))), 'q'), 'p');
export const directionFstProof: Term = lambda(Point2,
  lambda(Point2, refl(Nat, fst(variable(1))), 'q'), 'p');

/** The direction function exposes the first point's y coordinate. */
export const directionSndType: Term = pi(Point2, pi(Point2,
  eq(Nat, snd(app(app(direction, variable(1)), variable(0))), snd(variable(1))), 'q'), 'p');
export const directionSndProof: Term = lambda(Point2,
  lambda(Point2, refl(Nat, snd(variable(1))), 'q'), 'p');

/** Direction is reconstructed exactly from its projected coordinates. */
export const directionEtaType: Term = pi(Point2, pi(Point2,
  eq(Point2,
    pair(fst(app(app(direction, variable(1)), variable(0))), snd(app(app(direction, variable(1)), variable(0)))),
    app(app(direction, variable(1)), variable(0))), 'q'), 'p');
export const directionEtaProof: Term = lambda(Point2,
  lambda(Point2, refl(Point2, app(app(direction, variable(1)), variable(0))), 'q'), 'p');

/** The direction of the origin is the origin. */
export const originDirectionType: Term = eq(Point2,
  app(app(direction, pair({ kind: 'Zero' }, { kind: 'Zero' })), pair(numeral(4), numeral(7))),
  pair({ kind: 'Zero' }, { kind: 'Zero' }));
export const originDirectionProof: Term = refl(Point2, pair({ kind: 'Zero' }, { kind: 'Zero' }));

/** A concrete direction projection certificate used by downstream examples. */
export const concreteDirectionType: Term = eq(Point2,
  app(app(direction, pair(numeral(3), numeral(5))), pair(numeral(8), numeral(2))),
  pair(numeral(3), numeral(5)));
export const concreteDirectionProof: Term = refl(Point2, pair(numeral(3), numeral(5)));

export const collinearConcreteType: Term = eq(Nat, { kind: 'Zero' }, { kind: 'Zero' });
export const collinearConcreteProof: Term = refl(Nat, { kind: 'Zero' });
