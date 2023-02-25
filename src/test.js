import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { take, combineAll } from 'rxjs/operators';
import { interval } from 'rxjs';


map(x => x * x)(of(1, 2, 3)).subscribe((v) => console.log(`Output is: ${v}`));


// emit every 1s, take 2
const source$ = interval(1000).pipe(take(2));
// map each emitted value from source to interval observable that takes 5 values
const example$ = source$.pipe(
  map(val => interval(1000).pipe(map(i => `Result (${val}): ${i}`), take(5)))
);
/*
  2 values from source will map to 2 (inner) interval observables that emit every 1s
  combineAll uses combineLatest strategy, emitting the last value from each
  whenever either observable emits a value
*/
example$.pipe(combineAll())

.subscribe(console.log);
