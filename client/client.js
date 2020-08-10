// constant variables 
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousValueTextElement = document.querySelector('[data-previous-value]');
const currentValueTextElement = document.querySelector('[data-current-value]');
const usernameTextElement = document.getElementById('username');
let sharedComputation = [];
const socket = io();

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
    this.operator = undefined;
  }

  // function that deletes the last character in the string
  delete(){
    this.currentValue = this.currentValue.toString().slice(0, -1);
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
    // once an operator is clicked, value will be cleared and displayed in new value position
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
        return;
    }

    sharedComputation.push(this.previousValue, this.operator, this.currentValue, computation);
    socket.emit('calculation', {
      calculation: sharedComputation[0] + sharedComputation[1] + sharedComputation[2] + ' = ' + sharedComputation[3],
      name: usernameTextElement.value || 'Guest User'
    });    
    
    this.currentValue = computation;
    this.operator = undefined;
    this.previousValue = '';
    sharedComputation = [];    
  }

  // helper function to display numbers with commas
  delimitNumber(number){
    // set number to string in order to split decimal point
    let stringNumber = number.toString();
    // take string and turn into array, target numbers before decimal point
    let integerChar = parseFloat(stringNumber.split('.')[0]);
    // target numbers after decimal point
    let decimalChar = stringNumber.split('.')[1];
    let intDisplay = '';
    // input validation and set integer to english standard with comma delimters
    if(isNaN(integerChar)){
      intDisplay = '';
    } else {
      // no commas for integers after decimal points
      intDisplay = integerChar.toLocaleString('en', {maximumFractionDigits: 0});
    }
    // input validation for if user enters integers after decimal point
    if(decimalChar != null){
      return `${intDisplay}.${decimalChar}`
    } else {
      return intDisplay
    }
  }

  // update output values
  updateDisplay(){
    this.currentValueTextElement.innerText = this.delimitNumber(this.currentValue);
    // display previous value with calcuation operator next to it
    if(this.operator != null){
      this.previousValueTextElement.innerText = 
      `${this.delimitNumber(this.previousValue)} ${this.operator}`;
    } else {
      this.previousValueTextElement.innerText = '';
    }
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

// handle all clear click and clears display and calculation
allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});

// handle delete click
deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
});
