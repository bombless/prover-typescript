import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as b from '../src/library/bool-parametric-laws-more-2';
test('parametric Boolean idempotence laws are kernel checked', () => {
  check([], b.andIdempotentProof, b.andIdempotentType);
  check([], b.orIdempotentProof, b.orIdempotentType);
  check([], b.notAndSelfProof, b.notAndSelfType);
});
