# Changing the presentation of a goal

`TacticSession.change(target)` replaces the focused goal's displayed Core type with a definitionally equal type. This lets API clients expose a beta-reduced target or a more useful equivalent expression before continuing a proof.

```ts
const target = eq(Nat, addTerm(Zero, Zero), Zero);
const proof = tacticSession(initialProofState(target))
  .change(eq(Nat, Zero, Zero))
  .rfl()
  .proof();
check([], proof, target);
```

The replacement must itself check as `Type` in the current context. The method keeps the goal ID, local bindings, case label and sibling goals. Failure leaves the immutable session unchanged. It does not prove a new equality, rewrite with hypotheses or extend Kernel conversion. This API addition does not add a browser or REPL command.
