import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { fstPairProof, fstPairType, sndPairProof, sndPairType } from '../src/library/product-laws';

test('generic first projection law is kernel checked', () => check([], fstPairProof, fstPairType));
test('generic second projection law is kernel checked', () => check([], sndPairProof, sndPairType));
