import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { natEqSymmProof, natEqSymmType, natEqSymmZeroProof, natEqSymmZeroType } from '../src/library/nat-equality';

test('Nat equality symmetry is kernel checked', () => check([], natEqSymmProof, natEqSymmType));
test('Nat equality symmetry has a closed reflexive instance', () => check([], natEqSymmZeroProof, natEqSymmZeroType));
