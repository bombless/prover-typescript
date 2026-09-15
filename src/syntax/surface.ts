export type SurfaceTerm =
  | SurfaceVar
  | SurfaceSort
  | SurfacePi
  | SurfaceLambda
  | SurfaceApp
  | SurfaceNat
  | SurfaceZero
  | SurfaceSucc
  | SurfaceNatRec
  | SurfaceEq
  | SurfaceRefl
  | SurfaceEqRec;

export interface SurfaceVar {
  readonly kind: 'Var';
  readonly name: string;
}

export interface SurfaceSort {
  readonly kind: 'Sort';
}

export interface SurfacePi {
  readonly kind: 'Pi';
  readonly name: string;
  readonly domain: SurfaceTerm;
  readonly body: SurfaceTerm;
}

export interface SurfaceLambda {
  readonly kind: 'Lambda';
  readonly name: string;
  readonly domain: SurfaceTerm;
  readonly body: SurfaceTerm;
}

export interface SurfaceApp {
  readonly kind: 'App';
  readonly fn: SurfaceTerm;
  readonly arg: SurfaceTerm;
}

export interface SurfaceNat {
  readonly kind: 'Nat';
}

export interface SurfaceZero {
  readonly kind: 'Zero';
}

export interface SurfaceSucc {
  readonly kind: 'Succ';
  readonly value: SurfaceTerm;
}

export interface SurfaceNatRec {
  readonly kind: 'NatRec';
  readonly motive: SurfaceTerm;
  readonly zeroCase: SurfaceTerm;
  readonly succCase: SurfaceTerm;
  readonly scrutinee: SurfaceTerm;
}

export interface SurfaceEq {
  readonly kind: 'Eq';
  readonly type: SurfaceTerm;
  readonly left: SurfaceTerm;
  readonly right: SurfaceTerm;
}

export interface SurfaceRefl {
  readonly kind: 'Refl';
  readonly type: SurfaceTerm;
  readonly value: SurfaceTerm;
}

export interface SurfaceEqRec {
  readonly kind: 'EqRec';
  readonly motive: SurfaceTerm;
  readonly reflCase: SurfaceTerm;
  readonly left: SurfaceTerm;
  readonly right: SurfaceTerm;
  readonly equality: SurfaceTerm;
}

export const surfaceSort: SurfaceSort = { kind: 'Sort' };
export const surfaceNat: SurfaceNat = { kind: 'Nat' };
export const surfaceZero: SurfaceZero = { kind: 'Zero' };

export function surfaceVar(name: string): SurfaceVar {
  if (name.length === 0) throw new Error('Surface variable name must not be empty');
  return { kind: 'Var', name };
}

export function surfacePi(name: string, domain: SurfaceTerm, body: SurfaceTerm): SurfacePi {
  return { kind: 'Pi', name, domain, body };
}

export function surfaceLambda(name: string, domain: SurfaceTerm, body: SurfaceTerm): SurfaceLambda {
  return { kind: 'Lambda', name, domain, body };
}

export function surfaceApp(fn: SurfaceTerm, arg: SurfaceTerm): SurfaceApp {
  return { kind: 'App', fn, arg };
}

export function surfaceApps(fn: SurfaceTerm, ...args: SurfaceTerm[]): SurfaceTerm {
  return args.reduce(surfaceApp, fn);
}

export function surfaceSucc(value: SurfaceTerm): SurfaceSucc {
  return { kind: 'Succ', value };
}

export function surfaceNatRec(
  motive: SurfaceTerm,
  zeroCase: SurfaceTerm,
  succCase: SurfaceTerm,
  scrutinee: SurfaceTerm,
): SurfaceNatRec {
  return { kind: 'NatRec', motive, zeroCase, succCase, scrutinee };
}

export function surfaceEq(type: SurfaceTerm, left: SurfaceTerm, right: SurfaceTerm): SurfaceEq {
  return { kind: 'Eq', type, left, right };
}

export function surfaceRefl(type: SurfaceTerm, value: SurfaceTerm): SurfaceRefl {
  return { kind: 'Refl', type, value };
}

export function surfaceEqRec(
  motive: SurfaceTerm,
  reflCase: SurfaceTerm,
  left: SurfaceTerm,
  right: SurfaceTerm,
  equality: SurfaceTerm,
): SurfaceEqRec {
  return { kind: 'EqRec', motive, reflCase, left, right, equality };
}
