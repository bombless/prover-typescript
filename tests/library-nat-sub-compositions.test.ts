import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { subConcreteProof, subConcreteType, subUnderflowProof, subUnderflowType, subPredConcreteProof, subPredConcreteType, subThreeConcreteProof, subThreeConcreteType, subZeroConcreteProof, subZeroConcreteType, subSuccSuccProof, subSuccSuccType } from '../src/library/nat-sub-compositions';

test('closed truncated subtraction computes', () => check([], subConcreteProof, subConcreteType));
test('truncated subtraction underflow computes to zero', () => check([], subUnderflowProof, subUnderflowType));
test('subtraction by one computes as predecessor', () => check([], subPredConcreteProof, subPredConcreteType));
test('subtraction by three computes', () => check([], subThreeConcreteProof, subThreeConcreteType));
test('subtraction by zero computes', () => check([], subZeroConcreteProof, subZeroConcreteType));
test('successor subtraction exposes predecessor', () => check([], subSuccSuccProof, subSuccSuccType));
