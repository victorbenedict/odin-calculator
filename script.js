const cl = console.log;
const ct = console.table;
const id = () =>  event.target.id
cl('hello')

document.getElementById('backspace').addEventListener('click', () => {
  backspace();
});

const display = document.getElementById('display');

function render(value){
  display.textContent = value;
}

function concatDigitToActiveValue(digit, activeVal = activeValue){
  if(activeValue == null){
    return '' + digit;
  } else return '' + activeVal + digit;
}

function backspace(){
  if(activeValue == null){
    clvalues(`event-backspace-doNothing`);
  } else {
    const arr = activeValue.split('');
    arr.pop()
    activeValue = arr.join('');
    render(activeValue)
    clvalues(`event-backspace`);
  }
}

function allClear(){
  baseValue = null;
  activeValue = null;
  operator = null;
  result = null;
  render('');
  clvalues('event-allClear');
}

function clear(){
  activeValue = null;
  render('');
  clvalues('clear');
}

function addDecimal(){
  const regex = /(\.)/g;
  if (regex.test(activeValue) || activeValue == null){
    cl(regex.test(activeValue));
    clvalues(`event-dec-doNothing`);
  } else {
    cl(regex.test(activeValue));
    activeValue = concatDigitToActiveValue('.');
    clvalues(`event-dec-added.`);
    render(activeValue);
  }
}



for (let index = 0; index <= 9; index++) {
  document.getElementById(`num-${index}`).addEventListener('click', () => {
  activeValue = concatDigitToActiveValue(index);
  render(activeValue);
  clvalues(`event-digit-${index}`);
  });
}

document.getElementById('decimal').addEventListener('click', () => {
  addDecimal();
});

document.getElementById('signum').addEventListener('click', () => {
  if( activeValue == null) {
    clvalues(`event-signum-doNothing.`);
  } else{
    activeValue *= -1;
    clvalues(`event-signum.`)
    render(activeValue);
  }
});

document.getElementById('squareroot').addEventListener('click', () => {
  if( activeValue == null) {
    clvalues(`event-squareroot-doNothing.`);
  } else{
    activeValue = Math.sqrt(activeValue);
    clvalues(`event-squareroot`);
    render(activeValue);
  }
});

document.getElementById('memoryadd').addEventListener('click', () => {
  if (activeValue == null) {
    clvalues(`event-memoryadd-doNothing.`);
  } else {
    memoryValue += +activeValue;
    clvalues(`event-memoryadd.`);
    
  }
  cl('memoryValue', memoryValue);
});

document.getElementById('memorysubract').addEventListener('click', () => {
  if (activeValue == null) {
    clvalues(`event-memorysubract-doNothing.`);
  } else {
    memoryValue -= +activeValue;
    clvalues(`event-memorysubract.`);
  }
  cl('memoryValue', memoryValue);
});

document.getElementById('memoryRecall').addEventListener('dblclick', () => {
  memoryValue = null;
  activeValue = null;
  render('');
  clvalues(`event-memoryRecall-dblclick.`);
  cl('memoryValue', memoryValue);
});

document.getElementById('memoryRecall').addEventListener('click', () => {
  if (memoryValue == null) {
    clvalues(`event-memoryRecall-click-doNothing.`);
    cl('memoryValue', memoryValue);
  } else {
    render(memoryValue);
    clvalues(`event-memoryRecall-click.`);
    cl('memoryValue', memoryValue);
  }
});

// ---------------operations here-----------

let baseValue = null;
let activeValue = null;
let result = null;
let operator = null;
let memoryValue = null;
let clvalues = (name) => {
  cl(`${name} ( base: ${baseValue}, op: ${operator}, active: ${activeValue}, res: ${result} )`)
};

function calculate(value1, op, value2){
  const a = parseFloat(value1);
  const b = parseFloat(value2);
  switch (op) {
    case 'add': return a + b;
    case 'subtract': return a - b;
    case 'multiply': return a * b;
    case 'divide': return a / b;
  
    default:
      render('invalid operation')
      baseValue = null;
      activeValue = null;
      operator = null;
      result = null;
      return 'invalid operation';
  }
}

