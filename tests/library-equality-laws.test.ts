import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { eqReflProof, eqReflType, eqNatThreeProof, eqNatThreeType } from '../src/library/equality-laws';

test('polymorphic equality reflexivity is kernel checked', () => check([], eqReflProof, eqReflType));
test('concrete natural equality is kernel checked', () => check([], eqNatThreeProof, eqNatThreeType));
