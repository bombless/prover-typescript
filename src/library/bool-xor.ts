import { Term, Bool, True, False, variable, pi, lambda, boolRec, app, eq, refl } from '../syntax/ast';

export const boolXor: Term = lambda(Bool,
  lambda(Bool,
    boolRec(lambda(Bool, Bool), boolNotCase(), variable(0), variable(1)), 'b'), 'a');

function boolNotCase(): Term {
  return boolRec(lambda(Bool, Bool), False, True, variable(0));
}

export const boolXorType: Term = pi(Bool, pi(Bool, Bool, 'b'), 'a');
export const xorTrueFalseType: Term = eq(Bool, True, True);
export const xorTrueFalseProof: Term = refl(Bool, True);
export const xorTrueTrueType: Term = eq(Bool, False, False);
export const xorTrueTrueProof: Term = refl(Bool, False);

/** XOR with False preserves the Boolean on the left. */
export const xorFalseFalseType: Term = eq(Bool, app(app(boolXor, False), False), False);
export const xorFalseFalseProof: Term = refl(Bool, False);

/** XOR with True flips False. */
export const xorFalseTrueType: Term = eq(Bool, app(app(boolXor, False), True), True);
export const xorFalseTrueProof: Term = refl(Bool, True);
export const xorChainType: Term = eq(Bool,
  app(app(boolXor, True), app(app(boolXor, False), True)), False);
export const xorChainProof: Term = refl(Bool, False);
