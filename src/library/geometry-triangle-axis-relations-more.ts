import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { parallelVec } from './geometry-parallel';
import { perpendicularVec } from './geometry-relations';
import { cross2 } from './geometry-cross';
import { dot2 } from './geometry-metrics';
import { fst, snd } from '../syntax/ast';

const zero: Term = { kind: 'Zero' };
const xAxis = (x: Term): Term => pair(x, zero);
const yAxis = (y: Term): Term => pair(zero, y);

/** The first two vertices of an x-axis triangle are parallel as axis vectors. */
export const triangleXAxisParallelType: Term = app(app(parallelVec, xAxis({ kind: 'Succ', value: zero })), xAxis({ kind: 'Succ', value: { kind: 'Succ', value: zero } }));
export const triangleXAxisParallelProof: Term = refl(Nat, zero);

/** The first vertex's x-axis vector and second vertex's y-axis vector are perpendicular. */
export const triangleMixedAxisPerpendicularType: Term = app(app(perpendicularVec, xAxis({ kind: 'Succ', value: zero })), yAxis({ kind: 'Succ', value: { kind: 'Succ', value: zero } }));
export const triangleMixedAxisPerpendicularProof: Term = refl(Nat, zero);

/** Cross and dot certificates for a concrete triangle axis pair. */
export const triangleAxisCertificateType: Term = eq(Nat,
  app(app(cross2, xAxis({ kind: 'Succ', value: zero })), yAxis({ kind: 'Succ', value: zero })),
  { kind: 'Succ', value: zero });
export const triangleAxisCertificateProof: Term = refl(Nat, { kind: 'Succ', value: zero });
