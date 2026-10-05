import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Quadrilateral2 } from './geometry-quadrilateral-four-stage-structure-laws-more';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { distanceSq } from './geometry-distance';
import { dot2 } from './geometry-metrics';
import { cross2 } from './geometry-cross';

export const Point2: Term = prod(Nat, Nat);
const transform = (k: Term, p: Term, d: Term): Term => app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, k), p)))), d);
const a = (k: Term, q: Term, d: Term): Term => transform(k, fst(q), d);
const b = (k: Term, q: Term, d: Term): Term => transform(k, fst(snd(q)), d);
const c = (k: Term, q: Term, d: Term): Term => transform(k, fst(snd(snd(q))), d);
const e = (k: Term, q: Term, d: Term): Term => transform(k, snd(snd(snd(q))), d);

export const edgeABDistanceType: Term = pi(Nat, pi(Quadrilateral2, pi(Point2, eq(Nat, app(app(distanceSq, a(variable(2), variable(1), variable(0))), b(variable(2), variable(1), variable(0))), app(app(distanceSq, a(variable(2), variable(1), variable(0))), b(variable(2), variable(1), variable(0)))), 'd'), 'q'), 'k');
export const edgeABDistanceProof: Term = lambda(Nat, lambda(Quadrilateral2, lambda(Point2, refl(Nat, app(app(distanceSq, a(variable(2), variable(1), variable(0))), b(variable(2), variable(1), variable(0)))), 'd'), 'q'), 'k');

export const edgeBCDotType: Term = pi(Nat, pi(Quadrilateral2, pi(Point2, eq(Nat, app(app(dot2, b(variable(2), variable(1), variable(0))), c(variable(2), variable(1), variable(0))), app(app(dot2, b(variable(2), variable(1), variable(0))), c(variable(2), variable(1), variable(0)))), 'd'), 'q'), 'k');
export const edgeBCDotProof: Term = lambda(Nat, lambda(Quadrilateral2, lambda(Point2, refl(Nat, app(app(dot2, b(variable(2), variable(1), variable(0))), c(variable(2), variable(1), variable(0)))), 'd'), 'q'), 'k');

export const edgeCDCrossType: Term = pi(Nat, pi(Quadrilateral2, pi(Point2, eq(Nat, app(app(cross2, c(variable(2), variable(1), variable(0))), e(variable(2), variable(1), variable(0))), app(app(cross2, c(variable(2), variable(1), variable(0))), e(variable(2), variable(1), variable(0)))), 'd'), 'q'), 'k');
export const edgeCDCrossProof: Term = lambda(Nat, lambda(Quadrilateral2, lambda(Point2, refl(Nat, app(app(cross2, c(variable(2), variable(1), variable(0))), e(variable(2), variable(1), variable(0)))), 'd'), 'q'), 'k');

export const edgeDADistanceType: Term = pi(Nat, pi(Quadrilateral2, pi(Point2, eq(Nat, app(app(distanceSq, e(variable(2), variable(1), variable(0))), a(variable(2), variable(1), variable(0))), app(app(distanceSq, e(variable(2), variable(1), variable(0))), a(variable(2), variable(1), variable(0)))), 'd'), 'q'), 'k');
export const edgeDADistanceProof: Term = lambda(Nat, lambda(Quadrilateral2, lambda(Point2, refl(Nat, app(app(distanceSq, e(variable(2), variable(1), variable(0))), a(variable(2), variable(1), variable(0)))), 'd'), 'q'), 'k');
