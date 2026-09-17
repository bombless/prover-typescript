type Group = {
  open: number;
  close: number;
  children: Array<Group | TextNode>;
};

type TextNode = {
  text: string;
};

export function renderBracketedExpression(source: string): string {
  const escape = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const pairs = new Map<number, { pair: number; color: number }>();
  const stack: Array<{ char: "(" | "{"; index: number; color: number }> = [];
  const matching: Record<"(" | "{", ")" | "}"> = { "(": ")", "{": "}" };

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (char === "(" || char === "{") {
      stack.push({ char, index, color: stack.length % 6 });
      continue;
    }
    if (char !== ")" && char !== "}") continue;
    const opener = stack[stack.length - 1];
    if (!opener || matching[opener.char] !== char) continue;
    stack.pop();
    pairs.set(opener.index, { pair: index, color: opener.color });
    pairs.set(index, { pair: opener.index, color: opener.color });
  }

  const parse = (start: number, end: number): Array<Group | TextNode> => {
    const children: Array<Group | TextNode> = [];
    let textStart = start;
    let index = start;
    while (index < end) {
      if (source[index] === "(" || source[index] === "{") {
        const match = pairs.get(index);
        if (match && match.pair < end) {
          if (textStart < index) children.push({ text: source.slice(textStart, index) });
          children.push({ open: index, close: match.pair, children: parse(index + 1, match.pair) });
          index = match.pair + 1;
          textStart = index;
          continue;
        }
      }
      index += 1;
    }
    if (textStart < end) children.push({ text: source.slice(textStart, end) });
    return children;
  };

  const root = parse(0, source.length);
  const hasNestedGroup = (group: Group): boolean =>
    group.children.some((child) => "open" in child);

  const bracket = (index: number): string => {
    const match = pairs.get(index);
    if (!match) return escape(source[index]);
    const side = source[index] === "(" || source[index] === "{" ? "bracket-open" : "bracket-close";
    return `<span class="bracket-pair bracket-color-${match.color} ${side}" data-matching-index="${match.pair}">${escape(source[index])}</span>`;
  };

  const appendText = (lines: string[], text: string, indent: number): void => {
    const normalized = text.replace(/[ \t\r\n]+/g, " ").trim();
    if (!normalized) return;
    if (!lines.length) lines.push(" ".repeat(indent) + escape(normalized));
    else lines[lines.length - 1] += (lines[lines.length - 1].trim() ? " " : "") + escape(normalized);
  };

  const renderChildren = (children: Array<Group | TextNode>, indent: number): string[] => {
    const lines: string[] = [];
    let lineEnded = false;

    for (const child of children) {
      if ("text" in child) {
        const normalized = child.text.replace(/[ \t\r\n]+/g, " ").trim();
        if (!normalized) continue;
        if (lineEnded) {
          lines.push(" ".repeat(indent) + escape(normalized));
          lineEnded = false;
        } else {
          appendText(lines, normalized, indent);
        }
        continue;
      }

      const open = bracket(child.open);
      const close = bracket(child.close);

      if (!hasNestedGroup(child)) {
        lines.push(" ".repeat(indent) + open + escape(source.slice(child.open + 1, child.close)) + close);
        lineEnded = true;
        continue;
      }

      // A group containing another group becomes a block. Its opener/closer
      // stay at the current group's indentation; everything inside moves in
      // by two spaces. Nested blocks recursively apply the same rule.
      lines.push(" ".repeat(indent) + open);
      lines.push(...renderChildren(child.children, indent + 2));
      lines.push(" ".repeat(indent) + close);
      lineEnded = true;
    }

    return lines;
  };

  const lines = renderChildren(root, 0);
  const rootGroups = root.filter((child): child is Group => "open" in child);
  const hasMultilineGroup = rootGroups.some((group) => hasNestedGroup(group));
  const needsTrailingNewline = hasMultilineGroup || rootGroups.length > 1;
  return lines.join("\n") + (needsTrailingNewline ? "\n" : "");
}
