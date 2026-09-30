import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { dot2 } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { mulOneProof } from './mul-one';
import { mulRightZeroProof } from './mul-right-zero';
import { addZeroProof } from './add-zero';
import { initialProofState } from '../proof/state';
import { tacticSession } from '../proof/tactic';

export const Vec2: Term = prod(Nat, Nat);
const xUnit: Term = pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' });
const yUnit: Term = pair({ kind: 'Zero' }, { kind: 'Succ', value: { kind: 'Zero' } });

/** Dotting a rotated vector with the x-axis unit exposes its original second coordinate. */
export const rotatedDotXUnitType: Term = pi(Vec2,
  eq(Nat, app(app(dot2, app(rotate90, variable(0))), xUnit), snd(variable(0))), 'v');
const rotatedDotXUnitSession = tacticSession(initialProofState(rotatedDotXUnitType)).intro()
  .rewrite(app(mulOneProof, snd(variable(0)))).rewrite(app(mulRightZeroProof, fst(variable(0))))
  .rewrite(app(addZeroProof, snd(variable(0)))).rfl();
export const rotatedDotXUnitProof: Term = rotatedDotXUnitSession.proof();

/** Dotting a rotated vector with the y-axis unit exposes its original first coordinate. */
export const rotatedDotYUnitType: Term = pi(Vec2,
  eq(Nat, app(app(dot2, app(rotate90, variable(0))), yUnit), fst(variable(0))), 'v');
const rotatedDotYUnitSession = tacticSession(initialProofState(rotatedDotYUnitType)).intro()
  .rewrite(app(mulRightZeroProof, snd(variable(0)))).rewrite(app(mulOneProof, fst(variable(0)))).rfl();
export const rotatedDotYUnitProof: Term = rotatedDotYUnitSession.proof();

/** Crossing a rotated vector with the x-axis unit exposes its original first coordinate. */
export const rotatedCrossXUnitType: Term = pi(Vec2,
  eq(Nat, app(app(cross2, app(rotate90, variable(0))), xUnit), fst(variable(0))), 'v');
const rotatedCrossXUnitSession = tacticSession(initialProofState(rotatedCrossXUnitType)).intro()
  .rewrite(app(mulRightZeroProof, snd(variable(0)))).rewrite(app(mulOneProof, fst(variable(0))))
  .rfl();
export const rotatedCrossXUnitProof: Term = rotatedCrossXUnitSession.proof();

/** Crossing a rotated vector with the y-axis unit exposes its original second coordinate. */
export const rotatedCrossYUnitType: Term = pi(Vec2,
  eq(Nat, app(app(cross2, app(rotate90, variable(0))), yUnit), snd(variable(0))), 'v');
const rotatedCrossYUnitSession = tacticSession(initialProofState(rotatedCrossYUnitType)).intro()
  .rewrite(app(mulRightZeroProof, fst(variable(0)))).rewrite(app(mulOneProof, snd(variable(0))))
  .rewrite(app(addZeroProof, snd(variable(0)))).rfl();
export const rotatedCrossYUnitProof: Term = rotatedCrossYUnitSession.proof();
