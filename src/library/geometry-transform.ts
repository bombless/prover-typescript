import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { addTerm } from './nat';
import { numeral } from './nat';
import { addZeroProof } from './add-zero';
import { initialProofState } from '../proof/state';
import { tacticSession } from '../proof/tactic';

export const Vec2: Term = prod(Nat, Nat);
export const translate: Term = lambda(Vec2, lambda(Vec2,
  pair(
    addTerm(fst(variable(1)), fst(variable(0))),
    addTerm(snd(variable(1)), snd(variable(0)))), 'delta'), 'p');
export const translateType: Term = pi(Vec2, pi(Vec2, Vec2, 'delta'), 'p');


export const translateOriginType: Term = eq(Vec2,
  app(app(translate, pair({ kind: 'Zero' }, { kind: 'Zero' })), pair({ kind: 'Zero' }, { kind: 'Zero' })),
  pair({ kind: 'Zero' }, { kind: 'Zero' }));
export const translateOriginProof: Term = refl(Vec2, pair({ kind: 'Zero' }, { kind: 'Zero' }));

export const translateUnitType: Term = eq(Vec2,
  app(app(translate, pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' })), pair({ kind: 'Zero' }, { kind: 'Zero' })),
  pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' }));
export const translateUnitProof: Term = refl(Vec2, pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' }));

export const translateConcreteType: Term = eq(Vec2,
  app(app(translate, pair(numeral(2), numeral(3))), pair(numeral(4), numeral(5))),
  pair(numeral(6), numeral(8)));
export const translateConcreteProof: Term = refl(Vec2, pair(numeral(6), numeral(8)));

/** Translating any point by the zero vector preserves it. */
export const translateZeroType: Term = pi(Vec2,
  eq(Vec2,
    app(app(translate, variable(0)), pair({ kind: 'Zero' }, { kind: 'Zero' })),
    variable(0)), 'p');
const translateZeroSession = tacticSession(initialProofState(translateZeroType))
  .intro()
  .rewrite(app(addZeroProof, fst(variable(0))))
  .rewrite(app(addZeroProof, snd(variable(0))))
  .rfl();
export const translateZeroProof: Term = translateZeroSession.proof();

/** Translation acts coordinatewise on the first coordinate. */
export const translateFstType: Term = pi(Vec2, pi(Vec2,
  eq(Nat, fst(app(app(translate, variable(1)), variable(0))),
    addTerm(fst(variable(1)), fst(variable(0)))), 'delta'), 'p');
export const translateFstProof: Term = lambda(Vec2,
  lambda(Vec2, refl(Nat, addTerm(fst(variable(1)), fst(variable(0)))), 'delta'), 'p');

/** Translation acts coordinatewise on the second coordinate. */
export const translateSndType: Term = pi(Vec2, pi(Vec2,
  eq(Nat, snd(app(app(translate, variable(1)), variable(0))),
    addTerm(snd(variable(1)), snd(variable(0)))), 'delta'), 'p');
export const translateSndProof: Term = lambda(Vec2,
  lambda(Vec2, refl(Nat, addTerm(snd(variable(1)), snd(variable(0)))), 'delta'), 'p');

/** Translation's output is reconstructed by its coordinate projections. */
export const translateEtaType: Term = pi(Vec2, pi(Vec2,
  eq(Vec2,
    pair(fst(app(app(translate, variable(1)), variable(0))), snd(app(app(translate, variable(1)), variable(0)))),
    app(app(translate, variable(1)), variable(0))), 'delta'), 'p');
export const translateEtaProof: Term = lambda(Vec2,
  lambda(Vec2, refl(Vec2, app(app(translate, variable(1)), variable(0))), 'delta'), 'p');

/** Translating the origin yields exactly the displacement. */
export const translateOriginGeneralType: Term = pi(Vec2,
  eq(Vec2, app(app(translate, pair({ kind: 'Zero' }, { kind: 'Zero' })), variable(0)), variable(0)), 'd');
export const translateOriginGeneralProof: Term = lambda(Vec2,
  refl(Vec2, variable(0)), 'd');

/** Translating a point by a zero displacement has zero output coordinates. */
