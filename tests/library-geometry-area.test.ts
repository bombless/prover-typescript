import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { twiceArea, twiceAreaType, collinearOriginProof, collinearOriginType } from '../src/library/geometry-area';

test('triangle area and collinearity certificate are kernel checked', () => {
  check([], twiceAreaType, { kind: 'Type' });
  check([], collinearOriginProof, collinearOriginType);
});
