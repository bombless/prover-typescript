import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { mulTerm } from './mul';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
/** Nat scalar multiplication of a vector. */
export const scaleVec: Term = lambda(Nat, lambda(Vec2,
  pair(
    mulTerm(variable(1), fst(variable(0))),
    mulTerm(variable(1), snd(variable(0)))), 'v'), 'k');
export const scaleVecType: Term = pi(Nat, pi(Vec2, Vec2, 'v'), 'k');

/** Scaling by zero yields the zero vector, coordinatewise. */
export const zeroScaleType: Term = pi(Vec2,
  eq(Vec2,
    app(app(scaleVec, { kind: 'Zero' }), variable(0)),
    pair({ kind: 'Zero' }, { kind: 'Zero' })), 'v');
export const zeroScaleProof: Term = lambda(Vec2,
  refl(Vec2, pair({ kind: 'Zero' }, { kind: 'Zero' })), 'v');

/** Scaling by one preserves every vector. */
import { mulOneProof } from './mul-one';
import { initialProofState } from '../proof/state';
import { tacticSession } from '../proof/tactic';
export const oneScaleType: Term = pi(Vec2,
  eq(Vec2, app(app(scaleVec, { kind: 'Succ', value: { kind: 'Zero' } }), variable(0)), variable(0)), 'v');
const oneScaleSession = tacticSession(initialProofState(oneScaleType))
  .intro()
  .rewrite(app(mulOneProof, fst(variable(0))))
  .rewrite(app(mulOneProof, snd(variable(0))))
  .rfl();
export const oneScaleProof: Term = oneScaleSession.proof();

/** Scalar multiplication acts on the first coordinate by Nat multiplication. */
export const scaleFstType: Term = pi(Nat, pi(Vec2,
  eq(Nat, fst(app(app(scaleVec, variable(1)), variable(0))),
    mulTerm(variable(1), fst(variable(0)))), 'v'), 'k');
export const scaleFstProof: Term = lambda(Nat,
  lambda(Vec2, refl(Nat, mulTerm(variable(1), fst(variable(0)))), 'v'), 'k');

/** Scalar multiplication acts on the second coordinate by Nat multiplication. */
export const scaleSndType: Term = pi(Nat, pi(Vec2,
  eq(Nat, snd(app(app(scaleVec, variable(1)), variable(0))),
    mulTerm(variable(1), snd(variable(0)))), 'v'), 'k');
export const scaleSndProof: Term = lambda(Nat,
  lambda(Vec2, refl(Nat, mulTerm(variable(1), snd(variable(0)))), 'v'), 'k');

/** Scaling by zero has zero first coordinate. */
export const zeroScaleFstType: Term = pi(Vec2,
  eq(Nat, fst(app(app(scaleVec, { kind: 'Zero' }), variable(0))), { kind: 'Zero' }), 'v');
export const zeroScaleFstProof: Term = lambda(Vec2, refl(Nat, { kind: 'Zero' }), 'v');

/** Scaling by zero has zero second coordinate. */
export const zeroScaleSndType: Term = pi(Vec2,
  eq(Nat, snd(app(app(scaleVec, { kind: 'Zero' }), variable(0))), { kind: 'Zero' }), 'v');
export const zeroScaleSndProof: Term = lambda(Vec2, refl(Nat, { kind: 'Zero' }), 'v');

/** The first coordinate of zero scaling is multiplication by zero. */
export const zeroScaleFstFormulaType: Term = pi(Vec2,
  eq(Nat, fst(app(app(scaleVec, { kind: 'Zero' }), variable(0))),
    mulTerm({ kind: 'Zero' }, fst(variable(0)))), 'v');
export const zeroScaleFstFormulaProof: Term = lambda(Vec2, refl(Nat, { kind: 'Zero' }), 'v');

/** Scaling preserves the vector's product shape. */
export const scaleEtaType: Term = pi(Nat, pi(Vec2,
  eq(Vec2,
    pair(fst(app(app(scaleVec, variable(1)), variable(0))), snd(app(app(scaleVec, variable(1)), variable(0)))),
    app(app(scaleVec, variable(1)), variable(0))), 'v'), 'k');
export const scaleEtaProof: Term = lambda(Nat,
  lambda(Vec2, refl(Vec2, app(app(scaleVec, variable(1)), variable(0))), 'v'), 'k');

export const scaleConcreteType: Term = eq(Vec2,
  pair({ kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } }, { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } } } }),
  pair({ kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } }, { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } } } }));
export const scaleConcreteProof: Term = refl(Vec2,
  pair({ kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } }, { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } } } }));
export const scaleConcreteTwoType: Term = eq(Vec2, app(app(scaleVec, numeral(2)), pair(numeral(2), numeral(3))), pair(numeral(4), numeral(6)));
export const scaleConcreteTwoProof: Term = refl(Vec2, pair(numeral(4), numeral(6)));

/** Scaling by two doubles both coordinates in the current Nat algebra. */
export const scaleConcreteThreeType: Term = eq(Vec2, app(app(scaleVec, numeral(3)), pair(numeral(2), numeral(4))), pair(numeral(6), numeral(12)));
export const scaleConcreteThreeProof: Term = refl(Vec2, pair(numeral(6), numeral(12)));


/** Concrete scaling computes coordinatewise. */
