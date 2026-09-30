import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { scaleTwiceConcreteProof, scaleTwiceConcreteType, scaleSumConcreteProof, scaleSumConcreteType, nestedScaleFstProof, nestedScaleFstType } from '../src/library/geometry-scale-laws-more';

test('nested concrete scaling computes', () => check([], scaleTwiceConcreteProof, scaleTwiceConcreteType));
test('scaling a concrete sum computes', () => check([], scaleSumConcreteProof, scaleSumConcreteType));
test('nested scaling projection is kernel checked', () => check([], nestedScaleFstProof, nestedScaleFstType));
