import { Term, Bool, True, False, app, eq, refl } from '../syntax/ast';
import { boolNot } from './bool';
import { boolAnd, boolOr } from './bool-ops';

export const notTrueType: Term = eq(Bool, app(boolNot, True), False);
export const notTrueProof: Term = refl(Bool, False);
export const notFalseType: Term = eq(Bool, app(boolNot, False), True);
export const notFalseProof: Term = refl(Bool, True);
export const trueAndFalseType: Term = eq(Bool, app(app(boolAnd, True), False), False);
export const trueAndFalseProof: Term = refl(Bool, False);
export const falseOrTrueType: Term = eq(Bool, app(app(boolOr, False), True), True);
export const falseOrTrueProof: Term = refl(Bool, True);
