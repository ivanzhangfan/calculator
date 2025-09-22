let firstNumber = null;
let operator = null;
let secondNumber = null;
let displayValue = '0';
let shouldResetDisplay = false;
let waitingForOperand = false;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Cannot divide by zero";
    }
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return "Error: Invalid operator";
    }
}

function updateDisplay() {
    const display = document.getElementById('display');
    display.value = displayValue;
}

function inputDigit(digit) {
    if (waitingForOperand) {
        displayValue = digit;
        waitingForOperand = false;
    } else {
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    updateDisplay();
}

function inputOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (firstNumber === null) {
        firstNumber = inputValue;
    } else if (operator && !waitingForOperand) {
        const currentValue = firstNumber || 0;
        const newValue = operate(operator, currentValue, inputValue);

        displayValue = String(newValue);
        firstNumber = newValue;
        updateDisplay();
    }

    waitingForOperand = true;
    operator = nextOperator;
}

function calculate() {
    const inputValue = parseFloat(displayValue);

    if (firstNumber !== null && operator) {
        const newValue = operate(operator, firstNumber, inputValue);
        displayValue = String(newValue);
        firstNumber = null;
        operator = null;
        waitingForOperand = true;
        updateDisplay();
    }
}

function inputDecimal() {
    if (waitingForOperand) {
        displayValue = '0.';
        waitingForOperand = false;
    } else if (displayValue.indexOf('.') === -1) {
        displayValue += '.';
    }
    updateDisplay();
}

function clearAll() {
    firstNumber = null;
    operator = null;
    secondNumber = null;
    displayValue = '0';
    waitingForOperand = false;
    updateDisplay();
}

document.addEventListener('DOMContentLoaded', function() {
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator[data-operator]');
    const equalsButton = document.querySelector('.equals');
    const clearButton = document.querySelector('.clear');
    const decimalButton = document.querySelector('.decimal');

    numberButtons.forEach(button => {
        button.addEventListener('click', function() {
            const digit = this.dataset.number;
            inputDigit(digit);
        });
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const op = this.dataset.operator;
            inputOperator(op);
        });
    });

    equalsButton.addEventListener('click', function() {
        calculate();
    });

    clearButton.addEventListener('click', function() {
        clearAll();
    });

    decimalButton.addEventListener('click', function() {
        inputDecimal();
    });

    updateDisplay();
});