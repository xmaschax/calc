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
		// Wenn in totalString sowas steht wie: 3+2
		if (!Number(totalString)) {
			// loope durch ein array von rechenoperationen (Das ist Jquery ;)
			// kann das Array von oben nicht nehmen, weil % oder . nicht in frage kommen darf
			// Split gibt ein Array zurück, solange wir das vorzeichen im String nicht finden, ist lastSign.length = 0
			// Findet er eins z.b. für das Beispiel oben 3+2 das + -> werden die 2 zahlen ins array geschrieben -> ["3", "2"]
			var lastSign = [];
			$.each(["+", "-", "*", "/"], function (i, value) {
				if (lastSign.length <= 0) {
					lastSign = totalString.split(value);
				}
			});
			// Liest das letzte Element des Arrays aus (ich glaube das ist echt best practice, länge des Arrays - 1, eleganter geht nicht :P)
			lastSign = lastSign[lastSign.length - 1];
			// Wir müssen wissen wie viel Stellen die letzte nummer hat, damit wir die später beim substring abschneiden können
			var numberToRemoveFromTotalString = lastSign.length;
			// Sollte in totalString sowas stehen wie: 3+ -> dann wäre das + das letzte Zeichen aber keine Zahl, hier muss man dann raus
			if (!Number(lastSign)) return;
			// multiply it with -1
			lastSign = Number(lastSign) * -1;
			// substring(0, totalString.length -numberToRemoveFromTotalString) -> return the hole totalString accept last number
			//  + "(" + lastSign + ")" -> concat the last number as a negative number
			totalString = totalString.substring(0, totalString.length - numberToRemoveFromTotalString) + "(" + lastSign + ")";
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
