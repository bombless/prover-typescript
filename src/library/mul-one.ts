import { Term, Nat, Zero, variable, pi, lambda, app, succ, eq, refl, natRec, eqRec } from '../syntax/ast';
import { addZeroProof } from './add-zero';
import { mulTerm } from './mul';

const one: Term = succ(Zero);

/** 1 * n = n. The left side unfolds to n + 0, then uses add-zero. */
export const oneMulType: Term = pi(Nat, eq(Nat, mulTerm(one, variable(0)), variable(0)), 'n');
export const oneMulProof: Term = lambda(Nat,
  app(addZeroProof, variable(0)),
  'n');

/** n * 1 = n, proved by induction using the recursive multiplication equations. */
export const mulOneType: Term = pi(Nat, eq(Nat, mulTerm(variable(0), one), variable(0)), 'n');

const mulOneMotive = lambda(Nat, eq(Nat, mulTerm(variable(0), one), variable(0)), 'n');
const mulOneStepMotive = lambda(Nat, eq(Nat, succ(mulTerm(variable(2), one)), succ(variable(0))), 'x');
const mulOneStep = lambda(Nat, lambda(app(mulOneMotive, variable(0)), eqRec(
  mulOneStepMotive,
  refl(Nat, succ(mulTerm(variable(1), one))),
  mulTerm(variable(1), one), variable(1), variable(0),
), 'ih'), 'n');
export const mulOneProof: Term = lambda(Nat, natRec(mulOneMotive, refl(Nat, Zero), mulOneStep, variable(0)), 'n');


/** A useful closed unit calculation. */
export const oneMulSevenType: Term = eq(Nat, mulTerm(one, { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: Zero } } } } } } }), { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: Zero } } } } } } });
export const oneMulSevenProof: Term = refl(Nat, { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: Zero } } } } } } });
