let buffer = '0';
let runningTotal = 0;
let previousOparator;
const screen = document.querySelector('.screen');

function buttonClick(value){
    if (isNaN(parseInt(value))){
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}
function handleNumber(number){
    if (buffer === '0'){
        buffer= number;
    } else {
        buffer += number;
    }
}
function handleMath(value){
    if (buffer === '0'){
        // do nothing
        return;
    }
    const intBuffer=parseInt(buffer);
    if  (runningTotal=== 0){
        runningTotal = intBuffer;
    } else {
        flushOparation(intBuffer);
    }
    previousOparator = value;
    buffer = '0';
}
function flushOparation(intBuffer) {
    if (previousOparator === '+'){
        runningTotal += intBuffer
    } else if (previousOparator === '-'){
        runningTotal -= intBuffer
    } else if (previousOparator === 'x'){
        runningTotal *= intBuffer
    } else if (previousOparator === '÷'){
        runningTotal /= intBuffers  
    }
}

function handleSymbol(symbol){
    switch (symbol) {
        case 'C':
            buffer = '0';
            break;
        case '=':
            if (previousOparator === null){
                return;
            }
            flushOparation(parseInt(buffer));
            previousOparator = null;
            buffer = ""+ runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer === 1){
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case 'x':
        case '÷':
            handleMath(symbol);
            break;
    }
}


function init(){
    console.log("hi");
    document
    .querySelector('.cal-buttons')
    .addEventListener("click", function(event)  {
        buttonClick(event.target.innerText);
    });
}
function rerender(){
    screen.innerText = buffer ;
}

init();