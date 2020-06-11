/*=== App overview ===
Calculator with basic math functions. Builds a calculation string
on the display and then solves it one step at a time and returns
the result on the display.

Table of contets:
- DOM Elements
- Variables
- Events
- Calculation Functions
  - Main Solver
  - Step Solver
  - Helper Functions
- Init Display
=============================================================================*/

/*=== DOM Elements ===
=============================================================================*/
const numbers = Array.from(document.querySelectorAll(".cl-buttons__number"));
const operators = Array.from(document.querySelectorAll(".cl-buttons__operator"));
const display = document.querySelector(".cl-display");
const clear = document.querySelector(".cl-buttons__clear");
const plusminus = document.querySelector(".cl-buttons__plusminus");
const back = document.querySelector(".cl-buttons__back");
const equals = document.querySelector(".cl-buttons__equals");

/*=== Variables ===
=============================================================================*/
const resultPrecision = 10;

/*=== Events ===
=============================================================================*/
numbers.forEach(number => {
    number.addEventListener("click", function(e){
        if (this.textContent === "." && display.textContent.lastIndexOf(".") > display.textContent.lastIndexOf(" ")) return;
        display.textContent += this.textContent;
    })
});
operators.forEach(operator => {
    operator.addEventListener("click", function(e) {
        if (this.textContent === "÷") {
            display.textContent += " ÷ ";
        }
        else if (this.textContent === "×"){
            display.textContent += " × ";
        }
        else if (this.textContent === "−"){
            display.textContent += " − ";
        }
        else {
            display.textContent += " + ";
        }
    });
});
equals.addEventListener("click", (e) => {
    display.textContent = solveCalculation(display.textContent);
});
plusminus.addEventListener("click", (e) => {
    display.textContent += "-";
});
clear.addEventListener("click", (e) => {
    display.textContent = "";
});
back.addEventListener("click", (e) => {
    let str = display.textContent;
    if (str.endsWith(" ")) {
        str = str.substring(0, str.length-3);
    }else {
        str = str.substring(0, str.length-1);
    }
    display.textContent = str;
})

/*=== Calculation Functions ===
- Main Sover
- Step Solver
- Helper Functions
=============================================================================*/

/*=== Main Solver ===
Takes the display string and operates on it as an array, solving
each operator until there's none left in the array. Returns result
to be displayed.
=============================================================================*/
function solveCalculation(string){
    let calculationArray = string.split(" ");
    while (calculationArray.length > 1) {
        if (calculationArray.includes("÷") || calculationArray.includes("×")){
            calculationArray = solveCalculationStep(calculationArray, checkMultiplyDivide);
        } else if (calculationArray.includes("−") || calculationArray.includes("+")){
            calculationArray = solveCalculationStep(calculationArray, checkAddSubstract);
        } else {
            console.log("Something went wrong. Breaking while loop...");
            return calculationArray = ["err"];
        }
    }
    if (isNaN(calculationArray[0])) return "err";
    else return round(calculationArray[0]);
}

/*=== Step Solver ===
Finds an operator and the numbers on each side. Solves operation
and removes it from the array. Returns spliced array.
=============================================================================*/
function solveCalculationStep(array, operationTest){
    let tempArray = array;
    let operationIndex = tempArray.findIndex(operationTest);
    let operation = tempArray[operationIndex];
    let a = parseFloat(tempArray[operationIndex-1]);
    let b = parseFloat(tempArray[operationIndex+1]);
    let result = operate(a, b, operation);
    tempArray[operationIndex-1] = result;
    tempArray.splice(operationIndex, 2);
    return tempArray;
}

/*=== Helper Functions ===
- findIndex Tester
    - add         = &#43;
    - substract   = &#8722; doesn't interfere with regular "-" used for plusminus
    - multiply    = &#215;
    - divide      = &#247;
- Operation Switch
- Math Functions
=============================================================================*/
function checkMultiplyDivide(operator){
    return operator === "÷" || operator === "×";
}
function checkAddSubstract(operator){
    return operator === "+" || operator === "−";
}
function operate(a, b, operator){
    switch (operator) {
        case "+":
            return add(a, b);
        break;
        case "−":
            return substract(a, b);
        break;
        case "×":
            return multiply(a, b);
        break;
        case "÷":
            return divide(a, b);
        break;
        default:
            return "err";
    }
}
function add(a, b){
    return a+b;
}
function substract(a, b){
    return a-b;
}
function multiply(a, b){
    return a*b;
}
function divide(a, b){
    if (b === 0) return "err";
    else return a/b;
}
function round(value){
    let length = value.toString().length;
    if (length > resultPrecision) return value.toPrecision(resultPrecision)
    else return value;
}

/*=== Init Display ===
=============================================================================*/
display.textContent = "";