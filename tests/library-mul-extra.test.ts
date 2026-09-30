import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { mulSuccTripleProof, mulSuccTripleType, mulSuccTwiceProof, mulSuccTwiceType } from '../src/library/mul-succ';

test('double successor multiplication law is kernel checked', () => check([], mulSuccTwiceProof, mulSuccTwiceType));
test('triple successor multiplication law is kernel checked', () => check([], mulSuccTripleProof, mulSuccTripleType));
