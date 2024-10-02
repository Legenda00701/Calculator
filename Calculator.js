let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;
const maxInputLength = 10;

const display = document.getElementById('display');

function updateDisplay() {
    display.textContent = displayValue;
}

function resetCalculator() {
    displayValue = '0';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
    updateDisplay();
}


function formatResult(result) {
    const resultStr = result.toString();
    if (resultStr.length > maxInputLength) {
        return parseFloat(result).toExponential(4); 
    }
    return resultStr;
}


function calculate(first, second, operator) {
    let result;
    switch (operator) {
        case 'add':
            result = first + second;
            break;
        case 'subtract':
            result = first - second;
            break;
        case 'multiply':
            result = first * second;
            break;
        case 'divide':
            result = second === 0 ? 'Ошибка' : first / second;
            break;
        default:
            result = second;
            break;
    }

    return formatResult(result);
}


function inputLimitCheck(value) {
    if (value.length > maxInputLength) {
        return value.slice(0, maxInputLength); 
    }
    return value;
}

document.querySelector('.buttons').addEventListener('click', (event) => {
    const element = event.target;

    if (!element.classList.contains('btn')) return;

    const value = element.textContent;

    switch (element.id) {
        case 'clear':
            resetCalculator();
            break;

        case 'plus-minus':
            displayValue = (parseFloat(displayValue) * -1).toString();
            break;

        case 'percent':
            displayValue = (parseFloat(displayValue) / 100).toString();
            break;

        case 'equals':
            if (operator && firstValue !== null) {
                const secondValue = parseFloat(displayValue);
                displayValue = calculate(firstValue, secondValue, operator); 
                operator = null;
                waitingForSecondValue = false;
            }
            break;

        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
            if (!waitingForSecondValue) {
                firstValue = parseFloat(displayValue);
                operator = element.id;
                waitingForSecondValue = true;
            }
            break;

        default:
            if (waitingForSecondValue) {
                displayValue = value;
                waitingForSecondValue = false;
            } else {
                displayValue = displayValue === '0' ? value : displayValue + value;
                displayValue = inputLimitCheck(displayValue);
            }
            break;
    }

    updateDisplay();
});

updateDisplay();
