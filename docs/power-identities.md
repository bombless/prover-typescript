# Natural power identities

`src/library/pow-identities.ts` exports closed Core proofs and application builders for these laws:

| Builder | Equality |
| --- | --- |
| `powZero(n)` | `n^0 = 1` |
| `powSucc(n, k)` | `n^(k+1) = n * n^k` |
| `powOne(n)` | `n^1 = n` |
| `onePow(k)` | `1^k = 1` |
| `zeroPowSucc(k)` | `0^(k+1) = 0` |

Each builder has matching `Type` and `Proof` exports, for example `onePowType` and `onePowProof`. The quantified arguments range over arbitrary natural numbers. Check a constructed proof with the Kernel in the caller's local context; the builders do not validate arguments eagerly.

The zero-exponent equation follows the existing total natural-number definition, including `0^0 = 1`. The zero-base law is explicitly restricted to positive exponents. Unit laws reuse the multiplication identity library and natural induction. No axioms, new Kernel rules, frontend aliases, or exponent-addition theorem are introduced.
