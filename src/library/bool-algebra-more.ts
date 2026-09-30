import { Term, Bool, True, False, app, eq, refl } from '../syntax/ast';
import { boolAnd, boolOr } from './bool-ops';
export const andOrConcreteType: Term = eq(Bool, app(app(boolOr, True), app(app(boolAnd, True), False)), True);
export const andOrConcreteProof: Term = refl(Bool, True);
export const orAndConcreteType: Term = eq(Bool, app(app(boolAnd, False), app(app(boolOr, False), True)), False);
export const orAndConcreteProof: Term = refl(Bool, False);
