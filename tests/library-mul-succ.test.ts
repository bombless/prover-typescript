import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { mulSuccProof, mulSuccType, mulSuccTwiceProof, mulSuccTwiceType, mulSuccTripleProof, mulSuccTripleType, mulSuccQuadProof, mulSuccQuadType } from '../src/library/mul-succ';

test('multiplication successor expansion laws are kernel checked', () => {
  check([], mulSuccProof, mulSuccType);
  check([], mulSuccTwiceProof, mulSuccTwiceType);
  check([], mulSuccTripleProof, mulSuccTripleType);
  check([], mulSuccQuadProof, mulSuccQuadType);
});
