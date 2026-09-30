import { Term, Nat, Zero, variable, pi, lambda, succ, eq, refl, app } from '../syntax/ast';
import { powTerm } from './pow';
import { mulOneProof } from './mul-one';
import { mulTerm } from './mul';

/** n^1 = n, obtained by unfolding pow and applying n * 1 = n. */
export const powOneType: Term = pi(Nat, eq(Nat, powTerm(variable(0), succ(Zero)), variable(0)), 'n');
export const powOneProof: Term = lambda(Nat, app(mulOneProof, variable(0)), 'n');

/** n^1 = n: the recursive definition gives n * 1, while this theorem uses a
 * closed witness for the common concrete case. */
export const powOneConcreteType: Term = eq(Nat, powTerm({ kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: Zero } } }, succ(Zero)), { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: Zero } } });
export const powOneConcreteProof: Term = refl(Nat, { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: Zero } } });
