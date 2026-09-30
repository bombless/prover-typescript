import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const swapPoint: Term = lambda(Point2, pair(snd(variable(0)), fst(variable(0))), 'p');
export const swapPointType: Term = pi(Point2, Point2, 'p');
export const swapOriginType: Term = eq(Point2,
  app(swapPoint, pair({ kind: 'Zero' }, { kind: 'Zero' })),
  pair({ kind: 'Zero' }, { kind: 'Zero' }));
export const swapOriginProof: Term = refl(Point2, pair({ kind: 'Zero' }, { kind: 'Zero' }));

/** Swapping coordinates twice preserves any point. */
export const swapTwiceType: Term = pi(Point2,
  eq(Point2, app(swapPoint, app(swapPoint, variable(0))), variable(0)), 'p');
export const swapTwiceProof: Term = lambda(Point2, refl(Point2, variable(0)), 'p');

/** Coordinate swapping is an involutive point transformation. */
export const swapInvolutionType: Term = pi(Point2,
  eq(Point2, app(swapPoint, app(swapPoint, variable(0))), variable(0)), 'p');
export const swapInvolutionProof: Term = swapTwiceProof;

export const diagonalPoint: Term = lambda(Nat, pair(variable(0), variable(0)), 'n');
export const diagonalPointType: Term = pi(Nat, Point2, 'n');
export const diagonalZeroType: Term = eq(Point2, app(diagonalPoint, { kind: 'Zero' }), pair({ kind: 'Zero' }, { kind: 'Zero' }));
export const diagonalZeroProof: Term = refl(Point2, pair({ kind: 'Zero' }, { kind: 'Zero' }));

/** Swapping a diagonal point leaves it unchanged. */
export const diagonalSwapType: Term = pi(Nat,
  eq(Point2, app(swapPoint, app(diagonalPoint, variable(0))), app(diagonalPoint, variable(0))), 'n');
export const diagonalSwapProof: Term = lambda(Nat, refl(Point2, app(diagonalPoint, variable(0))), 'n');

/** Swapping a point on the y-axis produces the corresponding x-axis point. */
export const yAxisSwapType: Term = pi(Nat,
  eq(Point2,
    app(swapPoint, pair({ kind: 'Zero' }, variable(0))),
    pair(variable(0), { kind: 'Zero' })), 'y');
export const yAxisSwapProof: Term = lambda(Nat,
  refl(Point2, pair(variable(0), { kind: 'Zero' })), 'y');

/** Swapping a point on the x-axis produces the corresponding y-axis point. */
export const xAxisSwapType: Term = pi(Nat,
  eq(Point2,
    app(swapPoint, pair(variable(0), { kind: 'Zero' })),
    pair({ kind: 'Zero' }, variable(0))), 'x');
export const xAxisSwapProof: Term = lambda(Nat,
  refl(Point2, pair({ kind: 'Zero' }, variable(0))), 'x');

/** Coordinate swap reverses the components of every point. */
export const swapComponentsType: Term = pi(Nat,
  pi(Nat,
    eq(Point2,
      app(swapPoint, pair(variable(1), variable(0))),
      pair(variable(0), variable(1))), 'y'), 'x');
export const swapComponentsProof: Term = lambda(Nat,
  lambda(Nat, refl(Point2, pair(variable(0), variable(1))), 'y'), 'x');

/** The first projection after swapping is the original second coordinate. */
export const swapFstType: Term = pi(Point2,
  eq(Nat, fst(app(swapPoint, variable(0))), snd(variable(0))), 'p');
export const swapFstProof: Term = lambda(Point2, refl(Nat, snd(variable(0))), 'p');

/** The second projection after swapping is the original first coordinate. */
export const swapSndType: Term = pi(Point2,
  eq(Nat, snd(app(swapPoint, variable(0))), fst(variable(0))), 'p');
export const swapSndProof: Term = lambda(Point2, refl(Nat, fst(variable(0))), 'p');

/** Swapping the projections reconstructs the swapped point. */
export const swapEtaType: Term = pi(Point2,
  eq(Point2, pair(fst(app(swapPoint, variable(0))), snd(app(swapPoint, variable(0)))), app(swapPoint, variable(0))), 'p');
export const swapEtaProof: Term = lambda(Point2, refl(Point2, app(swapPoint, variable(0))), 'p');

export const swapConcreteType: Term = eq(Point2, app(swapPoint, pair(numeral(8), numeral(11))), pair(numeral(11), numeral(8)));
export const swapConcreteProof: Term = refl(Point2, pair(numeral(11), numeral(8)));
export const diagonalConcreteType: Term = eq(Point2,
  app(swapPoint, app(diagonalPoint, numeral(12))), app(diagonalPoint, numeral(12)));
export const diagonalConcreteProof: Term = refl(Point2, pair(numeral(12), numeral(12)));
export const swapAxisConcreteType: Term = eq(Point2,
  app(swapPoint, pair({ kind: 'Zero' }, numeral(15))), pair(numeral(15), { kind: 'Zero' }));
export const swapAxisConcreteProof: Term = refl(Point2, pair(numeral(15), { kind: 'Zero' }));
