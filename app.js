//inputs stores inputs to calc later
//output stores values (outputs), shown on display
//totalString string stores current input string
//operators array with all operators and modifiers
//digits array with digits
//symbols stores operators as well as digits
$(document).ready(function () {
	var inputs = [];
	var output = [];
	var totalString;
	var operators = ["+", "-", "÷", "/", "%", "*", "x", "."];
	var digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	var symbols = digits.concat(operators);


//isSecure parameter value is converted to String
//returns value if it's included in symbols
	function isSecure (value) {
		return symbols.includes(value.toString());
	}


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
		totalString = result;
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

		switch ($(this).attr('id')) {
			case 'clearall':
				resetValues();
				showDigit(0);
				break;
			case 'leadingsign':
				leadingsign();
				break;
			case 'percentage':
				percentage();
				break;
			case 'equals':
				getTotal();
				break;

			default:
				displayValues($(this).html());
				getValue($(this).data('value'));
		}

	});

	function leadingsign () {
		console.log("vorzeichen if");
		// if totalString is not a single Number enter here
		if (!Number(totalString)) {
			// cut the last character of string
			var lastSign = totalString.slice(-1);
			// check if last character of string is a number
			if (!Number(lastSign)) return;
			// multiply it with -1
			lastSign = lastSign * (-1);
			// substring(0, totalString.length -1) -> take the hole totalString accept last character
			//  + "(" + lastSign + ")" -> concat the last character as a negative number
			totalString = totalString.substring(0, totalString.length - 1) + "(" + lastSign + ")";
		} else {
			// enter here if totalString is a single Number
			if (!(totalString) && !isSecure((totalString) * -1) && !isSecure(totalString)) {
				return;
			}
			// eval is required because it returns a Number -> String can't be multiply with -1
			totalString = eval(totalString) * (-1);
		}
		getTotal();
	}


	function percentage () {
		if (!(totalString) && !isSecure((totalString) * -1) && !isSecure(totalString)) {
			return;
		}
		totalString = "(" + eval(totalString) + ")/100";
		getTotal();
	}

//resetValues empties inputs string & output string
	function resetValues () {
		inputs = [""];
		output = [""];
	}
});
