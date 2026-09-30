import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { cross2 } from './geometry-cross';
import { dot2 } from './geometry-metrics';
import { mulOneProof } from './mul-one';
import { mulRightZeroProof } from './mul-right-zero';
import { addZeroProof } from './add-zero';
import { initialProofState } from '../proof/state';
import { tacticSession } from '../proof/tactic';

export const Vec2: Term = prod(Nat, Nat);
const xUnit: Term = pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' });
const yUnit: Term = pair({ kind: 'Zero' }, { kind: 'Succ', value: { kind: 'Zero' } });

/** The simplified cross expression with the x-axis unit exposes the second coordinate. */
export const crossXUnitType: Term = pi(Vec2,
  eq(Nat, app(app(cross2, variable(0)), xUnit), snd(variable(0))), 'v');
const crossXUnitSession = tacticSession(initialProofState(crossXUnitType))
  .intro()
  .rewrite(app(mulRightZeroProof, fst(variable(0))))
  .rewrite(app(mulOneProof, snd(variable(0))))
  .rfl();
export const crossXUnitProof: Term = crossXUnitSession.proof();

/** The simplified cross expression with the y-axis unit exposes the first coordinate. */
export const crossYUnitType: Term = pi(Vec2,
  eq(Nat, app(app(cross2, variable(0)), yUnit), fst(variable(0))), 'v');
const crossYUnitSession = tacticSession(initialProofState(crossYUnitType))
  .intro()
  .rewrite(app(mulOneProof, fst(variable(0))))
  .rewrite(app(mulRightZeroProof, snd(variable(0))))
  .rewrite(app(addZeroProof, fst(variable(0)))).rfl();
export const crossYUnitProof: Term = crossYUnitSession.proof();

/** Dotting with the x-axis unit and y-axis unit gives the two coordinate projections. */
export const dotXUnitType: Term = pi(Vec2,
  eq(Nat, app(app(dot2, variable(0)), xUnit), fst(variable(0))), 'v');
const dotXUnitSession = tacticSession(initialProofState(dotXUnitType))
  .intro()
  .rewrite(app(mulOneProof, fst(variable(0))))
  .rewrite(app(mulRightZeroProof, snd(variable(0))))
  .rewrite(app(addZeroProof, fst(variable(0)))).rfl();
export const dotXUnitProof: Term = dotXUnitSession.proof();

export const dotYUnitType: Term = pi(Vec2,
  eq(Nat, app(app(dot2, variable(0)), yUnit), snd(variable(0))), 'v');
const dotYUnitSession = tacticSession(initialProofState(dotYUnitType))
  .intro()
  .rewrite(app(mulRightZeroProof, fst(variable(0))))
  .rewrite(app(mulOneProof, snd(variable(0))))
  .rfl();
export const dotYUnitProof: Term = dotYUnitSession.proof();
