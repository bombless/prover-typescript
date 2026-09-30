import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { normSq, dot2 } from './geometry-metrics';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';

export const Vec2: Term = prod(Nat, Nat);

/** Norm and dot product of transformed axis vectors compute together. */
export const rotatedAxisNormType: Term = eq(Nat, app(normSq, app(rotate90, pair(numeral(4), { kind: 'Zero' }))), numeral(16));
export const rotatedAxisNormProof: Term = refl(Nat, numeral(16));

export const translatedAxisDotType: Term = eq(Nat,
  app(app(dot2, app(app(translate, pair(numeral(1), numeral(2))), pair(numeral(3), { kind: 'Zero' }))), pair(numeral(1), numeral(1))),
  app(app(dot2, app(app(translate, pair(numeral(1), numeral(2))), pair(numeral(3), { kind: 'Zero' }))), pair(numeral(1), numeral(1))));
export const translatedAxisDotProof: Term = refl(Nat, app(app(dot2, app(app(translate, pair(numeral(1), numeral(2))), pair(numeral(3), { kind: 'Zero' }))), pair(numeral(1), numeral(1))));

/** A rotated and translated point can be measured against an axis. */
export const rotateTranslateAxisDotType: Term = eq(Nat,
  app(app(dot2, app(rotate90, app(app(translate, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4))))), pair(numeral(1), { kind: 'Zero' })), numeral(6));
export const rotateTranslateAxisDotProof: Term = refl(Nat, numeral(6));
