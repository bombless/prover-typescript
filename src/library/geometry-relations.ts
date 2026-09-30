import { Term, Nat, Bool, Type, True, False, prod, pair, fst, snd, variable, pi, lambda, eq, refl, app } from '../syntax/ast';
import { dot2 } from './geometry-metrics';

export const Vec2: Term = prod(Nat, Nat);
export const perpendicularVec: Term = lambda(Vec2, lambda(Vec2,
  eq(Nat, app(app(dot2, variable(1)), variable(0)), { kind: 'Zero' }), 'v'), 'u');
export const perpendicularVecType: Term = pi(Vec2, pi(Vec2, Type, 'v'), 'u');

export const axisX: Term = pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' });
export const axisY: Term = pair({ kind: 'Zero' }, { kind: 'Succ', value: { kind: 'Zero' } });
export const axesPerpendicularType: Term = eq(Nat, { kind: 'Zero' }, { kind: 'Zero' });
export const axesPerpendicularProof: Term = refl(Nat, { kind: 'Zero' });

export const samePoint: Term = lambda(Vec2, lambda(Vec2,
  eq(Vec2, variable(1), variable(0)), 'q'), 'p');
export const samePointType: Term = pi(Vec2, pi(Vec2, Bool, 'q'), 'p');

/** Same-point relation is reflexive for every vector. */
export const samePointReflType: Term = pi(Vec2, app(app(samePoint, variable(0)), variable(0)), 'p');
export const samePointReflProof: Term = lambda(Vec2, refl(Vec2, variable(0)), 'p');
