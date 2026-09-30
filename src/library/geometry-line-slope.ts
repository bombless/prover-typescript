import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { sub } from './sub';
import { cross2 } from './geometry-cross';

export const Vec2: Term = prod(Nat, Nat);
export const slopeVector: Term = lambda(Vec2, lambda(Vec2,
  pair(
    app(app(sub, fst(variable(0))), fst(variable(1))),
    app(app(sub, snd(variable(0))), snd(variable(1)))), 'q'), 'p');
export const slopeVectorType: Term = pi(Vec2, pi(Vec2, Vec2, 'q'), 'p');
export const horizontalVectorType: Term = eq(Vec2,
  app(app(slopeVector, pair({ kind: 'Zero' }, { kind: 'Zero' })), pair({ kind: 'Zero' }, { kind: 'Zero' })),
  pair({ kind: 'Zero' }, { kind: 'Zero' }));
export const horizontalVectorProof: Term = refl(Vec2, pair({ kind: 'Zero' }, { kind: 'Zero' }));
