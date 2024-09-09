// Get references to the display and all the buttons
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');

let currentInput = '';
let operator = null;
let previousInput = '';

// Function to update the display
function updateDisplay(value) {
  display.textContent = value;
}

// Function to handle number button clicks
function handleNumberClick(number) {
  currentInput += number;
  updateDisplay(currentInput);
}

// Function to handle operator button clicks
function handleOperatorClick(op) {
  if (currentInput === '' && op !== 'C') return; // Ignore if no number is input
  if (op === 'C') { // Clear the display and reset all variables
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay('');
    return;
  }
  if (operator && previousInput) { // Calculate if there's already an operator
    currentInput = calculate(previousInput, currentInput, operator);
    updateDisplay(currentInput);
  }
  operator = op;
  previousInput = currentInput;
  currentInput = '';
}

// Function to perform calculations
function calculate(first, second, op) {
  const firstNum = parseFloat(first);
  const secondNum = parseFloat(second);
  switch (op) {
    case '+':
      return (firstNum + secondNum).toString();
    case '-':
      return (firstNum - secondNum).toString();
    case '*':
      return (firstNum * secondNum).toString();
    case '/':
      return (firstNum / secondNum).toString();
    default:
      return second;
  }
}

// Function to handle equals button click
function handleEqualsClick() {
  if (operator && previousInput && currentInput) {
    currentInput = calculate(previousInput, currentInput, operator);
    updateDisplay(currentInput);
    operator = null;
    previousInput = '';
  }
}

// Add event listeners to all buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    if (button.classList.contains('number')) {
      handleNumberClick(value);
    } else if (button.classList.contains('operator')) {
      handleOperatorClick(value);
    } else if (button.classList.contains('equals')) {
      handleEqualsClick();
    }
  });
});
