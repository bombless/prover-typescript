import { Term, Bool, True, False, app, eq, refl } from '../syntax/ast';
import { boolXor } from './bool-xor';
import { boolAnd, boolOr } from './bool-ops';
const e=(a:Term,b:Term):Term=>eq(Bool,a,b);
export const xorFalseTrueType=e(app(app(boolXor,False),True),True); export const xorFalseTrueProof=refl(Bool,True);
export const xorTrueFalseType=e(app(app(boolXor,True),False),True); export const xorTrueFalseProof=refl(Bool,True);
export const xorFalseFalseType=e(app(app(boolXor,False),False),False); export const xorFalseFalseProof=refl(Bool,False);
export const xorTrueTrueType=e(app(app(boolXor,True),True),False); export const xorTrueTrueProof=refl(Bool,False);
export const xorMixedChainType=e(app(app(boolXor,app(app(boolAnd,True),False)),app(app(boolOr,False),True)),True); export const xorMixedChainProof=refl(Bool,True);
