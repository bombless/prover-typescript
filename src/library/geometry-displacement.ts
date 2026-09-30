import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { addTerm, numeral } from './nat';
import { mulTerm } from './mul';
import { sub } from './sub';

export const Point2: Term = prod(Nat, Nat);

/** Squared displacement using truncated natural-number coordinate differences. */
export const displacementSq: Term = lambda(Point2, lambda(Point2,
  addTerm(
    mulTerm(app(app(sub, fst(variable(1))), fst(variable(0))), app(app(sub, fst(variable(1))), fst(variable(0)))),
    mulTerm(app(app(sub, snd(variable(1))), snd(variable(0))), app(app(sub, snd(variable(1))), snd(variable(0))))
  ), 'q'), 'p');
export const displacementSqType: Term = pi(Point2, pi(Point2, Nat, 'q'), 'p');

export const displacementZeroType: Term = eq(Nat,
  app(app(displacementSq, pair({ kind: 'Zero' }, { kind: 'Zero' })), pair({ kind: 'Zero' }, { kind: 'Zero' })),
  { kind: 'Zero' });
export const displacementZeroProof: Term = refl(Nat, { kind: 'Zero' });

export const displacementConcreteType: Term = eq(Nat,
  app(app(displacementSq, pair(numeral(5), numeral(7))), pair(numeral(2), numeral(3))),
  app(app(displacementSq, pair(numeral(5), numeral(7))), pair(numeral(2), numeral(3))));
export const displacementConcreteProof: Term = refl(Nat, app(app(displacementSq, pair(numeral(5), numeral(7))), pair(numeral(2), numeral(3))));

export const displacementReverseTruncatedType: Term = eq(Nat,
  app(app(displacementSq, pair(numeral(2), numeral(3))), pair(numeral(5), numeral(7))), { kind: 'Zero' });
export const displacementReverseTruncatedProof: Term = refl(Nat, { kind: 'Zero' });

/** Axis displacement reduces to a single squared coordinate difference. */
export const displacementXAxisType: Term = eq(Nat,
  app(app(displacementSq, pair(numeral(6), { kind: 'Zero' })), pair(numeral(2), { kind: 'Zero' })),
  app(app(displacementSq, pair(numeral(6), { kind: 'Zero' })), pair(numeral(2), { kind: 'Zero' })));
export const displacementXAxisProof: Term = refl(Nat, app(app(displacementSq, pair(numeral(6), { kind: 'Zero' })), pair(numeral(2), { kind: 'Zero' })));

export const displacementYAxisType: Term = eq(Nat,
  app(app(displacementSq, pair({ kind: 'Zero' }, numeral(6))), pair({ kind: 'Zero' }, numeral(2))),
  app(app(displacementSq, pair({ kind: 'Zero' }, numeral(6))), pair({ kind: 'Zero' }, numeral(2))));
export const displacementYAxisProof: Term = refl(Nat, app(app(displacementSq, pair({ kind: 'Zero' }, numeral(6))), pair({ kind: 'Zero' }, numeral(2))));
