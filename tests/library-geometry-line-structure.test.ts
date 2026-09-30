import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { lineBaseProof, lineBaseType, lineDirectionProof, lineDirectionType } from '../src/library/geometry-line';

test('line base and direction projections are kernel checked', () => {
  check([], lineBaseProof, lineBaseType);
  check([], lineDirectionProof, lineDirectionType);
});
