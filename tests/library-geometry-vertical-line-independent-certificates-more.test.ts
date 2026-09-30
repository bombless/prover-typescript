import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { pointOnVerticalFourType, pointOnVerticalFourProof, pointOnVerticalSevenType, pointOnVerticalSevenProof, originOnVerticalZeroType, originOnVerticalZeroProof } from '../src/library/geometry-vertical-line-independent-certificates-more';

test('vertical line x=4 checks', () => check([], pointOnVerticalFourProof, pointOnVerticalFourType));
test('vertical line x=7 checks', () => check([], pointOnVerticalSevenProof, pointOnVerticalSevenType));
test('vertical line x=0 at origin checks', () => check([], originOnVerticalZeroProof, originOnVerticalZeroType));
