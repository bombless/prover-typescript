/** In-memory command recall. No proof text is persisted or sent anywhere. */
export class TacticInputHistory {
  private readonly commands: string[] = [];
  private index: number | null = null;
  private draft = "";

  record(command: string): void {
    if (command.trim() && command !== this.commands.at(-1)) {
      this.commands.push(command);
      if (this.commands.length > 100) this.commands.shift();
    }
    this.resetRecall();
  }

  resetRecall(): void { this.index = null; this.draft = ""; }

  previous(current: string): string | null {
    if (!this.commands.length) return null;
    if (this.index === null) {
      this.draft = current;
      this.index = this.commands.length;
    }
    this.index = Math.max(0, this.index - 1);
    return this.commands[this.index];
  }

  next(): string | null {
    if (this.index === null) return null;
    this.index += 1;
    if (this.index < this.commands.length) return this.commands[this.index];
    const result = this.draft;
    this.resetRecall();
    return result;
  }
}
