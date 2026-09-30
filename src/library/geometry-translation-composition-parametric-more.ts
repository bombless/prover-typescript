import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { translate } from './geometry-transform';
import { addTerm } from './nat';
import { addZeroProof } from './add-zero';
import { initialProofState } from '../proof/state';
import { tacticSession } from '../proof/tactic';

export const Point2: Term = prod(Nat, Nat);

/** Two successive translations expose the nested first-coordinate sum. */
export const translateTwiceFstType: Term = pi(Point2, pi(Point2, pi(Point2,
  eq(Nat,
    fst(app(app(translate, app(app(translate, variable(2)), variable(1))), variable(0))),
    addTerm(addTerm(fst(variable(2)), fst(variable(1))), fst(variable(0)))), 'e'), 'd'), 'p');
export const translateTwiceFstProof: Term = lambda(Point2, lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(addTerm(fst(variable(2)), fst(variable(1))), fst(variable(0)))), 'e'), 'd'), 'p');

/** Two successive translations expose the nested second-coordinate sum. */
export const translateTwiceSndType: Term = pi(Point2, pi(Point2, pi(Point2,
  eq(Nat,
    snd(app(app(translate, app(app(translate, variable(2)), variable(1))), variable(0))),
    addTerm(addTerm(snd(variable(2)), snd(variable(1))), snd(variable(0)))), 'e'), 'd'), 'p');
export const translateTwiceSndProof: Term = lambda(Point2, lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(addTerm(snd(variable(2)), snd(variable(1))), snd(variable(0)))), 'e'), 'd'), 'p');

/** Translating a point by two zero displacements leaves it unchanged. */
export const translateTwiceZeroType: Term = pi(Point2,
  eq(Point2, app(app(translate, app(app(translate, variable(0)),
    { kind: 'Pair', left: { kind: 'Zero' }, right: { kind: 'Zero' } })),
    { kind: 'Pair', left: { kind: 'Zero' }, right: { kind: 'Zero' } }), variable(0)), 'p');
const translateTwiceZeroSession = tacticSession(initialProofState(translateTwiceZeroType))
  .intro()
  .rewrite(app(addZeroProof, addTerm(fst(variable(0)), { kind: 'Zero' })))
  .rewrite(app(addZeroProof, addTerm(snd(variable(0)), { kind: 'Zero' })))
  .rewrite(app(addZeroProof, fst(variable(0))))
  .rewrite(app(addZeroProof, snd(variable(0))))
  .rfl();
export const translateTwiceZeroProof: Term = translateTwiceZeroSession.proof();
