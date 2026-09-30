import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { distanceSq } from './geometry-distance';
import { rotate90 } from './geometry-rotations';
import { scaleVec } from './geometry-scalar';
import { mulRightZeroProof } from './mul-right-zero';
import { mulOneProof } from './mul-one';
import { addZeroProof } from './add-zero';
import { initialProofState } from '../proof/state';
import { tacticSession } from '../proof/tactic';

export const Point2: Term = prod(Nat, Nat);
const zero: Term = pair({ kind: 'Zero' }, { kind: 'Zero' });
const xUnit: Term = pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' });

/** Scaling either endpoint by any scalar keeps the zero endpoint distance at zero. */
export const scaledToZeroType: Term = pi(Nat, pi(Point2,
  eq(Nat, app(app(distanceSq, app(app(scaleVec, variable(1)), variable(0))), zero), { kind: 'Zero' }), 'p'), 'k');
const scaledToZeroSession = tacticSession(initialProofState(scaledToZeroType))
  .intro().intro()
  .rewrite(app(mulRightZeroProof, fst(app(app(scaleVec, variable(1)), variable(0)))))
  .rewrite(app(mulRightZeroProof, snd(app(app(scaleVec, variable(1)), variable(0)))))
  .rewrite(app(addZeroProof, { kind: 'Zero' })).rfl();
export const scaledToZeroProof: Term = scaledToZeroSession.proof();

/** Rotation followed by the x-unit metric exposes the original second coordinate. */
export const rotatedXUnitType: Term = pi(Point2,
  eq(Nat, app(app(distanceSq, app(rotate90, variable(0))), xUnit), snd(variable(0))), 'p');
const rotatedXUnitSession = tacticSession(initialProofState(rotatedXUnitType))
  .intro()
  .rewrite(app(mulOneProof, snd(variable(0))))
  .rewrite(app(mulRightZeroProof, fst(variable(0))))
  .rewrite(app(addZeroProof, snd(variable(0)))).rfl();
export const rotatedXUnitProof: Term = rotatedXUnitSession.proof();

/** Rotation followed by the y-unit metric exposes the original first coordinate. */
export const rotatedYUnitType: Term = pi(Point2,
  eq(Nat, app(app(distanceSq, app(rotate90, variable(0))), pair({ kind: 'Zero' }, { kind: 'Succ', value: { kind: 'Zero' } })), fst(variable(0))), 'p');
const rotatedYUnitSession = tacticSession(initialProofState(rotatedYUnitType))
  .intro()
  .rewrite(app(mulRightZeroProof, snd(variable(0))))
  .rewrite(app(mulOneProof, fst(variable(0))))
  .rfl();
export const rotatedYUnitProof: Term = rotatedYUnitSession.proof();
