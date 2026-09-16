import { check, infer, show } from '../kernel/typecheck';
import { definitionalEqual, shift, whnf } from '../kernel/reduction';
import { Term, app, lambda, refl, variable } from '../syntax/ast';
import { Context, Goal, GoalId, ProofState, goal, proofState } from './state';
import { MetaContext } from './metavariable/meta';
import { UnificationError, UnificationTerm, substituteUnification, toCoreTerm, unify } from './unification';

export class TacticError extends Error {
  constructor(message: string) { super(message); this.name = 'TacticError'; }
}

type ProofNode =
  | { readonly kind: 'hole'; readonly id: GoalId }
  | { readonly kind: 'term'; readonly term: Term; readonly depth: number }
  | { readonly kind: 'lambda'; readonly domain: Term; readonly name?: string; readonly body: ProofNode }
  | { readonly kind: 'app'; readonly fn: ProofNode; readonly arg: ProofNode };

interface Hole { readonly id: GoalId; readonly goal: Goal; readonly depth: number; }

type ProofStateInput = ProofState | { readonly goals: readonly Goal[]; readonly focusedGoalId?: GoalId | null };

function contextTypes(context: Context): readonly Term[] { return context.map((entry) => entry.type); }

function replaceNode(root: ProofNode, id: GoalId, replacement: ProofNode): ProofNode {
  if (root.kind === 'hole') return root.id === id ? replacement : root;
  if (root.kind === 'term') return root;
  if (root.kind === 'lambda') return { ...root, body: replaceNode(root.body, id, replacement) };
  return { kind: 'app', fn: replaceNode(root.fn, id, replacement), arg: replaceNode(root.arg, id, replacement) };
}

function compile(root: ProofNode, depth = 0): Term {
  switch (root.kind) {
    case 'hole': throw new TacticError(`Unsolved proof goal #${root.id}`);
    case 'term': return shift(root.term, depth - root.depth);
    case 'lambda': return lambda(root.domain, compile(root.body, depth + 1), root.name);
    case 'app': return app(compile(root.fn, depth), compile(root.arg, depth));
  }
}

export class TacticSession {
  readonly state: ProofState;
  private readonly root: ProofNode;
  private readonly holes: readonly Hole[];
  private readonly rootContext: Context;

  private constructor(state: ProofState, root: ProofNode, holes: readonly Hole[], rootContext: Context) {
    this.state = state; this.root = root; this.holes = holes; this.rootContext = rootContext;
  }

  static fromState(input: ProofStateInput): TacticSession {
    const state = proofState(input.goals, input.focusedGoalId);
    if (state.goals.length !== 1) throw new TacticError('A tactic session must start from one root goal');
    const rootGoal = state.goals[0];
    const hole = { id: rootGoal.id!, goal: rootGoal, depth: 0 };
    return new TacticSession(state, { kind: 'hole', id: hole.id }, [hole], hole.goal.context);
  }

  currentGoal(): Goal | undefined { return this.state.goals.find(item => item.id === this.state.focusedGoalId); }

  focusGoal(id: GoalId): TacticSession {
    if (!this.holes.some(hole => hole.id === id)) throw new TacticError(`Goal id not found: ${id}`);
    return new TacticSession(proofState(this.holes.map(hole => hole.goal), id), this.root, this.holes, this.rootContext);
  }

  next(): TacticSession {
    if (this.holes.length === 0) return this;
    const index = this.holes.findIndex(hole => hole.id === this.state.focusedGoalId);
    if (index < 0) throw new TacticError('Focused goal does not exist');
    return this.focusGoal(this.holes[(index + 1) % this.holes.length].id);
  }

  previous(): TacticSession {
    if (this.holes.length === 0) return this;
    const index = this.holes.findIndex(hole => hole.id === this.state.focusedGoalId);
    if (index < 0) throw new TacticError('Focused goal does not exist');
    return this.focusGoal(this.holes[(index - 1 + this.holes.length) % this.holes.length].id);
  }

  intro(): TacticSession {
    const hole = this.firstHole();
    const type = whnf(hole.goal.type);
    if (type.kind !== 'Pi') throw new TacticError(`intro expected a function goal, found ${show(type)}`);
    const newGoal = goal([...hole.goal.context, { name: type.name ?? 'x', type: type.domain }], type.body, hole.goal.caseName);
    const child = { id: newGoal.id!, goal: newGoal, depth: hole.depth + 1 };
    const root = replaceNode(this.root, hole.id, { kind: 'lambda', domain: type.domain, name: type.name, body: { kind: 'hole', id: child.id } });
    return this.withReplacement(hole.id, [child], root);
  }

