class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousDisplay = previousOperandTextElement;
        this.currentDisplay = currentOperandTextElement;
        this.clear();
    };

    //make functions for operations to perform
    //clear display
    clear(){
        this.currentNumber = '';
        this.previousNumber = '';
        this.number = undefined;
    };

    //remove single digit
    delete(){
        //use slice to take off the last number
        this.currentNumber = this.currentNumber.toString().slice(0, -1);
    };
    
    //get numbers to display. pass the number
    makeNumber(number){
        //allow only 1 decimal per number
        if(number === '.' && this.currentNumber.includes('.')){
            return;
        }
        this.currentNumber = this.currentNumber.toString() + number.toString();
    };

    //get operation selected. pass the operation
    chooseOperation(operation){
        //check that there's a number to use the operator on
        if(this.currentNumber === ''){
            return;
        }
        //if previous and current operand have value, compute them
        if(this.previousNumber !== ''){
            this.compute();
        };
        this.number = operation;
        //done with first number so we move it to previous
        this.previousNumber = this.currentNumber;
        //clear current
        this.currentNumber = '';
    };

    //compute the values
    compute(){
        let total;
        const prev = parseFloat(this.previousNumber);
        const current = parseFloat(this.currentNumber);
        if(isNaN(prev) || isNaN(current)){
            return;
        }
        switch(this.number){
            case '+':
                total = prev + current;
                break;
            case '-':
                total = prev - current;
                break;
            case '*':
                total = prev * current;
                break;
            case '/':
                total = prev / current;
                break;
            default:
                return;
        };
        this.currentNumber = total;
        this.number = undefined;
        this.previousNumber = '';

    };

    //function for negative
    negative(){
        let negative;
        const negativeNumber = parseFloat(this.currentNumber);
        if(isNaN(negativeNumber)){
            return;
        }
        negative = negativeNumber * -1; 
        this.currentNumber = negative;
    };

    //function for percent
    percent(){
        let percent;
        const percentNumber = parseFloat(this.currentNumber);
        if(isNaN(percentNumber)){
            return;
        }
        percent = percentNumber / 100;
        this.currentNumber = percent;
    }

    //get the number input
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
          integerDisplay = '';
        } 
        else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        };
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`;
        } 
        else {
          return integerDisplay;
        };
      };

    //update the display
    updateDisplay(){
        this.currentDisplay.innerText = this.getDisplayNumber(this.currentNumber);
        if(this.number != null){
            this.previousDisplay.innerText = `${this.getDisplayNumber(this.previousNumber)} ${this.number}`;   
        }
        else{
            this.previousDisplay.innerText = '';
        }
    };
};//end of Calculator

//variables
const btnNum = document.querySelectorAll('.btn-number');
const btnOperators = document.querySelectorAll('.btn-operator');
const btnClear = document.querySelector('#btn-clear');
const btnDelete = document.querySelector('#btn-delete');
const btnEqual = document.querySelector('#btn-equal');
const btnPercent = document.querySelector('#btn-percent');
const btnPosNeg = document.querySelector('#btn-pos-neg');
const previousDisplay = document.querySelector('.previous-display');
const currentDisplay = document.querySelector('.current-display');

const calculator = new Calculator(previousDisplay, currentDisplay)

//apply functions to buttons
btnNum.forEach(button => {
    button.addEventListener('click', () => {
        calculator.makeNumber(button.innerText);
        calculator.updateDisplay();
    }); 
});

btnOperators.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

btnEqual.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

btnClear.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

btnDelete.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});

btnPercent.addEventListener('click', button =>{
    calculator.percent();
    calculator.updateDisplay();
});

btnPosNeg.addEventListener('click', button =>{
    calculator.negative();
    calculator.updateDisplay();
});

//collect key clicks
window.addEventListener('keydown', e => {
    if(e.key == 0){
        let num = parseFloat(e.key)
        calculator.makeNumber(num);
        calculator.updateDisplay();
    }
    else if(parseFloat(e.key)){
        calculator.makeNumber(e.key);
        calculator.updateDisplay();
        }
    switch(e.key){
        case '+':
            calculator.chooseOperation(e.key);
            calculator.updateDisplay();
            break;
        case '-':
            calculator.chooseOperation(e.key);
            calculator.updateDisplay();
            break;
        case '*':
            calculator.chooseOperation(e.key);
            calculator.updateDisplay();
            break;
        case '/':
            calculator.chooseOperation(e.key);
            calculator.updateDisplay();
            break;
        case 'Enter':
            calculator.compute(e.key);
            calculator.updateDisplay();
            break;
        case '=':
            calculator.compute(e.key);
            calculator.updateDisplay();
            break;
        case 'Backspace':
            calculator.delete(e.key);
            calculator.updateDisplay();
            break;
        case 'Delete':
            calculator.clear(e.key);
            calculator.updateDisplay();
            break;
        default:
            return;
    }
});