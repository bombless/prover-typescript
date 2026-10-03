# Nested source comments

Term parsing, declaration parsing, and `processLine` accept `/- ... -/` block
comments alongside `--` line comments. Block comments may nest and span lines:

```text
/- An identity function.
   /- The inner comment can be removed independently. -/
-/
(x : Nat) => x
```

Comments separate tokens and preserve original character positions and line
breaks in diagnostics. `--` inside a block is ordinary comment text; `/-` inside
a line comment does not open a block. An unclosed block reports its outer
opening position, and a declaration with an unclosed trailing block is not
stored. The scanner uses iteration for nested comment delimiters.

These rules apply to source terms and complete REPL command strings. The
browser proof-script runner has its own line-oriented syntax. This change does
not add multiline input collection to the interactive REPL.
