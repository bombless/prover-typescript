import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { reflectX } from './geometry-reflections';
import { rotate90 } from './geometry-rotations';
import { scaleVec } from './geometry-scalar';
import { translate } from './geometry-transform';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(4), numeral(2));

/** Two reflections in the coordinate-copy map restore a concrete point. */
export const reflectTwiceConcreteType: Term = eq(Point2, app(reflectX, app(reflectX, p)), p);
export const reflectTwiceConcreteProof: Term = refl(Point2, p);

/** Reflection after rotation computes a concrete point. */
export const reflectRotateConcreteType: Term = eq(Point2, app(reflectX, app(rotate90, p)), pair(numeral(2), numeral(4)));
export const reflectRotateConcreteProof: Term = refl(Point2, pair(numeral(2), numeral(4)));

/** Scaling, rotation, and reflection form a concrete transformation chain. */
export const scaleRotateReflectType: Term = eq(Point2,
  app(reflectX, app(rotate90, app(app(scaleVec, numeral(3)), p))),
  pair(numeral(6), numeral(12)));
export const scaleRotateReflectProof: Term = refl(Point2, pair(numeral(6), numeral(12)));

/** A final zero translation preserves the reflected point. */
export const reflectZeroTranslateType: Term = eq(Point2,
  app(app(translate, app(reflectX, p)), pair({ kind: 'Zero' }, { kind: 'Zero' })), p);
export const reflectZeroTranslateProof: Term = refl(Point2, p);
