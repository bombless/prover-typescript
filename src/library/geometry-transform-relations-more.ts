import { Term, Nat, prod, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { scaleVec } from './geometry-scalar';
import { parallelVec, zeroParallelProof, Vec2 as ParallelVec2 } from './geometry-parallel';
import { perpendicularVec } from './geometry-relations';

export const Vec2: Term = prod(Nat, Nat);

/** Rotating the zero vector keeps it zero. */
export const rotateZeroType: Term = eq(Vec2,
  app(rotate90, { kind: 'Pair', left: { kind: 'Zero' }, right: { kind: 'Zero' } }),
  { kind: 'Pair', left: { kind: 'Zero' }, right: { kind: 'Zero' }});
export const rotateZeroProof: Term = refl(Vec2, { kind: 'Pair', left: { kind: 'Zero' }, right: { kind: 'Zero' }});

/** Scaling any vector by the zero scalar keeps it zero. */
export const scaleZeroType: Term = pi(Vec2,
  eq(Vec2, app(app(scaleVec, { kind: 'Zero' }), variable(0)),
    { kind: 'Pair', left: { kind: 'Zero' }, right: { kind: 'Zero' }}), 'v');
export const scaleZeroProof: Term = lambda(Vec2,
  refl(Vec2, { kind: 'Pair', left: { kind: 'Zero' }, right: { kind: 'Zero' }}), 'v');

/** The rotated zero vector is parallel to every vector. */
export const rotatedZeroParallelType: Term = pi(ParallelVec2,
  app(app(parallelVec, app(rotate90, { kind: 'Pair', left: { kind: 'Zero' }, right: { kind: 'Zero' }})), variable(0)), 'v');
export const rotatedZeroParallelProof: Term = lambda(ParallelVec2,
  app(zeroParallelProof, variable(0)), 'v');

/** The scaled zero vector is perpendicular to every vector. */
export const scaledZeroPerpendicularType: Term = pi(ParallelVec2,
  app(app(perpendicularVec, { kind: 'Pair', left: { kind: 'Zero' }, right: { kind: 'Zero' }}), variable(0)), 'v');
export const scaledZeroPerpendicularProof: Term = lambda(ParallelVec2,
  { kind: 'Refl', type: Nat, value: { kind: 'Zero' } }, 'v');
