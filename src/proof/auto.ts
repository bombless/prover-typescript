import { definitionalEqual, shift, whnf } from '../kernel/reduction';
import { Bool, Empty, Nat, True, Zero, emptyRec, lambda, variable } from '../syntax/ast';
import { TacticError, TacticSession } from './tactic';

export function auto(session: TacticSession): TacticSession {
  let current = session;
  for (let step = 0; step < 128; step += 1) {
    const g = current.currentGoal();
    if (!g) return current;
    const target = whnf(g.type);
    if (target.kind === 'Pi') { current = current.intro(); continue; }
    if (target.kind === 'Prod') { current = current.constructorPair(); continue; }
    if (target.kind === 'Nat' && g.context.some(e => e.name === 'useSucc')) {
      current = current.constructorSucc();
      const child = current.currentGoal();
      if (child) { const i = g.context.findIndex(e => e.name === 'useSucc'); current = current.exact(variable(g.context.length - 1 - i, g.context[i].name)); }
      continue;
    }
    if (target.kind === 'Eq' && definitionalEqual(target.left, target.right)) { current = current.rfl(); continue; }
    let contradiction = false;
    for (let i = g.context.length - 1; i >= 0; i -= 1) {
      if (definitionalEqual(g.context[i].type, Empty)) {
        const idx = g.context.length - 1 - i;
        current = current.exact(emptyRec(lambda(Empty, shift(target, 1)), variable(idx, g.context[i].name)));
        contradiction = true; break;
      }
    }
    if (contradiction) continue;
    try { current = current.assumption(); continue; } catch {}
    let applied = false;
    for (let i = g.context.length - 1; i >= 0 && !applied; i -= 1) {
      try { current = current.apply(variable(g.context.length - 1 - i, g.context[i].name)); applied = true; } catch {}
    }
    if (applied) continue;
    if (target.kind === 'Nat') { current = current.constructorZero(); continue; }
    if (target.kind === 'Type') { current = current.exact({ kind: 'Type' }); continue; }
    if (target.kind === 'Bool') { current = current.constructorTrue(); continue; }
    throw new TacticError('auto cannot construct a term for the current goal');
  }
  throw new TacticError('auto exceeded its step limit');
}
