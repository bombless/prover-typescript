import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translateZeroProof, translateZeroType } from '../src/library/geometry-transform';

test('translation by zero preserves every point', () => check([], translateZeroProof, translateZeroType));
