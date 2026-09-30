import { Term, Nat, prod, pair, app, eq, refl, fst } from '../syntax/ast';
import { distanceSq } from './geometry-distance';
import { normSq } from './geometry-metrics';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { scaleVec } from './geometry-scalar';
import { Triangle2 } from './geometry-triangle';
import { translate } from './geometry-transform';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(2), numeral(3));

/** Rotation preserves the concrete discrete norm-square. */
export const rotateNormCertificateType: Term = eq(Nat,
  app(normSq, app(rotate90, p)), numeral(13));
export const rotateNormCertificateProof: Term = refl(Nat, numeral(13));

/** Coordinate-copy reflection preserves the concrete discrete norm-square. */
export const reflectNormCertificateType: Term = eq(Nat,
  app(normSq, app(reflectX, p)), numeral(13));
export const reflectNormCertificateProof: Term = refl(Nat, numeral(13));

/** Scaling by two multiplies this concrete norm-square by four. */
export const scaleNormCertificateType: Term = eq(Nat,
  app(normSq, app(app(scaleVec, numeral(2)), p)), numeral(52));
export const scaleNormCertificateProof: Term = refl(Nat, numeral(52));

/** A translated concrete triangle exposes its translated first vertex. */
export const translatedTriangleVertexType: Term = eq(Point2,
  app(app(translate, fst(pair(p, pair(pair(numeral(4), numeral(5)), pair(numeral(6), numeral(7)))))), pair(numeral(1), numeral(2))),
  pair(numeral(3), numeral(5)));
export const translatedTriangleVertexProof: Term = refl(Point2, pair(numeral(3), numeral(5)));
