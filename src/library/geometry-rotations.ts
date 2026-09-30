import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const rotate90: Term = lambda(Point2,
  pair(snd(variable(0)), fst(variable(0))), 'p');
export const rotate90Type: Term = pi(Point2, Point2, 'p');
export const rotate90TwiceType: Term = pi(Point2, eq(Point2, app(rotate90, app(rotate90, variable(0))), variable(0)), 'p');
export const rotate90TwiceProof: Term = lambda(Point2, refl(Point2, variable(0)), 'p');
export const rotateOriginType: Term = eq(Point2,
  app(rotate90, pair({ kind: 'Zero' }, { kind: 'Zero' })),
  pair({ kind: 'Zero' }, { kind: 'Zero' }));
export const rotateOriginProof: Term = refl(Point2, pair({ kind: 'Zero' }, { kind: 'Zero' }));

/** A quarter-turn exchanges the two coordinate projections. */
export const rotateFstType: Term = pi(Point2, eq(Nat, fst(app(rotate90, variable(0))), snd(variable(0))), 'p');
export const rotateFstProof: Term = lambda(Point2, refl(Nat, snd(variable(0))), 'p');
export const rotateSndType: Term = pi(Point2, eq(Nat, snd(app(rotate90, variable(0))), fst(variable(0))), 'p');
export const rotateSndProof: Term = lambda(Point2, refl(Nat, fst(variable(0))), 'p');

/** Applying the coordinate-swap rotation twice restores both projections. */
export const rotateTwiceFstType: Term = pi(Point2,
  eq(Nat, fst(app(rotate90, app(rotate90, variable(0)))), fst(variable(0))), 'p');
export const rotateTwiceFstProof: Term = lambda(Point2, refl(Nat, fst(variable(0))), 'p');
export const rotateTwiceSndType: Term = pi(Point2,
  eq(Nat, snd(app(rotate90, app(rotate90, variable(0)))), snd(variable(0))), 'p');
export const rotateTwiceSndProof: Term = lambda(Point2, refl(Nat, snd(variable(0))), 'p');

/** Four coordinate-swap rotations restore every point. */
export const rotateFourType: Term = pi(Point2,
  eq(Point2, app(rotate90, app(rotate90, app(rotate90, app(rotate90, variable(0))))), variable(0)), 'p');
export const rotateFourProof: Term = lambda(Point2, refl(Point2, variable(0)), 'p');

/** A rotated point is reconstructed from its two projections. */
export const rotateEtaType: Term = pi(Point2,
  eq(Point2, pair(fst(app(rotate90, variable(0))), snd(app(rotate90, variable(0)))), app(rotate90, variable(0))), 'p');
export const rotateEtaProof: Term = lambda(Point2, refl(Point2, app(rotate90, variable(0))), 'p');

export const rotateAxisType: Term = eq(Point2,
  pair({ kind: 'Zero' }, { kind: 'Succ', value: { kind: 'Zero' } }),
  pair({ kind: 'Zero' }, { kind: 'Succ', value: { kind: 'Zero' } }));
export const rotateAxisProof: Term = refl(Point2, pair({ kind: 'Zero' }, { kind: 'Succ', value: { kind: 'Zero' } }));

/** Concrete quarter-turns exchange the coordinates of a small point. */
export const rotateConcreteType: Term = eq(Point2,
  app(rotate90, pair({ kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } },
    { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } } })),
  pair({ kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } } },
    { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } }));
export const rotateConcreteProof: Term = refl(Point2,
  pair({ kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } } },
    { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } }));
export const rotateLargerType: Term = eq(Point2, app(rotate90, pair(numeral(5), numeral(7))), pair(numeral(7), numeral(5)));
export const rotateLargerProof: Term = refl(Point2, pair(numeral(7), numeral(5)));
export const rotateTwiceLargerType: Term = eq(Point2,
  app(rotate90, app(rotate90, pair(numeral(9), numeral(4)))), pair(numeral(9), numeral(4)));
export const rotateTwiceLargerProof: Term = refl(Point2, pair(numeral(9), numeral(4)));
