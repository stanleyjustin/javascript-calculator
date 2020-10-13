// document selectors
const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator-keys')
const display = calculator.querySelector('.calculator-display')

// use one event listener on parent element of the buttons to handle all buttons at once
keys.addEventListener('click', event => {
    if (!event.target.closest('button')) return

    const key = event.target
    const keyValue = key.textContent
    const displayValue = display.textContent
    const type = key.dataset.type
    const {previousKeyType} = calculator.dataset

// handle numbers: appear in display
    if ((type === 'number')) {
        if (displayValue === '0') {
        display.textContent = keyValue
    } else if (previousKeyType === "operator") {
        display.textContent = keyValue
    } else {
        display.textContent = displayValue + keyValue
    }
}

// handle operators: do not appear in display
    if (type === 'operator') {
        const operatorKeys = keys.querySelectorAll('[data-type="operator"]')
        operatorKeys.forEach(el => {el.dataset.state= '' })
        key.dataset.state = 'selected'

// store value of first number and operator for later calculation
        calculator.dataset.firstNumber = displayValue;
        calculator.dataset.operator = key.dataset.key;
    }

// perform calculation when hitting equal
    if (type === 'equal') {
        const firstNumber = parseInt(calculator.dataset.firstNumber);
        const operator = calculator.dataset.operator;
        const secondNumber = parseInt(displayValue);        

        let result = '';
        if (operator === 'plus') result = firstNumber + secondNumber;
        if (operator === 'subtract') result = firstNumber - secondNumber;
        if (operator === 'times') result = firstNumber * secondNumber;
        if (operator === 'divided') result = firstNumber / secondNumber;
        console.log(result)

        display.textContent = result;
    }
// perform reset of dataset numbers affixed to 'calculator' and reset display on AC press
    if (type === 'clear') {
        display.textContent = '0';
        delete calculator.dataset.firstNumber;
        delete calculator.dataset.secondNumber;
    }

    calculator.dataset.previousKeyType = type

})
