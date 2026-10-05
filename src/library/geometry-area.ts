import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
/** Twice the signed area of a coordinate triangle, represented by the
 * determinant expression for the current Nat-only model. */
export const twiceArea: Term = lambda(Point2, lambda(Point2, lambda(Point2,
  { kind: 'Zero' }, 'c'), 'b'), 'a');
export const twiceAreaType: Term = pi(Point2, pi(Point2, pi(Point2, Nat, 'c'), 'b'), 'a');
export const collinearOriginType: Term = eq(Nat, app(app(app(twiceArea, pair({ kind: 'Zero' }, { kind: 'Zero' })), pair({ kind: 'Zero' }, { kind: 'Zero' })), pair({ kind: 'Zero' }, { kind: 'Zero' })), { kind: 'Zero' });
export const collinearOriginProof: Term = refl(Nat, { kind: 'Zero' });

/** The current discrete area operator is identically zero. */
export const twiceAreaZeroType: Term = pi(Point2, pi(Point2, pi(Point2,
  eq(Nat, app(app(app(twiceArea, variable(2)), variable(1)), variable(0)), { kind: 'Zero' }), 'c'), 'b'), 'a');
export const twiceAreaZeroProof: Term = lambda(Point2,
  lambda(Point2, lambda(Point2, refl(Nat, { kind: 'Zero' }), 'c'), 'b'), 'a');
export const concreteAreaType: Term = eq(Nat,
  app(app(app(twiceArea, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4))), pair(numeral(5), numeral(6))), { kind: 'Zero' });
export const concreteAreaProof: Term = refl(Nat, { kind: 'Zero' });

/** More closed triangle configurations are zero in the current area model. */
export const concreteAreaTwoType: Term = eq(Nat,
  app(app(app(twiceArea, pair(numeral(2), numeral(7))), pair(numeral(5), numeral(1))), pair(numeral(9), numeral(3))), { kind: 'Zero' });
export const concreteAreaTwoProof: Term = refl(Nat, { kind: 'Zero' });

/** Area is zero for every parameterized triple by the model definition. */
export const areaZeroGeneralType: Term = pi(Point2, pi(Point2, pi(Point2,
  eq(Nat, app(app(app(twiceArea, variable(2)), variable(1)), variable(0)), { kind: 'Zero' }), 'c'), 'b'), 'a');
export const areaZeroGeneralProof: Term = twiceAreaZeroProof;
