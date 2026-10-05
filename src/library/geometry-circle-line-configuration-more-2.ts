import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations'; import { translate } from './geometry-transform'; import { onCircle } from './geometry-circle'; import { onVerticalLine } from './geometry-line'; import { incidence } from './geometry-incidence'; import { normSq } from './geometry-metrics'; import { numeral } from './nat';
export const Point2:Term=prod(Nat,Nat); const p=app(app(translate,app(rotate90,pair(numeral(2),numeral(3)))),pair(numeral(1),numeral(2))); const line=pair(pair(numeral(4),numeral(0)),pair(numeral(1),numeral(0))); const circle=pair(p,numeral(32));
export const pointType:Term=eq(Point2,p,pair(numeral(4),numeral(4))); export const pointProof:Term=refl(Point2,pair(numeral(4),numeral(4)));
export const normType:Term=eq(Nat,app(normSq,p),numeral(32)); export const normProof:Term=refl(Nat,numeral(32));
export const circleType:Term=app(app(onCircle,p),circle); export const circleProof:Term=refl(Nat,numeral(32));
export const verticalType:Term=app(app(onVerticalLine,p),numeral(4)); export const verticalProof:Term=refl(Nat,numeral(4));
export const incidenceType:Term=app(app(incidence,p),line); export const incidenceProof:Term=refl(Nat,numeral(4));
