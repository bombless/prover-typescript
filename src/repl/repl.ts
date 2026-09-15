import readline from 'node:readline';
import { elaborate } from '../elaborator/elaborate';
import { infer, show } from '../kernel/typecheck';
import { GlobalEnvironment, Environment } from '../environment/environment';
import { parseCommand } from '../parser/command';

export const EXIT_COMMAND = 'exit';

export function processLine(input: string, environment: Environment = new GlobalEnvironment()): string | null {
  const line = input.trim();
  if (line === '') return '';
  if (line === EXIT_COMMAND) return null;
  const command = parseCommand(line);
  if (command.kind === 'term') {
    const core = elaborate(command.term, [], environment);
    return show(infer([], core));
  }
  const core = elaborate(command.term, [], environment);
  infer([], core);
  environment.define(command.name, core);
  return `defined ${command.name}`;
}

export async function startRepl(
  input: NodeJS.ReadableStream = process.stdin,
  output: NodeJS.WritableStream = process.stdout,
): Promise<void> {
  const rl = readline.createInterface({ input, output, prompt: '> ' });
  const environment = new GlobalEnvironment();
  let closed = false;
  rl.on('close', () => { closed = true; });
  output.write('prover-typescript REPL\n');
  rl.prompt();
  for await (const line of rl) {
    try {
      const result = processLine(line, environment);
      if (result === null) { rl.close(); return; }
      if (result !== '') output.write(`${result}\n`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const kind = error instanceof Error ? error.name : 'Error';
      output.write(`Error [${kind}]: ${message}\n`);
    }
    if (closed) break;
    rl.prompt();
  }
}
