import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { cross2 } from './geometry-cross';
import { dot2 } from './geometry-metrics';
import { mulOneProof } from './mul-one';
import { mulRightZeroProof } from './mul-right-zero';
import { addZeroProof } from './add-zero';
import { initialProofState } from '../proof/state';
import { tacticSession } from '../proof/tactic';

export const Vec2: Term = prod(Nat, Nat);
const xAxis = pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' });
const yAxis = pair({ kind: 'Zero' }, { kind: 'Succ', value: { kind: 'Zero' } });

export const crossXAxisType: Term = pi(Vec2, eq(Nat, app(app(cross2, variable(0)), xAxis), snd(variable(0))), 'v');
export const crossXAxisProof: Term = tacticSession(initialProofState(crossXAxisType)).intro().rewrite(app(mulRightZeroProof, fst(variable(0)))).rewrite(app(mulOneProof, snd(variable(0)))).rfl().proof();
export const crossYAxisType: Term = pi(Vec2, eq(Nat, app(app(cross2, variable(0)), yAxis), fst(variable(0))), 'v');
export const crossYAxisProof: Term = tacticSession(initialProofState(crossYAxisType)).intro().rewrite(app(mulOneProof, fst(variable(0)))).rewrite(app(mulRightZeroProof, snd(variable(0)))).rewrite(app(addZeroProof, fst(variable(0)))).rfl().proof();
export const dotXAxisType: Term = pi(Vec2, eq(Nat, app(app(dot2, variable(0)), xAxis), fst(variable(0))), 'v');
export const dotXAxisProof: Term = tacticSession(initialProofState(dotXAxisType)).intro().rewrite(app(mulOneProof, fst(variable(0)))).rewrite(app(mulRightZeroProof, snd(variable(0)))).rewrite(app(addZeroProof, fst(variable(0)))).rfl().proof();
export const dotYAxisType: Term = pi(Vec2, eq(Nat, app(app(dot2, variable(0)), yAxis), snd(variable(0))), 'v');
export const dotYAxisProof: Term = tacticSession(initialProofState(dotYAxisType)).intro().rewrite(app(mulRightZeroProof, fst(variable(0)))).rewrite(app(mulOneProof, snd(variable(0)))).rfl().proof();
