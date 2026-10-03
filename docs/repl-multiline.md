# Multiline REPL commands

The REPL collects another line while a command has an open parenthesis or an
unfinished `/- ... -/` comment. Wrap a long term in parentheses to continue it:

```text
def id := (
  (x : Nat) =>
  x
)
id 0
```

The first command stores `id` once, and the second reports `Nat`. The same input
works in a pipe or redirected file. Interactive input shows `... ` while waiting
and returns to `> ` after a complete or rejected command. Batch output keeps its
existing prompt-free format.

The collector ignores parentheses inside comments and recognizes nested block
comments across lines. An unmatched closing parenthesis submits the command for
an immediate diagnostic. EOF reports one error for remaining incomplete input;
a rejected complete command does not consume the following command. A bare
`exit` line always leaves the REPL, including while a command or comment remains
open. This bare-line escape takes precedence over unfinished comment content.

Continuation is based on open delimiters: a balanced line ending in `:=` or an
arrow is not automatically continued. Put an opening parenthesis on that line.
`processLine` still accepts one complete command string; this change affects
input collection in `startRepl`, not the browser proof-script runner.
