# REPL output in terminals and pipes

The REPL displays its greeting and `> ` prompt only when both input and output are terminals. Piped input and redirected output contain only command results or errors, making them suitable for scripts and saved transcripts.

```sh
printf 'Nat\n' | node dist/src/index.js
# Type
```

Embedders can use `startRepl(input, output, { interactive: true })` to request the greeting and prompts on custom streams, or `{ interactive: false }` to suppress terminal formatting explicitly. This option controls output presentation; it does not change command syntax or environment lifetime.
