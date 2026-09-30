import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { onCircle } from './geometry-circle';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Circle2: Term = prod(Point2, Nat);

const p: Term = pair(numeral(3), numeral(4));
const shift: Term = pair(numeral(1), numeral(2));
const moved: Term = app(app(translate, shift), p);
const turned: Term = app(rotate90, p);

/** Three concrete constructions certify circle membership after identity, translation, and rotation. */
export const circleMembershipBundleType: Term = prod(
  app(app(onCircle, p), pair(p, numeral(25))),
  prod(
    app(app(onCircle, moved), pair(moved, numeral(52))),
    app(app(onCircle, turned), pair(turned, numeral(25)))));

export const circleMembershipBundleProof: Term = pair(
  refl(Nat, numeral(25)),
  pair(refl(Nat, numeral(52)), refl(Nat, numeral(25))));
