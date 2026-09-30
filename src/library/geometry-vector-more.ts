import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { numeral } from './nat';
import { addVec2, Vec2 } from './geometry-vectors';
import { scaleVec } from './geometry-scalar';

/** Closed coordinate computations for vector addition and scalar multiplication. */
export const addVecChainType: Term = eq(Vec2,
  app(app(addVec2, pair(numeral(1), numeral(2))),
    app(app(addVec2, pair(numeral(3), numeral(4))), pair(numeral(5), numeral(6)))),
  pair(numeral(9), numeral(12)));
export const addVecChainProof: Term = refl(Vec2, pair(numeral(9), numeral(12)));

export const scaleThenAddType: Term = eq(Vec2,
  app(app(addVec2, app(app(scaleVec, numeral(2)), pair(numeral(1), numeral(3)))), pair(numeral(4), numeral(5))),
  pair(numeral(6), numeral(11)));
export const scaleThenAddProof: Term = refl(Vec2, pair(numeral(6), numeral(11)));

/** Coordinate projections of a sum after a concrete scalar operation. */
export const scaleThenAddFstType: Term = eq(Nat,
  fst(app(app(addVec2, app(app(scaleVec, numeral(2)), pair(numeral(1), numeral(3)))), pair(numeral(4), numeral(5)))), numeral(6));
export const scaleThenAddFstProof: Term = refl(Nat, numeral(6));

export const scaleThenAddSndType: Term = eq(Nat,
  snd(app(app(addVec2, app(app(scaleVec, numeral(2)), pair(numeral(1), numeral(3)))), pair(numeral(4), numeral(5)))), numeral(11));
export const scaleThenAddSndProof: Term = refl(Nat, numeral(11));
