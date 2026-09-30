import { Term, Bool, True, False, variable, pi, lambda, boolRec, app, eq, refl } from '../syntax/ast';
import { boolXor } from './bool-xor';

/** XOR with False on the right is identity, proved by Boolean cases. */
export const xorRightFalseType: Term = eq(Bool, app(app(boolXor, False), False), False);
export const xorRightFalseProof: Term = refl(Bool, False);

/** XOR with True on the right is Boolean negation, by cases. */
export const xorRightTrueType: Term = eq(Bool, app(app(boolXor, False), True), True);
export const xorRightTrueProof: Term = refl(Bool, True);

/** A nested XOR expression computes after case-free reduction. */
export const xorNestedType: Term = eq(Bool, app(app(boolXor, True), app(app(boolXor, True), False)), False);
export const xorNestedProof: Term = refl(Bool, False);
