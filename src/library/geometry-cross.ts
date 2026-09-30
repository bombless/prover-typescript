import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { addTerm, numeral } from './nat';
import { mulTerm } from './mul';
import { mulRightZeroProof } from './mul-right-zero';
import { addZeroProof } from './add-zero';
import { initialProofState } from '../proof/state';
import { tacticSession } from '../proof/tactic';

export const Vec2: Term = prod(Nat, Nat);
/** Determinant / 2D cross-product expression. */
export const cross2: Term = lambda(Vec2, lambda(Vec2,
  addTerm(mulTerm(fst(variable(1)), snd(variable(0))), mulTerm(snd(variable(1)), fst(variable(0)))), 'v'), 'u');
export const cross2Type: Term = pi(Vec2, pi(Vec2, Nat, 'v'), 'u');

/** The cross expression unfolds to its coordinate formula. */
export const crossFormulaType: Term = pi(Vec2, pi(Vec2,
  eq(Nat, app(app(cross2, variable(1)), variable(0)),
    addTerm(mulTerm(fst(variable(1)), snd(variable(0))), mulTerm(snd(variable(1)), fst(variable(0))))), 'v'), 'u');
export const crossFormulaProof: Term = lambda(Vec2,
  lambda(Vec2, refl(Nat, addTerm(mulTerm(fst(variable(1)), snd(variable(0))), mulTerm(snd(variable(1)), fst(variable(0))))), 'v'), 'u');

/** The cross expression's result is already a scalar normal form. */
export const crossEtaType: Term = pi(Vec2, pi(Vec2,
  eq(Nat, app(app(cross2, variable(1)), variable(0)), app(app(cross2, variable(1)), variable(0))), 'v'), 'u');
export const crossEtaProof: Term = lambda(Vec2,
  lambda(Vec2, refl(Nat, app(app(cross2, variable(1)), variable(0))), 'v'), 'u');
export const axisCrossType: Term = eq(Nat, { kind: 'Zero' }, { kind: 'Zero' });
export const axisCrossProof: Term = refl(Nat, { kind: 'Zero' });

/** The cross expression vanishes when both arguments are the zero vector. */
export const zeroCrossType: Term = eq(Nat,
  app(app(cross2, pair({ kind: 'Zero' }, { kind: 'Zero' })), pair({ kind: 'Zero' }, { kind: 'Zero' })),
  { kind: 'Zero' });
export const zeroCrossProof: Term = refl(Nat, { kind: 'Zero' });

/** Crossing the zero vector with any vector vanishes. */
export const zeroCrossGeneralType: Term = pi(Vec2,
  eq(Nat, app(app(cross2, pair({ kind: 'Zero' }, { kind: 'Zero' })), variable(0)), { kind: 'Zero' }), 'v');
export const zeroCrossGeneralProof: Term = lambda(Vec2, refl(Nat, { kind: 'Zero' }), 'v');

/** A concrete cross expression with a zero coordinate. */
export const crossAxisConcreteType: Term = eq(Nat,
  app(app(cross2, pair(numeral(2), { kind: 'Zero' })), pair({ kind: 'Zero' }, numeral(3))), numeral(6));
export const crossAxisConcreteProof: Term = refl(Nat, numeral(6));



/** A vector crossed with itself vanishes for the concrete unit vector. */
