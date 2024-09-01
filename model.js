export const Operators = {
  Add: '+',
  Subtract: '-',
  Multiply: '×',
  Divide: '÷',
  AllClear: 'AC',
  ToggleSign: '+/-',
  Percent: '%',
  Decimal: '.',
  Evaluate: '=',
};

export class Calculator {
  constructor() {
    this.inputs = [];
    this.a = undefined;
    this.b = undefined;
    this.activeOperator = undefined;
  }

  input(value) {
    this.inputs.push(value);
  }

  submit() {
    const number = Number(this.inputs.join(''));
    this.inputs.length = 0;
    if (this.a) {
      return (this.b = number);
    }

    return (this.a = number);
  }

  allClear() {
    this.inputs.length = 0;
    this.a = undefined;
    this.b = undefined;
    this.activeOperator = undefined;
    console.log('allClear()', this);
  }

  operation(operator) {
    if (operator === Operators.AllClear) this.allClear();

    this.submit();
    if (this.b) this.evaluate();

    this.activeOperator = operator;
  }

  evaluate() {
    console.log('here1');
    if (!this.activeOperator) return;

    switch (this.activeOperator) {
      case Operators.Add:
        this.a += this.b;
        break;
      case Operators.Subtract:
        this.a -= this.b;
        break;
      case Operators.Multiply:
        this.a *= this.b;
        break;
      case Operators.Divide:
        this.a /= this.b;
        break;
      case Operators.AllClear:
        this.allClear();
        break;
    }
    console.log(this);
    const result = this.a;
    return result;
  }
}
