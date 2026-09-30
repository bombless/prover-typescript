import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { distanceSq } from './geometry-distance';
import { mulZeroProof } from './mul-zero';
import { mulRightZeroProof } from './mul-right-zero';
import { addZeroProof } from './add-zero';
import { initialProofState } from '../proof/state';
import { tacticSession } from '../proof/tactic';

export const Point2: Term = prod(Nat, Nat);
const zero: Term = pair({ kind: 'Zero' }, { kind: 'Zero' });

export const pointToOriginType: Term = pi(Point2, eq(Nat, app(app(distanceSq, variable(0)), zero), { kind: 'Zero' }), 'p');
const pointToOriginSession = tacticSession(initialProofState(pointToOriginType))
  .intro()
  .rewrite(app(mulRightZeroProof, fst(variable(0))))
  .rewrite(app(mulRightZeroProof, snd(variable(0))))
  .rewrite(app(addZeroProof, { kind: 'Zero' }))
  .rfl();
export const pointToOriginProof: Term = pointToOriginSession.proof();

export const originToPointType: Term = pi(Point2, eq(Nat, app(app(distanceSq, zero), variable(0)), { kind: 'Zero' }), 'p');
const originToPointSession = tacticSession(initialProofState(originToPointType))
  .intro()
  .rewrite(app(mulZeroProof, fst(variable(0))))
  .rewrite(app(mulZeroProof, snd(variable(0))))
  .rewrite(app(addZeroProof, { kind: 'Zero' }))
  .rfl();
export const originToPointProof: Term = originToPointSession.proof();
