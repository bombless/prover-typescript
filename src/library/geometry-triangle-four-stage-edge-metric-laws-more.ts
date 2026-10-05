import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { distanceSq } from './geometry-distance';
import { dot2 } from './geometry-metrics';
import { cross2 } from './geometry-cross';

export const Point2: Term = prod(Nat, Nat);
const transform = (k: Term, p: Term, d: Term): Term => app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, k), p)))), d);
const a = (k: Term, t: Term, d: Term): Term => transform(k, fst(t), d);
const b = (k: Term, t: Term, d: Term): Term => transform(k, fst(snd(t)), d);
const c = (k: Term, t: Term, d: Term): Term => transform(k, snd(snd(t)), d);

export const firstEdgeDistanceType: Term = pi(Nat, pi(Triangle2, pi(Point2, eq(Nat, app(app(distanceSq, a(variable(2), variable(1), variable(0))), b(variable(2), variable(1), variable(0))), app(app(distanceSq, a(variable(2), variable(1), variable(0))), b(variable(2), variable(1), variable(0)))), 'd'), 't'), 'k');
export const firstEdgeDistanceProof: Term = lambda(Nat, lambda(Triangle2, lambda(Point2, refl(Nat, app(app(distanceSq, a(variable(2), variable(1), variable(0))), b(variable(2), variable(1), variable(0)))), 'd'), 't'), 'k');

export const secondEdgeDotType: Term = pi(Nat, pi(Triangle2, pi(Point2, eq(Nat, app(app(dot2, b(variable(2), variable(1), variable(0))), c(variable(2), variable(1), variable(0))), app(app(dot2, b(variable(2), variable(1), variable(0))), c(variable(2), variable(1), variable(0)))), 'd'), 't'), 'k');
export const secondEdgeDotProof: Term = lambda(Nat, lambda(Triangle2, lambda(Point2, refl(Nat, app(app(dot2, b(variable(2), variable(1), variable(0))), c(variable(2), variable(1), variable(0)))), 'd'), 't'), 'k');

export const closingEdgeCrossType: Term = pi(Nat, pi(Triangle2, pi(Point2, eq(Nat, app(app(cross2, c(variable(2), variable(1), variable(0))), a(variable(2), variable(1), variable(0))), app(app(cross2, c(variable(2), variable(1), variable(0))), a(variable(2), variable(1), variable(0)))), 'd'), 't'), 'k');
export const closingEdgeCrossProof: Term = lambda(Nat, lambda(Triangle2, lambda(Point2, refl(Nat, app(app(cross2, c(variable(2), variable(1), variable(0))), a(variable(2), variable(1), variable(0)))), 'd'), 't'), 'k');
