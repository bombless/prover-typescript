import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { powSuccTripleProof, powSuccTripleType, powSuccTwiceProof, powSuccTwiceType } from '../src/library/pow-succ';

test('double successor power law is kernel checked', () => check([], powSuccTwiceProof, powSuccTwiceType));
test('triple successor power law is kernel checked', () => check([], powSuccTripleProof, powSuccTripleType));
