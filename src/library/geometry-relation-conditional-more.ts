import { Term, Nat, prod, variable, pi, lambda, app, eq } from '../syntax/ast';
import { cross2 } from './geometry-cross';
import { dot2 } from './geometry-metrics';
import { parallelVec, Vec2 as ParallelVec2 } from './geometry-parallel';
import { perpendicularVec, Vec2 as PerpendicularVec2 } from './geometry-relations';

/** A zero cross expression is exactly the parallel relation in this model. */
export const parallelFromCrossZeroType: Term = pi(ParallelVec2, pi(ParallelVec2, pi(
  eq(Nat, app(app(cross2, variable(1)), variable(0)), { kind: 'Zero' }),
  app(app(parallelVec, variable(2)), variable(1)), 'h'), 'v'), 'u');

export const parallelFromCrossZeroProof: Term = lambda(ParallelVec2, lambda(ParallelVec2, lambda(
  eq(Nat, app(app(cross2, variable(1)), variable(0)), { kind: 'Zero' }),
  variable(0), 'h'), 'v'), 'u');

/** A zero dot expression is exactly the perpendicular relation in this model. */
export const perpendicularFromDotZeroType: Term = pi(PerpendicularVec2, pi(PerpendicularVec2, pi(
  eq(Nat, app(app(dot2, variable(1)), variable(0)), { kind: 'Zero' }),
  app(app(perpendicularVec, variable(2)), variable(1)), 'h'), 'v'), 'u');

export const perpendicularFromDotZeroProof: Term = lambda(PerpendicularVec2, lambda(PerpendicularVec2, lambda(
  eq(Nat, app(app(dot2, variable(1)), variable(0)), { kind: 'Zero' }),
  variable(0), 'h'), 'v'), 'u');

/** A parallel relation exposes its defining zero-cross equality. */
export const crossZeroFromParallelType: Term = pi(ParallelVec2, pi(ParallelVec2, pi(
  app(app(parallelVec, variable(1)), variable(0)),
  eq(Nat, app(app(cross2, variable(2)), variable(1)), { kind: 'Zero' }), 'h'), 'v'), 'u');
export const crossZeroFromParallelProof: Term = lambda(ParallelVec2, lambda(ParallelVec2, lambda(
  app(app(parallelVec, variable(1)), variable(0)), variable(0), 'h'), 'v'), 'u');

/** A perpendicular relation exposes its defining zero-dot equality. */
export const dotZeroFromPerpendicularType: Term = pi(PerpendicularVec2, pi(PerpendicularVec2, pi(
  app(app(perpendicularVec, variable(1)), variable(0)),
  eq(Nat, app(app(dot2, variable(2)), variable(1)), { kind: 'Zero' }), 'h'), 'v'), 'u');
export const dotZeroFromPerpendicularProof: Term = lambda(PerpendicularVec2, lambda(PerpendicularVec2, lambda(
  app(app(perpendicularVec, variable(1)), variable(0)), variable(0), 'h'), 'v'), 'u');

/** The zero vector is perpendicular to every vector in the discrete model. */
export const zeroPerpendicularType: Term = pi(PerpendicularVec2,
  app(app(perpendicularVec, { kind: 'Pair', left: { kind: 'Zero' }, right: { kind: 'Zero' } }), variable(0)), 'v');
export const zeroPerpendicularProof: Term = lambda(PerpendicularVec2,
  { kind: 'Refl', type: Nat, value: { kind: 'Zero' } }, 'v');

/** Translation preserves the form of an incidence proof when the translated x coordinate matches. */
