import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { distanceSq } from './geometry-distance';
import { normSq } from './geometry-metrics';
import { rotate90 } from './geometry-rotations';

export const Point2: Term = prod(Nat, Nat);

/** The first edge metric of every triangle is a direct coordinate expression. */
export const edge12MetricType: Term = pi(Triangle2,
  eq(Nat, app(app(distanceSq, fst(variable(0))), fst(snd(variable(0)))),
    app(app(distanceSq, fst(variable(0))), fst(snd(variable(0))))), 't');
export const edge12MetricProof: Term = lambda(Triangle2,
  refl(Nat, app(app(distanceSq, fst(variable(0))), fst(snd(variable(0))))), 't');

/** The second edge metric of every triangle is a direct coordinate expression. */
export const edge23MetricType: Term = pi(Triangle2,
  eq(Nat, app(app(distanceSq, fst(snd(variable(0)))), snd(snd(variable(0)))),
    app(app(distanceSq, fst(snd(variable(0)))), snd(snd(variable(0))))), 't');
export const edge23MetricProof: Term = lambda(Triangle2,
  refl(Nat, app(app(distanceSq, fst(snd(variable(0)))), snd(snd(variable(0))))), 't');

/** The norm of a rotated first vertex is an explicit reusable expression. */
export const rotatedVertexNormType: Term = pi(Triangle2,
  eq(Nat, app(normSq, app(rotate90, fst(variable(0)))),
    app(normSq, app(rotate90, fst(variable(0))))), 't');
export const rotatedVertexNormProof: Term = lambda(Triangle2,
  refl(Nat, app(normSq, app(rotate90, fst(variable(0))))), 't');
