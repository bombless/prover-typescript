import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { twiceAreaZeroProof, twiceAreaZeroType } from '../src/library/geometry-area';

test('discrete area zero law is kernel checked', () => check([], twiceAreaZeroProof, twiceAreaZeroType));
