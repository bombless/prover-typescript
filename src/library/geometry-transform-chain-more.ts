import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { scaleVec } from './geometry-scalar';
import { translate } from './geometry-transform';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(2), numeral(3));

/** Two quarter-turns restore a concrete point. */
export const rotateTwiceConcreteType: Term = eq(Point2,
  app(rotate90, app(rotate90, p)), p);
export const rotateTwiceConcreteProof: Term = refl(Point2, p);

/** Scaling then rotating exchanges the scaled coordinates. */
export const scaleRotateConcreteType: Term = eq(Point2,
  app(rotate90, app(app(scaleVec, numeral(2)), p)),
  pair(numeral(6), numeral(4)));
export const scaleRotateConcreteProof: Term = refl(Point2, pair(numeral(6), numeral(4)));

/** Scaling, translating, then rotating computes as one concrete chain. */
export const scaleTranslateRotateConcreteType: Term = eq(Point2,
  app(rotate90, app(app(translate,
    app(app(scaleVec, numeral(2)), p)), pair(numeral(1), numeral(4)))),
  pair(numeral(10), numeral(5)));
export const scaleTranslateRotateConcreteProof: Term = refl(Point2, pair(numeral(10), numeral(5)));

/** A zero translation at the end of a concrete chain leaves the chain unchanged. */
export const chainZeroTranslateType: Term = eq(Point2,
  app(app(translate, app(rotate90, p)), pair({ kind: 'Zero' }, { kind: 'Zero' })),
  pair(numeral(3), numeral(2)));
export const chainZeroTranslateProof: Term = refl(Point2, pair(numeral(3), numeral(2)));
