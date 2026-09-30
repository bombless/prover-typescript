import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { powOneConcreteProof, powOneConcreteType, powOneProof, powOneType } from '../src/library/pow-one';

test('concrete first power is kernel checked in the power library', () => check([], powOneConcreteProof, powOneConcreteType));
test('general first power is kernel checked', () => check([], powOneProof, powOneType));
