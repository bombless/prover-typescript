import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { predSuccSuccProof, predSuccSuccType, predSuccTripleProof, predSuccTripleType } from '../src/library/pred';

test('predecessor of double successor is kernel checked', () => check([], predSuccSuccProof, predSuccSuccType));
test('predecessor of triple successor is kernel checked', () => check([], predSuccTripleProof, predSuccTripleType));
