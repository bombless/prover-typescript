import { Term, Nat, prod, pair, fst, snd, eq, refl } from '../syntax/ast';
const Point: Term = prod(Nat, Nat);
const p = pair({ kind: 'Zero' }, { kind: 'Succ', value: { kind: 'Zero' } });
export const concretePairFstType: Term = eq(Nat, fst(p), { kind: 'Zero' });
export const concretePairFstProof: Term = refl(Nat, { kind: 'Zero' });
export const concretePairSndType: Term = eq(Nat, snd(p), { kind: 'Succ', value: { kind: 'Zero' } });
export const concretePairSndProof: Term = refl(Nat, { kind: 'Succ', value: { kind: 'Zero' } });
export const concretePairEtaType: Term = eq(Point, pair(fst(p), snd(p)), p);
export const concretePairEtaProof: Term = refl(Point, p);
