# Goal identity validation

A `GoalId` is a non-negative JavaScript safe integer. `goal` validates explicit identities, and `proofState` validates all supplied identities and any explicit focus before committing any reserved or allocated IDs. Normalization stages its counter locally; a missing focus or allocation failure leaves the global counter unchanged. In particular, `Infinity`, `NaN`, negative values, fractions and unsafe integers are rejected with `RangeError`.

This prevents one malformed API input from poisoning the shared allocator and giving every later goal the same identity. Valid explicit IDs are still reserved before missing or duplicate IDs are allocated, as in the explicit-reservation prerequisite.

If `Number.MAX_SAFE_INTEGER` is reserved or allocated, subsequent automatic allocation throws `Goal ID space exhausted`. The allocator never wraps or emits an unsafe or repeated automatic identity. Existing explicit goals can still be represented without automatic allocation. Exhaustion tests run in isolated processes so they cannot affect other test cases.
