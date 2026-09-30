import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { pred, predType, predZeroProof, predZeroType, predSuccProof, predSuccType } from '../src/library/pred';

test('predecessor has the expected type and equations', () => {
  check([], pred, predType);
  check([], predZeroProof, predZeroType);
  check([], predSuccProof, predSuccType);
});
