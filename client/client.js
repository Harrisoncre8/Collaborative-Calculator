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
    this.currentOperator = '';
    this.previousOperator = '';
    this.operation = undefined;
  }

  // function that handles deleting a single character
  delete(){

  }

  // update display with current calculation
  useNumber(number){
    this.currentOperator = number;
  }

  // determine which operator to use
  useOperator(operator){

  }

  // compute number and display on calculator
  calculation(){

  }

  // update output values
  updateDisplay(){
    this.currentValueTextElement.innerText = this.currentOperator;
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
})