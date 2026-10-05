import { Term, Bool, True, False, app, eq, refl } from '../syntax/ast';
import { boolAnd, boolOr } from './bool-ops';
import { boolNot } from './bool';

const e = (a: Term, b: Term): Term => eq(Bool, a, b);
const not = (x: Term): Term => app(boolNot, x);
const and = (a: Term, b: Term): Term => app(app(boolAnd, a), b);
const or = (a: Term, b: Term): Term => app(app(boolOr, a), b);

export const demorganTrueFalseType = e(not(and(True, False)), or(not(True), not(False)));
export const demorganTrueFalseProof = refl(Bool, True);
export const demorganFalseTrueType = e(not(and(False, True)), or(not(False), not(True)));
export const demorganFalseTrueProof = refl(Bool, True);
export const demorganOrTrueFalseType = e(not(or(True, False)), and(not(True), not(False)));
export const demorganOrTrueFalseProof = refl(Bool, False);
export const demorganOrFalseFalseType = e(not(or(False, False)), and(not(False), not(False)));
export const demorganOrFalseFalseProof = refl(Bool, True);
export const implicationEncodingType = e(or(not(True), False), False);
export const implicationEncodingProof = refl(Bool, False);
export const implicationEncodingFalseType = e(or(not(False), True), True);
export const implicationEncodingFalseProof = refl(Bool, True);
