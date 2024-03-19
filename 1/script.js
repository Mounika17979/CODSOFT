document.addEventListener("DOMContentLoaded", function() {
  const display = document.getElementById("display");
  const clearButton = document.getElementById("clear");
  const calculateButton = document.getElementById("calculate");
  const buttons = document.querySelectorAll(".number, .operator");

  let currentInput = "";
  let firstOperand = null;
  let operator = null;
  let waitingForSecondOperand = false;

  function clear() {
    currentInput = "";
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    display.textContent = "0";
  }

  function updateDisplay() {
    display.textContent = currentInput;
  }

  function appendNumber(number) {
    if (waitingForSecondOperand) {
      currentInput = number;
      waitingForSecondOperand = false;
    } else {
      currentInput = currentInput === "0" ? number : currentInput + number;
    }
    updateDisplay();
  }

  function setOperator(op) {
    if (operator !== null) {
      calculate();
    }
    firstOperand = parseFloat(currentInput);
    operator = op;
    waitingForSecondOperand = true;
  }

  function calculate() {
    const secondOperand = parseFloat(currentInput);
    if (operator === "+") {
      currentInput = firstOperand + secondOperand;
    } else if (operator === "-") {
      currentInput = firstOperand - secondOperand;
    } else if (operator === "*") {
      currentInput = firstOperand * secondOperand;
    } else if (operator === "/") {
      currentInput = firstOperand / secondOperand;
    }
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
  }

  clearButton.addEventListener("click", clear);

  calculateButton.addEventListener("click", calculate);

  buttons.forEach(button => {
    button.addEventListener("click", function() {
      if (button.classList.contains("number")) {
        appendNumber(button.value);
      } else if (button.classList.contains("operator")) {
        setOperator(button.value);
      }
    });
  });
});
