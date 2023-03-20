let operator = null;
let value1 = null;
let value2 = null;
let displayReset = false;
let calculationDone = false;
let decimalStatus = false;
document.getElementById('display').textContent = 0;

//Event listener for the number buttons
for (let i = 0; i <= 9; i++) {
  document.getElementById(i).addEventListener("click", (e) => {
    console.log(`*You pressed button ${i}`);
		updateDisplay(i);
  });
}

//Event listener for the operator buttons
const btn_operator = document.querySelectorAll('.btn_operator');
btn_operator.forEach(button => {
  button.addEventListener('click', (e) => {
		

    console.log(`*You pressed button ${e.target.id}`);
		displayReset = true;
		decimalStatus = true;


		//Set values

		if(value1 == null && value2 == null ){
			value1 = document.getElementById('display').textContent;
			operator =  e.target.id;
			console.log(`#1 Value1 = ${value1} \nValue2 = ${value2}`)

		}
		else if(value1 != null && value2 == null){
			value2 = document.getElementById('display').textContent;
			console.log(`#2 Value1 = ${value1} \nValue2 = ${value2}`)
			calculate(value1,value2,operator);
			operator =  e.target.id;

		}
		
		else if(value1 != null && value2 != null){
			value2 = document.getElementById('display').textContent;
			console.log(`#3 Value1 = ${value1} \nValue2 = ${value2}`)
			calculate(value1,value2,operator);
			operator =  e.target.id;

		}
		

  });
});

//Event listener for equals button
document.getElementById('equals').addEventListener("click", (e) => {
	console.log(`*You pressed button ${e.target.id}`);
	value2 = document.getElementById('display').textContent;
	calculate(value1,value2,operator);
	displayReset = true;
	decimalStatus = true;


})

//General arithmetic operation function
function calculate(a,b,op){
	let result = 0;
	a = parseFloat(a);
	b = parseFloat(b);
	console.log(`Calculate value: a = ${a} b = ${b} operator: ${op}`)
	switch(op){
		case 'add': 
    result = a + b;
    break;
  case 'subtract': 
    result = a - b;
    break;
  case 'multiply': 
    result = a * b;
    break;
  case 'divide': 
		switch(b){
			case 0:
				operator = null;
				value1 = null;
				value2 = null;
				displayReset = true;
				decimalStatus = false;
				result = 'Error'

			default:
				result = a / b
				break;	
		}
		
	default: 
		operator = null;
		value1 = null;
		value2 = null;
		displayReset = true;
		decimalStatus = false;
    result = 'Error';
	}
	console.log(`Calculation activated and the result is ${result}.`);
	value1 = result;
	value2 = document.getElementById('display').textContent;
	document.getElementById('display').textContent = result;
	return result;
}

//Display behavior function 
function updateDisplay(button){
	let dsp = document.getElementById('display');
	
	if(button == 0 && dsp.textContent == 0 && displayReset == false){
		dsp.textContent = 0; 
		console.log('updateDisplay# 1');
	}
	else if(button < 0 || button <= 10 && dsp.textContent == 0 && displayReset == false){
		dsp.textContent = '';
		dsp.textContent += button;
		console.log('updateDisplay# 2');
	}
	else if(button < 0 || button <= 10 && dsp.textContent != 0 && displayReset == false){
		dsp.textContent += button;
		console.log('updateDisplay# 4');
	}
	else if(button == 0 && dsp.textContent == 0 && displayReset == true){
		dsp.textContent = 0; 
		displayReset = false;
		console.log('updateDisplay# 5');
	}
	else if(button == 0 && dsp.textContent == 0 && displayReset == true){
		dsp.textContent = 0; 
		displayReset = false;
		console.log('updateDisplay# 6');

	}
	else if(button < 0 || button <= 10 && dsp.textContent != 0 && displayReset == true){
		dsp.textContent = button;
		displayReset = false;
		console.log('updateDisplay# 7');
	}
}

//Event listener for clear button
document.getElementById('clear').addEventListener("click", (e) => {
	console.log(`*You pressed button ${e.target.id}`);
	operator = null;
	value1 = null;
	value2 = null;
	displayReset = false;
	decimalStatus = false;
	document.getElementById('display').textContent = 0; 
})

//Event listener for period button
document.getElementById('decimal').addEventListener("click", (e) => {
	console.log(`*You pressed button ${e.target.id}`);
	const displayString = document.getElementById('display').textContent
	if(decimalStatus == false){
		document.getElementById('display').textContent += '.';
		decimalStatus = true;
	}
		
	
})

