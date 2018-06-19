$(document).ready(function () {
	//inputs stores inputs to calc later
	var inputs = [];
	//output stores values (outputs), shown on display
	var output = [];

	//totalString string stores current input string
	var totalString;
	//operators array with all operators and modifiers
	var operators = ["+", "-", "÷", "/", "%", "*", "x", "."];
	//digits array with digits
	var digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	//symbols stores operators as well as digits
	var symbols = digits.concat(operators);

//getValue checks whether input value is insecure, if so return
//pushes new value in inputs-array
//joins elements of array into string and stores it in totalString
	function getValue (input) {
		if (!isSecure(input)) {
			return;
		}
		inputs.push(input);
		totalString = inputs.join("");
		console.log(totalString);
	}

//displayValues checks whether currentValue value is insecure, is so return
//else currentValue gets pushed into output array
//output.join(""): joins the elements of output in a String (outputString)
//calls showDigit with outputString as parameters

	function displayValues (currentValue) {
		if (!isSecure(currentValue)) {
			return;
		}
		output.push(currentValue);
		outputString = output.join("");
		showDigit(outputString);
		console.log(outputString); //debugging
	}

//isSecure parameter value is converted to String
//returns value if it's included in symbols
	function isSecure (value) {
		return symbols.includes(value.toString());
	}

//showDigit displays committed parameters
	function showDigit (digit) {
		$(".item-header").html(digit);
	}

//getTotal checks if totalString is empty (no button has been clicked before)
//if so return
//evaluates totalString, stores result in var result
//displays result with two decimal places
//stores result in inputs array
//stores result in output array
	function getTotal () {
		if (!totalString) {
			return;
		}
		var result = eval(totalString);
		result = result.toFixed(2);
		showDigit(result);
		console.log('result', result); //debugging
		inputs = [result];
		output = [result];
	}


	function percentage () {
		if (!isSecure(totalString)) {
			return;
		}

		totalString = "(" + eval(totalString) + ")/100";
		getTotal();
	}

	function leadingsign () {
		inputs[inputs.length - 1] = inputs[inputs.length - 1] * (-1);
		output[output.length - 1] = inputs[inputs.length - 1];
		showDigit(inputs[inputs.length - 1]);
		// inputs[inputs.length - 1] = inputs.length !== 0 ? inputs[inputs.length - 1] * (-1) : 0;
		// output[output.length - 1] = inputs[inputs.length - 1];

	}


//resetValues empties inputs string & output string
	function resetValues () {
		inputs = [""];
		output = [""];
	}

//click-function: is() determines, if the two values (from $this and data-attribute number) are the same value
//if true and totalString is empty, return
//else checking this's ID if it is 'clearall': values will be resetted to empty string
//display set to 0
//if it is 'equals': getTotal
//default : displayValues 'this'
//          getValue gets data-attributes 'data'

	$("[data-button]").click(function () {
		if (!$(this).is('[data-button-number]') && !totalString) {
			return;
		}

		switch (this.id) {
			case 'clearall':
				resetValues();
				showDigit(0);
				break;

			case 'equals':
				getTotal();
				break;

			case 'leadingsign':
				leadingsign();
				break;

			case 'percentage':
				console.log("percentage event clicked");
				percentage();
				break;

			default:
				displayValues($(this).html());
				getValue($(this).data('value'));
		}
	});
});


/***fiddle
 if ($(this).is("#percentage")) {
  console.log("percentage clicked");
  result = result / 100;
}






 //join() joins the elements of an array into a string
 // function update() {
  //   totalString = output.join("");
  //   $(".item-header").html(totalString);
  //
  // }



 // //*leadingsign function*: ---
 //   $("#leadingsign").click(function(){
  //     if (this.id === "leadingsign"){
  //       console.log("vorzeichen");
  //
  //         // number = (parseFloat(newNumber,10) * (-1)).toString(10);
  //       //}
  //
  //     }
 //   });

 */
