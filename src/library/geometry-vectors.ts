import { Term, Nat, prod, pair, fst, snd, variable, lambda, pi, app, eq, refl, Type } from '../syntax/ast';
import { addTerm, numeral } from './nat';
import { addCommProof } from './add-comm';
import { addAssocProof } from './add-assoc';
import { initialProofState } from '../proof/state';
import { tacticSession } from '../proof/tactic';

export const Vec2: Term = prod(Nat, Nat);
export const zeroVec: Term = pair({ kind: 'Zero' }, { kind: 'Zero' });
export const addVec2: Term = lambda(Vec2, lambda(Vec2,
  pair(
    addTerm(fst(variable(1)), fst(variable(0))),
    addTerm(snd(variable(1)), snd(variable(0)))), 'v'), 'u');
export const addVec2Type: Term = pi(Vec2, pi(Vec2, Vec2, 'v'), 'u');
export const zeroVecType: Term = Vec2;
export const zeroVecProof: Term = zeroVec;
export const zeroVecXType: Term = eq(Nat, fst(zeroVec), { kind: 'Zero' });
export const zeroVecXProof: Term = refl(Nat, { kind: 'Zero' });
export const zeroVecYType: Term = eq(Nat, snd(zeroVec), { kind: 'Zero' });
export const zeroVecYProof: Term = refl(Nat, { kind: 'Zero' });

export const addZeroVecType: Term = pi(Vec2,
  eq(Vec2,
    { kind: 'Pair', left: { kind: 'App', fn: { kind: 'App', fn: { kind: 'Var', index: 4 }, arg: { kind: 'Fst', pair: { kind: 'Var', index: 0 } } }, arg: { kind: 'Zero' } }, right: { kind: 'App', fn: { kind: 'App', fn: { kind: 'Var', index: 4 }, arg: { kind: 'Snd', pair: { kind: 'Var', index: 0 } } }, arg: { kind: 'Zero' } } }, variable(0)), 'u');
export const addZeroVecProof: Term = lambda(Vec2, refl(Vec2, variable(0)), 'u');

/** The first coordinate of vector addition is the sum of first coordinates. */
export const addVecFstType: Term = pi(Vec2, pi(Vec2,
  eq(Nat, fst(app(app(addVec2, variable(1)), variable(0))),
    addTerm(fst(variable(1)), fst(variable(0)))), 'v'), 'u');
export const addVecFstProof: Term = lambda(Vec2,
  lambda(Vec2, refl(Nat, addTerm(fst(variable(1)), fst(variable(0)))), 'v'), 'u');

/** The second coordinate of vector addition is the sum of second coordinates. */
export const addVecSndType: Term = pi(Vec2, pi(Vec2,
  eq(Nat, snd(app(app(addVec2, variable(1)), variable(0))),
    addTerm(snd(variable(1)), snd(variable(0)))), 'v'), 'u');
export const addVecSndProof: Term = lambda(Vec2,
  lambda(Vec2, refl(Nat, addTerm(snd(variable(1)), snd(variable(0)))), 'v'), 'u');

/** Vector addition is commutative componentwise. */
export const addVecCommType: Term = pi(Vec2, pi(Vec2,
  eq(Vec2, app(app(addVec2, variable(1)), variable(0)), app(app(addVec2, variable(0)), variable(1))), 'v'), 'u');
const addVecCommSession = tacticSession(initialProofState(addVecCommType))
  .intro()
  .intro()
  .rewrite(app(app(addCommProof, fst(variable(1))), fst(variable(0))))
  .rewrite(app(app(addCommProof, snd(variable(1))), snd(variable(0))))
  .rfl();
export const addVecCommProof: Term = addVecCommSession.proof();

/** Vector addition is associative componentwise. */
export const addVecAssocType: Term = pi(Vec2, pi(Vec2, pi(Vec2,
  eq(Vec2,
    app(app(addVec2, app(app(addVec2, variable(2)), variable(1))), variable(0)),
    app(app(addVec2, variable(2)), app(app(addVec2, variable(1)), variable(0)))), 'w'), 'v'), 'u');
const addVecAssocSession = tacticSession(initialProofState(addVecAssocType))
  .intro()
  .intro()
  .intro()
  .rewrite(app(app(app(addAssocProof, fst(variable(2))), fst(variable(1))), fst(variable(0))))
  .rewrite(app(app(app(addAssocProof, snd(variable(2))), snd(variable(1))), snd(variable(0))))
  .rfl();
export const addVecAssocProof: Term = addVecAssocSession.proof();

/** Every vector is reconstructed by its two coordinates. */
export const vectorEtaType: Term = pi(Vec2,
  eq(Vec2, pair(fst(variable(0)), snd(variable(0))), variable(0)), 'v');
export const vectorEtaProof: Term = lambda(Vec2, refl(Vec2, variable(0)), 'v');

/** Vector addition is closed under the zero vector on the left in this model. */
export const addZeroVecLeftType: Term = pi(Vec2,
  eq(Vec2, app(app(addVec2, zeroVec), variable(0)), variable(0)), 'v');
export const addZeroVecLeftProof: Term = lambda(Vec2, refl(Vec2, variable(0)), 'v');

export const addVecConcreteType: Term = eq(Vec2,
  app(app(addVec2, pair(numeral(6), numeral(1))), pair(numeral(2), numeral(8))),
  pair(numeral(8), numeral(9)));
export const addVecConcreteProof: Term = refl(Vec2, pair(numeral(8), numeral(9)));

/** Left zero is definitionally transparent because Nat.add recurses on its first coordinate argument. */
