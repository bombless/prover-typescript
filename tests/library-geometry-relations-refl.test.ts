import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { samePointReflProof, samePointReflType } from '../src/library/geometry-relations';

test('same-point relation reflexivity is kernel checked', () => check([], samePointReflProof, samePointReflType));
