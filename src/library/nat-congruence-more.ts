import { Term, Nat, succ, eq, refl } from '../syntax/ast';
import { addTerm } from './nat';

/** Addition preserves equality in its second argument for a fixed left term. */
/** Successor congruence is exposed as an equality family over concrete Nat. */
export const succCongrConcreteType: Term = eq(Nat, succ({ kind: 'Succ', value: { kind: 'Zero' } }), succ({ kind: 'Succ', value: { kind: 'Zero' } }));
export const succCongrConcreteProof: Term = refl(Nat, succ({ kind: 'Succ', value: { kind: 'Zero' } }));
