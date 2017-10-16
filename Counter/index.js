import {Observable} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx';

const display = document.getElementById("display");
const incButton = document.getElementById("increment");
const decButton = document.getElementById("decrement");
const resButton = document.getElementById("reset");

let counter = 1;

const inc$ = Observable.fromEvent(incButton, 'click');
inc$.subscribe(ev =>{
   display.innerHTML = counter++;
});

const dec$ = Observable.fromEvent(decButton, 'click');
dec$.subscribe(ev =>{
   display.innerHTML = counter--;
});


const reset$ = Observable.fromEvent(resButton, 'click');
reset$.subscribe(ev =>{
    counter =1;
   display.innerHTML = 0;
});




