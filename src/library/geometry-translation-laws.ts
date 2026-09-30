import { Term, Nat, prod, pair, fst, snd, variable, lambda, pi, app, eq, refl } from '../syntax/ast';
import { translate } from './geometry-transform';

export const Point2: Term = prod(Nat, Nat);
export const translationUnitType: Term = eq(Point2,
  app(app(translate, pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' })), pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' })),
  pair({ kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } }, { kind: 'Zero' }));
export const translationUnitProof: Term = refl(Point2, pair({ kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } }, { kind: 'Zero' }));
