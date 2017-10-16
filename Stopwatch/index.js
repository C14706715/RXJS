import {Observable} from 'rxjs/Rx';

// DOM elements
const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const splitBtn = document.getElementById("split");
const resetBtn = document.getElementById("reset");
const splitList = document.getElementById("ul-splits");

var counter = {state: 'INACTIVE', m: 0, s: 0, ms: 0};

function counterStr() {
  let min = counter.m.toString();
  let sec = counter.s.toString();
  let mils = counter.ms.toString();

  if (min.length === 1)
    min = "0" + min;
  if (sec.length === 1)
    sec = "0" + sec


  return (min + ':' + sec + ':' + mils);
}

function start() {
  counter.state = 'ACTIVE';
}
const startBtn$ = Observable.fromEvent(startBtn, 'click');
startBtn$.map(start).subscribe();

function stop() {
  counter.state = 'INACTIVE';
}
const stopBtn$ = Observable.fromEvent(stopBtn, 'click');
stopBtn$.map(stop).subscribe();

function split() {
  let newRepoItem = document.createElement("li");
  splitList.appendChild(newRepoItem);
  let pos = newRepoItem.parentNode.childElementCount;
  newRepoItem.innerHTML = pos + ': ' + counterStr();
}
const splitBtn$ = Observable.fromEvent(splitBtn, 'click');
splitBtn$.map(split).subscribe();

function reset() {
  counter.state = 'INACTIVE';
  counter. m = 0;
  counter.s = 0;
  counter.ms = 0;

  var firstChild = splitList.firstChild;

  while (firstChild) {
    splitList.removeChild(firstChild);
    firstChild = splitList.firstChild;
  }
}
const resetBtn$ = Observable.fromEvent(resetBtn, 'click');
resetBtn$.map(reset).subscribe();

const timer$ = Observable.interval(10)
  .map(
    function incr() {
      console.log(counter.state);

      switch(counter.state) {
        case 'ACTIVE':
          splitBtn.disabled = false;

          counter.ms++;

          if(counter.ms >= 100) {
            counter.ms = 0;
            counter.s++;
          }

          if(counter.s >= 60) {
            counter.s = 0;
            counter.m++;
          }
          break;
        case 'INACTIVE':
          splitBtn.disabled = true;
          break;
      }
    }
  );

timer$.subscribe(function() {
  display.value = counterStr();
  showClock();
});

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function showClock() {
    var angle;
    var handLength = 60;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawClock();
    drawSeconds();
    drawMinutes();

    function drawClock() {
      // Draw outer clock face
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, handLength + 10, 0, Math.PI * 2);
      ctx.strokeStyle = 'grey';
      ctx.stroke();
      // Draw inner clock face
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, handLength + 7, 0, Math.PI * 2);
      ctx.strokeStyle = 'grey';
      ctx.stroke();
      // Draw centre dot
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 2, 0, Math.PI * 2);
      ctx.lineWidth = 2;
      ctx.fillStyle = 'black';
      ctx.strokeStyle = 'black';
      ctx.stroke();

      // Draw minute markers
      for (var i = 0; i < 12; i++) {
          angle = (i - 3) * (Math.PI * 2) / 12;
          ctx.lineWidth = 1;
          ctx.beginPath();

          var x1 = (canvas.width / 2) + Math.cos(angle) * (handLength);
          var y1 = (canvas.height / 2) + Math.sin(angle) * (handLength);
          var x2 = (canvas.width / 2) + Math.cos(angle) * (handLength - (handLength / 7));
          var y2 = (canvas.height / 2) + Math.sin(angle) * (handLength - (handLength / 7));

          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);

          ctx.strokeStyle = 'grey';
          ctx.stroke();
      }

      // Draw second markers
      for (var i = 0; i < 60; i++) {
          angle = (i - 3) * (Math.PI * 2) / 60;
          ctx.lineWidth = 1;
          ctx.beginPath();

          var x1 = (canvas.width / 2) + Math.cos(angle) * (handLength);
          var y1 = (canvas.height / 2) + Math.sin(angle) * (handLength);
          var x2 = (canvas.width / 2) + Math.cos(angle) * (handLength - (handLength / 30));
          var y2 = (canvas.height / 2) + Math.sin(angle) * (handLength - (handLength / 30));

          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);

          ctx.strokeStyle = 'light-grey';
          ctx.stroke();
      }
    }

    function drawSeconds() {
        angle = ((Math.PI * 2) * (counter.s / 60)) - ((Math.PI * 2) / 4);
        ctx.lineWidth = 0.5;

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo((canvas.width / 2 + Math.cos(angle) * handLength),
            canvas.height / 2 + Math.sin(angle) * handLength);

        ctx.strokeStyle = 'grey';
        ctx.stroke();
    }

    function drawMinutes() {
        angle = ((Math.PI * 2) * (counter.m / 60)) - ((Math.PI * 2) / 4);
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo((canvas.width / 2 + Math.cos(angle) * handLength / 1.1),
            canvas.height / 2 + Math.sin(angle) * handLength / 1.1);

        ctx.strokeStyle = 'grey';
        ctx.stroke();
    }
}