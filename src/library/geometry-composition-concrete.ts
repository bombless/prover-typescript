import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';

export const Point2: Term = prod(Nat, Nat);
export const rotateAfterTranslateType: Term = eq(Point2,
  app(rotate90, app(app(translate, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4)))),
  pair(numeral(6), numeral(4)));
export const rotateAfterTranslateProof: Term = refl(Point2, pair(numeral(6), numeral(4)));
export const translateAfterRotateType: Term = eq(Point2,
  app(app(translate, app(rotate90, pair(numeral(1), numeral(2)))), pair(numeral(3), numeral(4))),
  pair(numeral(5), numeral(5)));
export const translateAfterRotateProof: Term = refl(Point2, pair(numeral(5), numeral(5)));
export const rotateSwapType: Term = eq(Point2,
  app(rotate90, pair(numeral(3), numeral(8))), pair(numeral(8), numeral(3)));
export const rotateSwapProof: Term = refl(Point2, pair(numeral(8), numeral(3)));
export const reflectAfterRotateType: Term = eq(Point2,
  app(reflectX, app(rotate90, pair(numeral(2), numeral(5)))), pair(numeral(5), numeral(2)));
export const reflectAfterRotateProof: Term = refl(Point2, pair(numeral(5), numeral(2)));
export const rotateAfterReflectType: Term = eq(Point2,
  app(rotate90, app(reflectX, pair(numeral(4), numeral(7)))), pair(numeral(7), numeral(4)));
export const rotateAfterReflectProof: Term = refl(Point2, pair(numeral(7), numeral(4)));
export const reflectRotateReflectType: Term = eq(Point2,
  app(reflectX, app(rotate90, app(reflectX, pair(numeral(3), numeral(6))))), pair(numeral(6), numeral(3)));
export const reflectRotateReflectProof: Term = refl(Point2, pair(numeral(6), numeral(3)));
