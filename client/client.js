// constant variables 
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousValueTextElement = document.querySelector('[data-previous-value]');
const currentValueTextElement = document.querySelector('[data-current-value]');

class Calculator {
  constructor(previousValueTextElement, currentValueTextElement){
    // set text elements inside Calculator class
    this.previousValueTextElement = previousValueTextElement;
    this.currentValueTextElement = currentValueTextElement;
    this.clear();
  }

  // function that handles clearing different variables
  // sets default values
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

  }

  // determine which operator to use
  useOperator(operator){

  }

  // compute number and display on calculator
  calculation(){

  }

  // update output values
  updateDisplay(){

  }
}