import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { numeral, addTerm } from './nat';
import { mulTerm } from './mul';

export const Vec2: Term = prod(Nat, Nat);

/** Scaling by a concrete factor exposes both coordinates. */
export const scaleConcreteFstType: Term = eq(Nat, fst(app(app(scaleVec, numeral(4)), pair(numeral(2), numeral(3)))), numeral(8));
export const scaleConcreteFstProof: Term = refl(Nat, numeral(8));
export const scaleConcreteSndType: Term = eq(Nat, snd(app(app(scaleVec, numeral(4)), pair(numeral(2), numeral(3)))), numeral(12));
export const scaleConcreteSndProof: Term = refl(Nat, numeral(12));

/** Parameterized scale coordinate formula, restated for direct reuse. */
export const scalePairType: Term = pi(Nat, pi(Vec2,
  eq(Vec2, app(app(scaleVec, variable(1)), variable(0)),
    pair(mulTerm(variable(1), fst(variable(0))), mulTerm(variable(1), snd(variable(0))))), 'v'), 'k');
export const scalePairProof: Term = lambda(Nat, lambda(Vec2,
  refl(Vec2, pair(mulTerm(variable(1), fst(variable(0))), mulTerm(variable(1), snd(variable(0))))), 'v'), 'k');
