import {Observable} from 'rxjs/Rx';

const Values = Array.from("0123456789+0x÷±.C=()/");
const Buttons = document.querySelectorAll(".Buttons");

const MathEx$ = Observable.merge(
    Observable.fromEvent(Buttons, 'click').map(
        event => event.target.innerHTML),
    Observable.fromEvent(document, 'keyup').map(
        evennt => event.key)
)

const Display = document.querySelector("input[type=text]");
const OutputExp$ = MathEx$.scan((prev, curr) => {
    if(Values.includes(curr)){
        if(curr == 'C'){
            for(var i=0; i<Buttons.length; i++){
                Buttons[i].disabled = false;
            }
            return '';
        }
        else if (curr == '='){
            try{
                return eval(prev);
            }catch (err){
                return 'Error';
            }
        }
        else if (curr == '±'){
            let Plus = prev.lastIndexOf('+');
            let Minus = prev.lastIndexOf('-');
            //To display the calculations
            if(Plus > Minus){
                prev = prev.substr(0, Plus) + '-' + prev.substr(Plus + 1);
            }
            else{
                prev = prev.substr(0, Minus) + '+' + prev.substr(Minus + 1);
            }
            return prev;
        }
        else {
            if(curr =='x'){
                curr = curr.replace(/x/g, "*");
            }
            else if (curr == '÷'){
                curr = curr.replace(/÷/g, "/");
            }
            return prev + curr;
        }
    }
    else{
        return prev;
    }
});

//Error Handling
OutputExp$.subscribe(function (J){
    if(J == 'Error'){
        for(var i=0; i<Buttons.length; i++){
            if(Buttons[i].innerHTML != 'C'){
                Buttons[i].disabled = true;
            }
        }
        console.log('Error');
    }
    Display.value = J;
}
);
