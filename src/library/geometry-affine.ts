import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { addTerm } from './nat';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const affineCombine: Term = lambda(Point2, lambda(Point2,
  pair(
    addTerm(fst(variable(1)), fst(variable(0))),
    addTerm(snd(variable(1)), snd(variable(0)))), 'q'), 'p');
export const affineCombineType: Term = pi(Point2, pi(Point2, Point2, 'q'), 'p');
export const affineOriginType: Term = eq(Point2,
  app(app(affineCombine, pair({ kind: 'Zero' }, { kind: 'Zero' })), pair({ kind: 'Zero' }, { kind: 'Zero' })),
  pair({ kind: 'Zero' }, { kind: 'Zero' }));
export const affineOriginProof: Term = refl(Point2, pair({ kind: 'Zero' }, { kind: 'Zero' }));
export const affineConcreteType: Term = eq(Point2,
  app(app(affineCombine, pair(numeral(2), numeral(3))), pair(numeral(4), numeral(5))),
  pair(numeral(6), numeral(8)));
export const affineConcreteProof: Term = refl(Point2, pair(numeral(6), numeral(8)));

/** Adding the origin on the left preserves every point. */
export const affineLeftOriginType: Term = pi(Point2,
  eq(Point2,
    app(app(affineCombine, pair({ kind: 'Zero' }, { kind: 'Zero' })), variable(0)),
    variable(0)), 'q');
export const affineLeftOriginProof: Term = lambda(Point2, refl(Point2, variable(0)), 'q');

/** Adding the origin on the right preserves every point. */
export const affineRightOriginType: Term = pi(Point2,
  eq(Point2,
    app(app(affineCombine, variable(0)), pair({ kind: 'Zero' }, { kind: 'Zero' })),
    variable(0)), 'p');
import { initialProofState } from '../proof/state';
import { tacticSession } from '../proof/tactic';
import { addZeroProof } from './add-zero';
const affineRightSession = tacticSession(initialProofState(affineRightOriginType))
  .intro()
  .rewrite(app(addZeroProof, fst(variable(0))))
  .rewrite(app(addZeroProof, snd(variable(0))))
  .rfl();
export const affineRightOriginProof: Term = affineRightSession.proof();

/** Affine combination exposes the first coordinate sum. */
export const affineFstType: Term = pi(Point2, pi(Point2,
  eq(Nat, fst(app(app(affineCombine, variable(1)), variable(0))),
    addTerm(fst(variable(1)), fst(variable(0)))), 'q'), 'p');
export const affineFstProof: Term = lambda(Point2,
  lambda(Point2, refl(Nat, addTerm(fst(variable(1)), fst(variable(0)))), 'q'), 'p');

/** Affine combination exposes the second coordinate sum. */
export const affineSndType: Term = pi(Point2, pi(Point2,
  eq(Nat, snd(app(app(affineCombine, variable(1)), variable(0))),
    addTerm(snd(variable(1)), snd(variable(0)))), 'q'), 'p');
export const affineSndProof: Term = lambda(Point2,
  lambda(Point2, refl(Nat, addTerm(snd(variable(1)), snd(variable(0)))), 'q'), 'p');

/** An affine combination is reconstructed from its coordinates. */
export const affineEtaType: Term = pi(Point2, pi(Point2,
  eq(Point2,
    pair(fst(app(app(affineCombine, variable(1)), variable(0))), snd(app(app(affineCombine, variable(1)), variable(0)))),
    app(app(affineCombine, variable(1)), variable(0))), 'q'), 'p');
export const affineEtaProof: Term = lambda(Point2,
  lambda(Point2, refl(Point2, app(app(affineCombine, variable(1)), variable(0))), 'q'), 'p');
