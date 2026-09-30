import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { addTerm, numeral } from './nat';
import { addVec2, Vec2 } from './geometry-vectors';
import { addZeroProof } from './add-zero';
import { initialProofState } from '../proof/state';
import { tacticSession } from '../proof/tactic';

export const addVecConcreteType: Term = eq(Vec2,
  app(app(addVec2, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4))),
  pair(numeral(4), numeral(6)));
export const addVecConcreteProof: Term = refl(Vec2, pair(numeral(4), numeral(6)));

export const addVecSwapConcreteType: Term = eq(Vec2,
  app(app(addVec2, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4))),
  app(app(addVec2, pair(numeral(3), numeral(4))), pair(numeral(1), numeral(2))));
export const addVecSwapConcreteProof: Term = refl(Vec2, pair(numeral(4), numeral(6)));

export const addVecZeroConcreteType: Term = eq(Vec2,
  app(app(addVec2, pair(numeral(5), numeral(7))), pair({ kind: 'Zero' }, { kind: 'Zero' })),
  pair(numeral(5), numeral(7)));
export const addVecZeroConcreteProof: Term = refl(Vec2, pair(numeral(5), numeral(7)));

export const addVecZeroType: Term = pi(Vec2,
  eq(Vec2,
    app(app(addVec2, variable(0)), pair({ kind: 'Zero' }, { kind: 'Zero' })),
    variable(0)), 'v');

const vectorZeroSession = tacticSession(initialProofState(addVecZeroType))
  .intro()
  .rewrite(app(addZeroProof, fst(variable(0))))
  .rewrite(app(addZeroProof, snd(variable(0))))
  .rfl();
export const addVecZeroProof: Term = vectorZeroSession.proof();

export const addVecLeftZeroType: Term = pi(Vec2,
  eq(Vec2,
    app(app(addVec2, pair({ kind: 'Zero' }, { kind: 'Zero' })), variable(0)),
    variable(0)), 'v');
const vectorLeftZeroSession = tacticSession(initialProofState(addVecLeftZeroType)).intro().rfl();
export const addVecLeftZeroProof: Term = vectorLeftZeroSession.proof();

/** A concrete vector addition calculation with larger coordinates. */
export const addVecLargeType: Term = eq(Vec2,
  app(app(addVec2, pair(numeral(6), numeral(8))), pair(numeral(7), numeral(9))),
  pair(numeral(13), numeral(17)));
export const addVecLargeProof: Term = refl(Vec2, pair(numeral(13), numeral(17)));