function operate(op){
  if (baseValue == null && operator == null && activeValue != null && result == null) {
    baseValue = activeValue;
    activeValue = null;
    operator = op;
    clvalues(`fn-op-${op}-cnd-1`);
    render(result);
  } else if (baseValue != null && operator != null && activeValue != null && result == null) {
    result = calculate(baseValue, operator, activeValue);
    clvalues(`fn-op-${op}-cnd-2a`);
    render(result);
    baseValue = result;
    activeValue = null;
    operator = op;
    clvalues(`fn-op-${op}-cnd-2b`)

  } 
  else if (baseValue != null && operator != null && activeValue != null && result != null) {
    result = calculate(baseValue, operator, activeValue)
    clvalues(`fn-op-${op}-cnd-3a`);
    render(result);
    baseValue = result;
    activeValue = null;
    operator = op;
    clvalues(`fn-op-${op}-cnd-3b`);
  } else {
    clvalues(`fn-op-${op}-doNothing`);
  }
}

function equals(op){
  if (baseValue != null && operator != null && activeValue != null && result == null) {
    result = calculate(baseValue, op, activeValue);
    baseValue = result;
    activeValue = null;
    operator = null;
    clvalues('event-equals-cnd-1')
    render(result);
    result = null;
  } else if (baseValue != null && operator != null && activeValue != null && result != null) {
    result = calculate(baseValue, op, activeValue)
    baseValue = result;
    activeValue = null;
    operator = null;
    clvalues('event-equals-cnd-2');
    render(result);
    result = null;
  } else {
    clvalues('event-equals-doNothing');
  }
}


// -------event listeners here-----------
document.getElementById('add').addEventListener('click', () => {
  operate(id());
  render(result)
});

document.getElementById('subtract').addEventListener('click', () => {
  operate(id());
  render(result)

});

document.getElementById('multiply').addEventListener('click', () => {
  operate(id());
  render(result)

});

document.getElementById('divide').addEventListener('click', () => {
  operate(id());
  render(result)

});

document.getElementById('equals').addEventListener('click', () => {
  equals(operator);
});

document.getElementById('allClear').addEventListener('click', () => {
  allClear();
});

document.getElementById('clear').addEventListener('click', () => {
  clear();
});

// document.addEventListener("keydown", function(event) {
//   // Check if the pressed key is the backspace key (key code 8)
//   if (event.keyCode === 8) {
//     // Call the function or perform the action you want here
//     // do something here
//   }
// });


for ( let index = 0; index <= 9; index++) {
  const key = 48 + index;
  const keynumpad = 96 + index;
  document.addEventListener("keydown", function(event) {
    if (event.keyCode === key || event.keyCode === keynumpad) {
      cl('keypressed', index)
      activeValue = concatDigitToActiveValue(index);
      render(activeValue);
      clvalues(`event-digit-${index}`);
    }
  });
}

document.addEventListener("keydown", function(event) {
  if (event.keyCode === 8) {
    backspace();
    cl('pressed backspace')
  } if (event.keyCode === 27) {
    allClear();
    cl('pressed esc')
  } if (event.keyCode === 46) {
    clear();
    cl('pressed delete')
  } if (event.keyCode === 47 || event.keyCode === 111) {
    operate('divide');
    render('divided by');
    cl('pressed divide')
  } if (event.keyCode === 42 || event.keyCode === 106) {
    operate('multiply');
    render('multiply by');
    cl('pressed multiply')
  } if (event.keyCode === 45 || event.keyCode === 109) {
    operate('subtract');
    render('subtract by');
    cl('pressed subtract')
  } if (event.keyCode === 43 || event.keyCode === 107) {
    operate('add');
    render('add');
    cl('pressed add')
  } if (event.keyCode === 13 || event.keyCode === 108) {
    equals(operator);
    cl('pressed Enter')
  } if (event.keyCode === 190 || event.keyCode === 110) {
    addDecimal();
    cl('pressed Decimal')
  }
});