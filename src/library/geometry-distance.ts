import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { addTerm } from './nat';
import { mulTerm } from './mul';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
export const distanceSq: Term = lambda(Vec2, lambda(Vec2,
  addTerm(mulTerm(fst(variable(1)), fst(variable(0))), mulTerm(snd(variable(1)), snd(variable(0)))), 'q'), 'p');
export const distanceSqType: Term = pi(Vec2, pi(Vec2, Nat, 'q'), 'p');
export const originDistanceType: Term = eq(Nat, app(app(distanceSq, pair({ kind: 'Zero' }, { kind: 'Zero' })), pair({ kind: 'Zero' }, { kind: 'Zero' })), { kind: 'Zero' });
export const originDistanceProof: Term = refl(Nat, { kind: 'Zero' });
export const distanceConcreteType: Term = eq(Nat,
  app(app(distanceSq, pair(numeral(2), numeral(3))), pair(numeral(1), numeral(1))), numeral(5));
export const distanceConcreteProof: Term = refl(Nat, numeral(5));

/** Closed squared-distance computation in the current coordinate model. */

/** The discrete distance-square operator unfolds to its coordinate formula. */
export const distanceFormulaType: Term = pi(Vec2, pi(Vec2,
  eq(Nat, app(app(distanceSq, variable(1)), variable(0)),
    addTerm(mulTerm(fst(variable(1)), fst(variable(0))), mulTerm(snd(variable(1)), snd(variable(0))))), 'q'), 'p');
export const distanceFormulaProof: Term = lambda(Vec2,
  lambda(Vec2, refl(Nat, addTerm(mulTerm(fst(variable(1)), fst(variable(0))), mulTerm(snd(variable(1)), snd(variable(0))))), 'q'), 'p');

/** Distance-square with a zero first vector vanishes for a closed second vector. */
export const zeroFirstDistanceType: Term = eq(Nat,
  app(app(distanceSq, pair({ kind: 'Zero' }, { kind: 'Zero' })), pair(numeral(6), numeral(4))), numeral(0));
export const zeroFirstDistanceProof: Term = refl(Nat, numeral(0));

/** A concrete distance-square exposes a second coordinate contribution. */
export const distanceLargerConcreteType: Term = eq(Nat,
  app(app(distanceSq, pair(numeral(3), numeral(2))), pair(numeral(2), numeral(5))), numeral(16));
export const distanceLargerConcreteProof: Term = refl(Nat, numeral(16));
