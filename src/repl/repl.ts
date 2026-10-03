import readline from 'node:readline';
import { elaborate } from '../elaborator/elaborate';
import { check, infer, show } from '../kernel/typecheck';
import { GlobalEnvironment, Environment } from '../environment/environment';
import { parseCommand } from '../parser/command';
import { scanComments, stripComments } from '../parser/parser';
import { ProofState } from '../proof/state';

export const EXIT_COMMAND = 'exit';

export function formatProofState(state: ProofState): string {
  if (state.goals.length === 0) return 'No goals.\nProof complete.';
  return ['Goals:', ...state.goals.map((goal, index) => {
    const focused = goal.id === state.focusedGoalId ? '▶ ' : '  ';
    const header = `${focused}Goal ${index + 1}${goal.caseName ? ` (${goal.caseName})` : ''}`;
    const context = goal.context.map(entry => `  ${entry.name} : ${show(entry.type)}`);
    return [header, ...context, `  ⊢ ${show(goal.type)}`].join('\n');
  })].join('\n\n');
}
export function processLine(input: string, environment: Environment = new GlobalEnvironment()): string | null {
  const line = stripComments(input).trim();
  if (line === '') return '';
  if (line === EXIT_COMMAND) return null;
  const command = parseCommand(line);
  if (command.kind === 'term') {
    const core = elaborate(command.term, [], environment);
    return show(infer([], core));
  }
  if (command.kind === 'theorem') {
    const proposition = elaborate(command.proposition, [], environment);
    const proof = elaborate(command.proof, [], environment);
    infer([], proposition);
    check([], proof, proposition);
    environment.define(command.name, proof);
    return `theorem ${command.name}`;
  }
  const core = elaborate(command.term, [], environment);
  infer([], core);
  environment.define(command.name, core);
  return `defined ${command.name}`;
}

export async function startRepl(
  input: NodeJS.ReadableStream = process.stdin,
  output: NodeJS.WritableStream = process.stdout,
  options: { readonly interactive?: boolean } = {},
): Promise<void> {
  const terminal = Boolean(
    (input as NodeJS.ReadableStream & { isTTY?: boolean }).isTTY
    && (output as NodeJS.WritableStream & { isTTY?: boolean }).isTTY,
  );
  const interactive = options.interactive ?? terminal;
  const rl = readline.createInterface({ input, output, terminal: terminal && interactive, prompt: '> ' });
  const environment = new GlobalEnvironment();
  let closed = false;
  rl.on('close', () => { closed = true; });
  try {
    if (interactive) {
      output.write('prover-typescript REPL\n');
      rl.prompt();
    }
    let pending = '';
    const runCommand = (source: string): boolean => {
      try {
        const result = processLine(source, environment);
        if (result === null) return false;
        if (result !== '') output.write(`${result}\n`);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const kind = error instanceof Error ? error.name : 'Error';
        output.write(`Error [${kind}]: ${message}\n`);
      }
      return true;
    };
    for await (const line of rl) {
      // A bare exit line also lets a user leave an unfinished command/comment.
      if (line.trim() === EXIT_COMMAND) { rl.close(); return; }
      const source = pending === '' ? line : `${pending}\n${line}`;
      const comments = scanComments(source);
      let parentheses = 0;
      let unmatchedCloser = false;
      for (const char of comments.source) {
        if (char === '(') parentheses += 1;
        if (char === ')' && --parentheses < 0) { unmatchedCloser = true; break; }
      }
      if (!unmatchedCloser && (parentheses > 0 || comments.openBlockPosition !== undefined)) {
        pending = source;
      } else {
        // Clear before evaluation so a rejected command cannot capture the next line.
        pending = '';
        if (!runCommand(source)) { rl.close(); return; }
      }
      // Drain queued lines after EOF; only the next prompt requires open input.
      if (!closed && interactive) {
        rl.setPrompt(pending === '' ? '> ' : '... ');
        rl.prompt();
      }
    }
    // Strict parsing supplies the normal positioned diagnostic for incomplete input.
    if (pending !== '') runCommand(pending);
  } finally {
    rl.close();
  }
}
