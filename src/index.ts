import { normalize } from './kernel/reduction';
import { show, infer } from './kernel/typecheck';
import { addTerm, numeral } from './library/nat';

const result = normalize(addTerm(numeral(2), numeral(3)));
console.log(`2 + 3 => ${show(result)}`);
console.log(`type => ${show(infer([], result))}`);
