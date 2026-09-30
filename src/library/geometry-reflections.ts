import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const reflectX: Term = lambda(Point2,
  pair(fst(variable(0)), snd(variable(0))), 'p');
export const reflectXType: Term = pi(Point2, Point2, 'p');
export const reflectXIdentityType: Term = pi(Point2, eq(Point2, app(reflectX, variable(0)), variable(0)), 'p');
export const reflectXIdentityProof: Term = lambda(Point2, refl(Point2, variable(0)), 'p');
export const reflectXInvolutionType: Term = pi(Point2,
  eq(Point2, app(reflectX, app(reflectX, variable(0))), variable(0)), 'p');
export const reflectXInvolutionProof: Term = lambda(Point2, refl(Point2, variable(0)), 'p');
export const reflectOriginType: Term = eq(Point2,
  app(reflectX, pair({ kind: 'Zero' }, { kind: 'Zero' })),
  pair({ kind: 'Zero' }, { kind: 'Zero' }));
export const reflectOriginProof: Term = refl(Point2, pair({ kind: 'Zero' }, { kind: 'Zero' }));

/** Reflection across the coordinate copy map preserves each projection. */
export const reflectFstType: Term = pi(Point2, eq(Nat, fst(app(reflectX, variable(0))), fst(variable(0))), 'p');
export const reflectFstProof: Term = lambda(Point2, refl(Nat, fst(variable(0))), 'p');
export const reflectSndType: Term = pi(Point2, eq(Nat, snd(app(reflectX, variable(0))), snd(variable(0))), 'p');
export const reflectSndProof: Term = lambda(Point2, refl(Nat, snd(variable(0))), 'p');

/** Reflection exposes the unchanged coordinate pair. */
export const reflectCoordinateType: Term = pi(Point2,
  eq(Point2, app(reflectX, variable(0)),
    pair(fst(variable(0)), snd(variable(0)))), 'p');
export const reflectCoordinateProof: Term = lambda(Point2,
  refl(Point2, pair(fst(variable(0)), snd(variable(0)))), 'p');

/** Reflection output is reconstructed from its coordinate projections. */
export const reflectEtaType: Term = pi(Point2,
  eq(Point2, pair(fst(app(reflectX, variable(0))), snd(app(reflectX, variable(0)))), app(reflectX, variable(0))), 'p');
export const reflectEtaProof: Term = lambda(Point2, refl(Point2, app(reflectX, variable(0))), 'p');

export const reflectTwiceType: Term = eq(Point2,
  pair({ kind: 'Zero' }, { kind: 'Zero' }),
  pair({ kind: 'Zero' }, { kind: 'Zero' }));
export const reflectTwiceProof: Term = refl(Point2, pair({ kind: 'Zero' }, { kind: 'Zero' }));

/** Concrete reflection leaves a small point unchanged. */
export const reflectConcreteType: Term = eq(Point2,
  app(reflectX, pair({ kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } },
    { kind: 'Succ', value: { kind: 'Zero' } })),
  pair({ kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } },
    { kind: 'Succ', value: { kind: 'Zero' } }));
export const reflectConcreteProof: Term = refl(Point2,
  pair({ kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } },
    { kind: 'Succ', value: { kind: 'Zero' } }));
export const reflectLargerType: Term = eq(Point2, app(reflectX, pair(numeral(6), numeral(4))), pair(numeral(6), numeral(4)));
export const reflectLargerProof: Term = refl(Point2, pair(numeral(6), numeral(4)));
export const reflectTwiceLargerType: Term = eq(Point2,
  app(reflectX, app(reflectX, pair(numeral(10), numeral(3)))), pair(numeral(10), numeral(3)));
export const reflectTwiceLargerProof: Term = refl(Point2, pair(numeral(10), numeral(3)));
