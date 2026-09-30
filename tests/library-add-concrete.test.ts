import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { addCommConcreteProof, addCommConcreteType, addAssocConcreteProof, addAssocConcreteType } from '../src/library/add-comm-concrete';

test('concrete addition commutativity and associativity are checked', () => {
  check([], addCommConcreteProof, addCommConcreteType);
  check([], addAssocConcreteProof, addAssocConcreteType);
});
