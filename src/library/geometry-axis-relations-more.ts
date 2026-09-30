import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { cross2 } from './geometry-cross';
import { dot2 } from './geometry-metrics';
import { parallelVec } from './geometry-parallel';
import { perpendicularVec } from './geometry-relations';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const xAxis = (x: Term): Term => pair(x, { kind: 'Zero' });
const yAxis = (y: Term): Term => pair({ kind: 'Zero' }, y);

/** Any two x-axis vectors are parallel in the discrete relation model. */
export const xAxisParallelType: Term = app(app(parallelVec, xAxis(numeral(2))), xAxis(numeral(3)));
export const xAxisParallelProof: Term = refl(Nat, { kind: 'Zero' });

/** Any two y-axis vectors are parallel in the discrete relation model. */
export const yAxisParallelType: Term = app(app(parallelVec, yAxis(numeral(2))), yAxis(numeral(3)));
export const yAxisParallelProof: Term = refl(Nat, { kind: 'Zero' });

/** The unit x and y axes are perpendicular. */
export const axesPerpendicularType: Term = app(app(perpendicularVec,
  xAxis({ kind: 'Succ', value: { kind: 'Zero' } })),
  yAxis({ kind: 'Succ', value: { kind: 'Zero' } }));
export const axesPerpendicularProof: Term = refl(Nat, { kind: 'Zero' });

/** An x-axis vector and a y-axis vector are perpendicular. */
export const axisVectorsPerpendicularType: Term = app(app(perpendicularVec, xAxis(numeral(2))), yAxis(numeral(3)));
export const axisVectorsPerpendicularProof: Term = refl(Nat, { kind: 'Zero' });
