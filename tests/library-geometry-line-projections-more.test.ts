import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { lineConcreteBaseProof, lineConcreteBaseType, lineConcreteDirectionProof, lineConcreteDirectionType } from '../src/library/geometry-line';
test('concrete line base and direction projections are kernel checked', () => {
  check([], lineConcreteBaseProof, lineConcreteBaseType);
  check([], lineConcreteDirectionProof, lineConcreteDirectionType);
});
