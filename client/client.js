// constant variables 
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousValueTextElement = document.querySelector('[data-previous-value]');
const currentValueTextElement = document.querySelector('[data-current-value]');
const usernameTextElement = document.getElementById('username');

class Calculator {
  constructor(previousValueTextElement, currentValueTextElement){
    // set text elements inside Calculator class
    this.previousValueTextElement = previousValueTextElement;
    this.currentValueTextElement = currentValueTextElement;
    this.clear();
  }

  // function that handles clearing different variables
  // clears all inputs when calculator is created
  clear(){
    this.currentValue = '';
    this.previousValue = '';
    this.operation = undefined;
  }

  // function that handles deleting a single character
  delete(){

  }

  // update display with current calculation
  useNumber(number){
    // checks for decimal point and only allow 1 decimal point
    if(number === '.' && this.currentValue.includes('.')){
      return
    }
    // allows for long string of numbers as calculator input
    this.currentValue = this.currentValue.toString() + number.toString();
  }

  // determine which operator to use
  useOperator(operator){
    // check for exisitng input values
    if(this.currentValue === ''){
      return
    }
    // if currentValue and previousValue is not empty, 
    // compute and display new value and operator
    if(this.previousValue !== ''){
      this.calculation();
    }
    // once an operator is clicked, value will be cleared and displayed in new position
    this.operator = operator;
    this.previousValue = this.currentValue;
    this.currentValue = '';
  }

  // compute number and display on calculator
  calculation(){
    let computation = '';
    // convert values to integer
    let previousInt = parseFloat(this.previousValue);
    let currentInt = parseFloat(this.currentValue);
    // check for input validation
    if(isNaN(previousInt) || isNaN(currentInt)){
      return
    }
    // calculation using previous and current values
    switch (this.operator) {
      case '+':
        computation = previousInt + currentInt
        break;
      case '-':
        computation = previousInt - currentInt
        break;
      case '*':
        computation = previousInt * currentInt
        break;
      case '÷':
        computation = previousInt / currentInt
        break;
      default:
        break;
    }
    this.currentValue = computation;
    this.operation = undefined;
    this.previousValue = '';
  }

  // update output values
  updateDisplay(){
    this.currentValueTextElement.innerText = this.currentValue;
    this.previousValueTextElement.innerText = this.previousValue;
  }
}

// create calculator object using calculator class constructor to help with calculating numbers
const calculator = new Calculator(previousValueTextElement, currentValueTextElement);

// handle number button clicks and update display
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.useNumber(button.innerText);
    calculator.updateDisplay();
  })
});

// handle operator button clicks
operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.useOperator(button.innerText);
    calculator.updateDisplay();
  })
});

// handle equal button click
equalsButton.addEventListener('click', button => {
  calculator.calculation();
  calculator.updateDisplay();
});

// handle clear click and clears display
allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});




