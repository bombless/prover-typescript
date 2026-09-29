# Splitting an equality proof

`TacticSession.transitivity(middle)` replaces a focused `Eq A left right` goal with two goals, in order: `Eq A left middle` and `Eq A middle right`. This supports explicit chains of known equalities without manually constructing an `Eq.rec` motive.

```ts
const target = eq(Nat, Zero, Zero);
const proof = tacticSession(initialProofState(target))
  .transitivity(Zero)
  .rfl()
  .rfl()
  .proof();
check([], proof, target);
```

The middle term is checked against `A` in the local context before any goals are allocated. Both branches retain the original context and case label. They can be focused and solved in either order, and splitting one branch preserves other pending goals. The generated proof uses only existing Core `EqRec`; the Kernel remains unchanged. This is an explicit Core API tactic, without midpoint search or new browser/REPL syntax.