  exact(term: Term): TacticSession {
    const hole = this.firstHole();
    try { check(contextTypes(hole.goal.context), term, hole.goal.type); }
    catch (error) { throw new TacticError(error instanceof Error ? error.message : String(error)); }
    const root = replaceNode(this.root, hole.id, { kind: 'term', term, depth: hole.depth });
    return this.withReplacement(hole.id, [], root);
  }

  solveCurrentGoal(term: Term): TacticSession { return this.exact(term); }

  rfl(): TacticSession {
    const hole = this.firstHole();
    const type = whnf(hole.goal.type);
    if (type.kind !== 'Eq') throw new TacticError(`rfl expected an equality goal, found ${show(type)}`);
    if (!definitionalEqual(type.left, type.right)) throw new TacticError(`rfl requires definitionally equal endpoints: ${show(type.left)} and ${show(type.right)}`);
    return this.exact(refl(type.type, type.left));
  }

  assumption(): TacticSession {
    const hole = this.firstHole();
    for (let index = hole.goal.context.length - 1; index >= 0; index--) {
      const entry = hole.goal.context[index];
      const entryType = shift(entry.type, hole.goal.context.length - index);
      if (definitionalEqual(entryType, hole.goal.type)) return this.exact(variable(hole.goal.context.length - 1 - index, entry.name));
    }
    throw new TacticError(`assumption found no local hypothesis matching ${show(hole.goal.type)}`);
  }

  apply(term: Term): TacticSession {
    const hole = this.firstHole();
    let currentType: Term;
    try { currentType = whnf(infer(contextTypes(hole.goal.context), term)); }
    catch (error) { throw new TacticError(error instanceof Error ? error.message : String(error)); }

    let metaContext = MetaContext.empty();
    const argumentsForProof: Array<{ readonly type: UnificationTerm; readonly meta: UnificationTerm; readonly implicit: boolean }> = [];
    while (currentType.kind === 'Pi') {
      const created = metaContext.create(hole.goal.context.length, currentType.domain);
      metaContext = created.context;
      argumentsForProof.push({ type: currentType.domain, meta: created.term, implicit: currentType.implicit === true });
      currentType = whnf(substituteUnification(currentType.body, created.term) as Term);
    }
    if (argumentsForProof.length === 0) throw new TacticError(`apply expected a function, found ${show(currentType)}`);

    try { metaContext = unify(currentType, hole.goal.type, metaContext); }
    catch (error) {
      if (error instanceof UnificationError) throw new TacticError(error.message);
      throw new TacticError(error instanceof Error ? error.message : String(error));
    }

    const childHoles: Hole[] = [];
    const argumentNodes: ProofNode[] = [];
    for (const argument of argumentsForProof) {
      const resolved = metaContext.resolve((argument.meta as { kind: 'meta'; id: number }).id);
      if (resolved.kind === 'term') {
        argumentNodes.push({ kind: 'term', term: resolved.term, depth: hole.depth });
      } else if (argument.implicit) {
        throw new TacticError(`Could not infer implicit argument ?m${resolved.id}`);
      } else {
        let childType: Term;
        try { childType = toCoreTerm(argument.type, metaContext); }
        catch (error) { throw new TacticError(error instanceof Error ? error.message : String(error)); }
        const childGoal = goal(hole.goal.context, childType);
        const child = { id: childGoal.id!, goal: childGoal, depth: hole.depth };
        childHoles.push(child);
        argumentNodes.push({ kind: 'hole', id: child.id });
      }
    }

    let node: ProofNode = { kind: 'term', term, depth: hole.depth };
    for (const argumentNode of argumentNodes) node = { kind: 'app', fn: node, arg: argumentNode };
    return this.withReplacement(hole.id, childHoles, replaceNode(this.root, hole.id, node));
  }

  proof(): Term {
    if (this.holes.length !== 0) throw new TacticError(`Cannot extract proof: ${this.holes.length} goal(s) remain`);
    const result = compile(this.root);
    infer(contextTypes(this.rootContext), result);
    return result;
  }

  private firstHole(): Hole {
    const hole = this.holes.find(item => item.id === this.state.focusedGoalId);
    if (!hole) throw new TacticError('No goals remain');
    return hole;
  }

  private withReplacement(id: GoalId, replacements: readonly Hole[], root: ProofNode): TacticSession {
    const index = this.holes.findIndex((hole) => hole.id === id);
    if (index < 0) throw new TacticError(`Unknown goal #${id}`);
    const holes = [...this.holes.slice(0, index), ...replacements, ...this.holes.slice(index + 1)];
    const focus = replacements[0]?.id ?? holes[index]?.id ?? holes[index - 1]?.id ?? null;
    return new TacticSession(proofState(holes.map((hole) => hole.goal), focus), root, holes, this.rootContext);
  }
}

export function tacticSession(state: ProofStateInput): TacticSession { return TacticSession.fromState(state); }
