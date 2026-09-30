import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { distanceSq } from './geometry-distance';
import { mulZeroProof } from './mul-zero';
import { mulOneProof } from './mul-one';
import { mulRightZeroProof } from './mul-right-zero';
import { addZeroProof } from './add-zero';
import { fst, snd } from '../syntax/ast';
import { initialProofState } from '../proof/state';
import { tacticSession } from '../proof/tactic';

export const Point2: Term = prod(Nat, Nat);
const zero: Term = pair({ kind: 'Zero' }, { kind: 'Zero' });
const xUnit: Term = pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' });
const yUnit: Term = pair({ kind: 'Zero' }, { kind: 'Succ', value: { kind: 'Zero' } });

/** In the coordinate model, distance to the zero point reduces to zero. */
export const distanceToZeroType: Term = pi(Point2,
  eq(Nat, app(app(distanceSq, variable(0)), zero), { kind: 'Zero' }), 'p');
const distanceToZeroSession = tacticSession(initialProofState(distanceToZeroType))
  .intro()
  .rewrite(app(mulRightZeroProof, fst(variable(0))))
  .rewrite(app(mulRightZeroProof, snd(variable(0))))
  .rewrite(app(addZeroProof, { kind: 'Zero' }))
  .rfl();
export const distanceToZeroProof: Term = distanceToZeroSession.proof();

/** The zero point has zero distance to every point in the same model. */
export const zeroToDistanceType: Term = pi(Point2,
  eq(Nat, app(app(distanceSq, zero), variable(0)), { kind: 'Zero' }), 'p');
const zeroToDistanceSession = tacticSession(initialProofState(zeroToDistanceType))
  .intro()
  .rewrite(app(mulZeroProof, fst(variable(0))))
  .rewrite(app(mulZeroProof, snd(variable(0))))
  .rewrite(app(addZeroProof, { kind: 'Zero' }))
  .rfl();
export const zeroToDistanceProof: Term = zeroToDistanceSession.proof();

/** Distance to the x-axis unit point exposes the first coordinate. */
export const distanceToXUnitType: Term = pi(Point2,
  eq(Nat, app(app(distanceSq, variable(0)), xUnit), fst(variable(0))), 'p');
const distanceToXUnitSession = tacticSession(initialProofState(distanceToXUnitType))
  .intro()
  .rewrite(app(mulOneProof, fst(variable(0))))
  .rewrite(app(mulRightZeroProof, snd(variable(0))))
  .rewrite(app(addZeroProof, fst(variable(0))))
  .rfl();
export const distanceToXUnitProof: Term = distanceToXUnitSession.proof();

/** Distance to the y-axis unit point exposes the second coordinate. */
export const distanceToYUnitType: Term = pi(Point2,
  eq(Nat, app(app(distanceSq, variable(0)), yUnit), snd(variable(0))), 'p');
const distanceToYUnitSession = tacticSession(initialProofState(distanceToYUnitType))
  .intro()
  .rewrite(app(mulRightZeroProof, fst(variable(0))))
  .rewrite(app(mulOneProof, snd(variable(0))))
  .rfl();
export const distanceToYUnitProof: Term = distanceToYUnitSession.proof();

/** The metric expression is definitionally the same as the dot product expression. */
export const distanceSelfType: Term = pi(Point2,
  eq(Nat, app(app(distanceSq, variable(0)), variable(0)),
    app(app(distanceSq, variable(0)), variable(0))), 'p');
export const distanceSelfProof: Term = lambda(Point2, refl(Nat, app(app(distanceSq, variable(0)), variable(0))), 'p');
