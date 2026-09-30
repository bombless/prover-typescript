import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { addVec2 } from './geometry-vectors';
import { numeral } from './nat';
import { rotate90 } from './geometry-rotations';
import { scaleVec } from './geometry-scalar';

export const Vec2: Term = prod(Nat, Nat);

/** Coordinate projections of nested vector addition. */
export const nestedAddFstType: Term = pi(Vec2, pi(Vec2, pi(Vec2,
  eq(Nat, fst(app(app(addVec2, app(app(addVec2, variable(2)), variable(1))), variable(0))),
    fst(app(app(addVec2, app(app(addVec2, variable(2)), variable(1))), variable(0)))), 'w'), 'v'), 'u');
export const nestedAddFstProof: Term = lambda(Vec2, lambda(Vec2, lambda(Vec2,
  refl(Nat, fst(app(app(addVec2, app(app(addVec2, variable(2)), variable(1))), variable(0)))), 'w'), 'v'), 'u');

export const nestedAddConcreteType: Term = eq(Vec2,
  app(app(addVec2, app(app(addVec2, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4)))), pair(numeral(5), numeral(6))),
  pair(numeral(9), numeral(12)));
export const nestedAddConcreteProof: Term = refl(Vec2, pair(numeral(9), numeral(12)));

/** Scaling after vector addition computes directly. */
export const scaleAddConcreteType: Term = eq(Vec2,
  app(app(scaleVec, numeral(2)), app(app(addVec2, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4)))),
  pair(numeral(8), numeral(12)));
export const scaleAddConcreteProof: Term = refl(Vec2, pair(numeral(8), numeral(12)));

/** Rotation after nested addition computes directly. */
export const rotateNestedAddType: Term = eq(Vec2,
  app(rotate90, app(app(addVec2, app(app(addVec2, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4)))), pair(numeral(5), numeral(6)))),
  pair(numeral(12), numeral(9)));
export const rotateNestedAddProof: Term = refl(Vec2, pair(numeral(12), numeral(9)));

/** Vector addition reconstructed from its coordinate projections. */
export const nestedAddEtaType: Term = pi(Vec2, pi(Vec2, pi(Vec2,
  eq(Vec2, pair(fst(app(app(addVec2, app(app(addVec2, variable(2)), variable(1))), variable(0))),
    snd(app(app(addVec2, app(app(addVec2, variable(2)), variable(1))), variable(0)))),
    app(app(addVec2, app(app(addVec2, variable(2)), variable(1))), variable(0))), 'w'), 'v'), 'u');
export const nestedAddEtaProof: Term = lambda(Vec2, lambda(Vec2, lambda(Vec2,
  refl(Vec2, app(app(addVec2, app(app(addVec2, variable(2)), variable(1))), variable(0))), 'w'), 'v'), 'u');
