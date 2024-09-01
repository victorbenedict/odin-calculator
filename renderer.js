import { Operators } from './model.js';

export const keyPositions = {
  0: Operators.AllClear,
  1: Operators.ToggleSign,
  2: Operators.Percent,
  3: Operators.Divide,
  4: 7,
  5: 8,
  6: 9,
  7: Operators.Multiply,
  8: 4,
  9: 5,
  10: 6,
  11: Operators.Subtract,
  12: 1,
  13: 2,
  14: 3,
  15: Operators.Add,
  16: 0,
  17: Operators.Decimal,
  18: Operators.Evaluate,
};

// Render all keys
(() => {
  for (let i = 0; i < 19; i++) {
    const value = keyPositions[i];
    const button = document.createElement('button');
    button.textContent = value;
    // button.classList.add(`k-${i}`);
    if (value === Operators.Add) button.classList.add('large');
    // if (typeof value === 'number') button.id = `number-${value}`;
    // else button.id = `operator-${value}`;
    keypad.appendChild(button);
  }
})();

export const handleDisplay = (value) => {
  display.textContent = value;
};
