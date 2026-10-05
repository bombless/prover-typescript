import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { addTerm } from './nat';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Line2: Term = prod(Point2, prod(Nat, Nat));
export const lineThroughOriginX: Term = pair(pair({ kind: 'Zero' }, { kind: 'Zero' }), pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' }));
export const lineOriginType: Term = Line2;
export const lineOriginProof: Term = lineThroughOriginX;

/** A simple coordinate line predicate: x = a, represented by an equality. */
export const onVerticalLine: Term = lambda(Point2, lambda(Nat,
  eq(Nat, fst(variable(1)), variable(0)), 'a'), 'p');
export const onVerticalLineType: Term = pi(Point2, pi(Nat, { kind: 'Type' }, 'a'), 'p');
export const originOnZeroLineType: Term = eq(Nat, { kind: 'Zero' }, { kind: 'Zero' });
export const originOnZeroLineProof: Term = refl(Nat, { kind: 'Zero' });

/** Vertical-line incidence exposes the point's x coordinate. */
export const verticalLineFstType: Term = pi(Point2, pi(Nat,
  eq(Nat, fst(variable(1)), fst(variable(1))), 'a'), 'p');
export const verticalLineFstProof: Term = lambda(Point2,
  lambda(Nat, refl(Nat, fst(variable(1))), 'a'), 'p');

/** A line's base point is its first component. */
export const lineBaseType: Term = pi(Line2, eq(Point2, fst(variable(0)), fst(variable(0))), 'l');
export const lineBaseProof: Term = lambda(Line2, refl(Point2, fst(variable(0))), 'l');

/** A line's direction vector is its second component. */
export const lineDirectionType: Term = pi(Line2, eq(Point2, snd(variable(0)), snd(variable(0))), 'l');
export const lineDirectionProof: Term = lambda(Line2, refl(Point2, snd(variable(0))), 'l');

/** A line is reconstructed from its base and direction. */
export const lineEtaType: Term = pi(Line2,
  eq(Line2, pair(fst(variable(0)), snd(variable(0))), variable(0)), 'l');
export const lineEtaProof: Term = lambda(Line2, refl(Line2, variable(0)), 'l');

export const lineConcreteType: Term = eq(Line2,
  pair(pair(numeral(2), numeral(3)), pair(numeral(1), numeral(0))),
  pair(pair(numeral(2), numeral(3)), pair(numeral(1), numeral(0))));
export const lineConcreteProof: Term = refl(Line2,
  pair(pair(numeral(2), numeral(3)), pair(numeral(1), numeral(0))));
export const lineConcreteBaseType: Term = eq(Point2,
  fst(pair(pair(numeral(2), numeral(3)), pair(numeral(1), numeral(0)))), pair(numeral(2), numeral(3)));
export const lineConcreteBaseProof: Term = refl(Point2, pair(numeral(2), numeral(3)));
export const lineConcreteDirectionType: Term = eq(Point2,
  snd(pair(pair(numeral(2), numeral(3)), pair(numeral(1), numeral(0)))), pair(numeral(1), numeral(0)));
export const lineConcreteDirectionProof: Term = refl(Point2, pair(numeral(1), numeral(0)));
export const lineConcreteEtaType: Term = eq(Line2,
  pair(fst(pair(pair(numeral(2), numeral(3)), pair(numeral(1), numeral(0)))), snd(pair(pair(numeral(2), numeral(3)), pair(numeral(1), numeral(0))))),
  pair(pair(numeral(2), numeral(3)), pair(numeral(1), numeral(0))));
export const lineConcreteEtaProof: Term = refl(Line2, pair(pair(numeral(2), numeral(3)), pair(numeral(1), numeral(0))));

/** A concrete point lies on the vertical line with matching x coordinate. */
export const concreteVerticalIncidenceType: Term = app(app(onVerticalLine, pair(numeral(6), numeral(9))), numeral(6));
export const concreteVerticalIncidenceProof: Term = refl(Nat, numeral(6));
