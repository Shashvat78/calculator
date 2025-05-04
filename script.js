let firstVariable='';
let secondVariable='';
let currentOperator=null;
let reset=false;

const display=document.querySelector("#display");
const clearButton=document.getElementById("clear");
const backspaceButton=document.getElementById("backspace");
const numberButtons = document.querySelectorAll('[data-num]');
const operatorButtons = document.querySelectorAll('[data-op]');
const decimalButton=document.getElementById("decimal");
const equalsButton = document.getElementById('equals');
const kamehamehaSound = document.getElementById('kamehameha-sound');

numberButtons.forEach(btn=>
    btn.addEventListener('click',()=> appendNumber(btn.dataset.num))
)
operatorButtons.forEach(btn=>
    btn.addEventListener('click',()=> operandNumber(btn.dataset.op))
)
equalsButton.addEventListener('click', () => {
    evaluate();  
    kamehamehaSound.play();  
  });
decimalButton.addEventListener('click',appendDecimal);
clearButton.addEventListener('click',clear);
backspaceButton.addEventListener('click', backspace);
document.addEventListener('keydown',handleKeyboardInput);

function appendNumber(number){
    if(display.textContent=== '0' || reset) resetDisplay();
    display.textContent+=number;
}
function operandNumber(operator){
    if(currentOperator!==null && !reset) evaluate();
    firstVariable=display.textContent;
    currentOperator=operator;
    reset=true;
    display.textContent='';
}
function resetDisplay() {
    display.textContent = '';
    reset= false;
  }
  
  function clear() {
    display.textContent = '0';
    firstVariable = '';
    secondVariable = '';
    currentOperator = null;
    reset = false;
  }
  function backspace(){
    if (reset) return;
    display.textContent = display.textContent.slice(0, -1) || '0';
  }
  function evaluate(){
    if(currentOperator===null || reset) return;
    secondVariable=display.textContent;
    const result=operate(currentOperator,firstVariable,secondVariable);
    display.textContent=roundResult(result);
    firstVariable=display.textContent;
    currentOperator=null;
  }
  function roundResult(number){
    return Math.round(number*1000)/1000;
  }
  
  function appendDecimal() {
    if (reset) resetDisplay();
    if (!display.textContent.includes('.')) display.textContent += '.';
  }
  


function operate(operator,a,b,){
    a=parseFloat(a);
    b=parseFloat(b);

    switch(operator){
        case '+': return add(a,b);
        case '-': return sub(a,b);
        case '*': return mul(a,b);
        case '/': return div(a,b);
    }

    function add(a,b){
        return a+b;
    }
    function sub(a,b){
        return a-b;
    }
    function mul(a,b){
        return a*b;
    }
    function div(a,b){
        return a/b;
    }
}
function handleKeyboardInput(e){
    if(e.key>=0 && e.key<=9) appendNumber(e.key);
    if(e.key==='.') appendDecimal(); 
    if(e.key==='=' || e.key==='Enter')evaluate();
    if(e.key==='Backspace')backspace();
    if(e.key==='Delete')clear();
    if (['+', '-', '*', '/'].includes(e.key)) operandNumber(e.key);
}