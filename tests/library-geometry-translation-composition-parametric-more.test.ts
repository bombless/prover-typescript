import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translateTwiceFstProof, translateTwiceFstType, translateTwiceSndProof, translateTwiceSndType, translateTwiceZeroProof, translateTwiceZeroType } from '../src/library/geometry-translation-composition-parametric-more';

test('two translations expose first-coordinate sum', () => check([], translateTwiceFstProof, translateTwiceFstType));
test('two translations expose second-coordinate sum', () => check([], translateTwiceSndProof, translateTwiceSndType));
test('two zero translations preserve a point', () => check([], translateTwiceZeroProof, translateTwiceZeroType));
