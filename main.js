import { Calculator, Operators } from './model.js';
import { handleDisplay, keyPositions } from './renderer.js';

const c = new Calculator();

const keys = keypad.querySelectorAll('*');
keys.forEach((key, index) => {
  key.addEventListener('click', () => {
    const value = keyPositions[index];
    const isOperator = Object.values(Operators).includes(value);
    const isDigit = !isOperator;

    if (isDigit) c.input(value);
    if (isOperator) c.operation(value);
  });
});
