/**
 * Converts temperature in Celsius to Fahrenheit.
 * 
 * @param {number} celsius - The temperature in Celsius to be converted.
 * @returns {number} - The temperature converted to Fahrenheit.
 */
function celsiusToFahrenheit(celsius) {
  const result = (celsius * 9/5) + 32;
  return result;
}

/**
* Converts temperature in Fahrenheit to Celsius.
* 
* @param {number} fahrenheit - The temperature in Fahrenheit to be converted.
* @returns {number} - The temperature converted to Celsius.
*/
const fahrenheitToCelsius = (fahrenheit) => {
  const cal = (fahrenheit - 32) * 5/9;
  const result = cal.toFixed(4);
  return result;
}

/**
* Retrieves the value of an input element based on its name and type.
* 
* @param {string} name - The name or identifier of the input element.
* @param {string} [type='class'] - The type of selector to be used ('class' or 'id'). Default is 'class'.
* @returns {string} - The value of the input element.
* @throws {Error} - If the specified type is invalid or the input element is not found.
*/
const getDataFromInput = (name, type = 'class') => {
  let getInput, inputValue;

  switch (type) {
      case 'class':
          getInput = document.querySelector('.' + name);
          break;
      case 'id':
          getInput = document.querySelector('#' + name);
          break;
      default:
          throw new Error('Invalid type specified.');
  }

  if (getInput) {
      inputValue = getInput.value;
      return inputValue;
  } else {
      throw new Error('Input element not found.');
  }
}

/**
* Checks whether a value is a numeric value or not.
* 
* @param {*} value - The value to be checked.
* @returns {boolean} - Returns true if the value is a number, otherwise returns false.
*/
function isNumber(value) {
  if (!isNaN(value)) {
      return true;
  } else {
      return false;
  }
}

/**
* Changes the content of an element based on its name, type, value, and additional detail.
* 
* @param {string} name - The name or identifier of the element.
* @param {string} type - The type of selector to be used ('id' or 'class').
* @param {string} value - The value to be set as the element's content.
* @param {string} detail - An additional detail to be appended to the element's content.
* @throws {Error} - If an invalid type is specified or if the element is not found.
*/
const changeElementContent = (name, type, value, detail) => {
  let getElement;

  switch (type) {
      case 'id':
          getElement = document.getElementById(name);
          getElement.innerHTML = value + '' + detail;
          break;
      case 'class':
          const elements = document.getElementsByClassName(name);
          Array.from(elements).forEach((element) => {
              element.innerHTML = value + '' + detail;
          });
          break;
      default:
          throw new Error('Invalid type specified.');
  }
};

/**
* Displays a modal dialog with specified title and message content.
* 
* @param {string} title - The title of the modal.
* @param {string} message - The content message displayed within the modal.
* @param {function} op - A callback function to be executed when the modal is closed.
* 
* @example
* // Example of using showModal function
* const handleCloseCallback = () => {
*   // Additional actions to be performed after the modal is closed
*   console.log('Modal closed!');
* };
* showModal('Error', 'An unexpected error occurred.', handleCloseCallback);
* 
* @returns {void}
*/
const showModal = (title, message, op) => {
  // Show Modal
  const getDivModal = document.getElementById('errorModal');
  getDivModal.style.display = 'block';

  const getTitle = document.querySelector('.modal-title');
  getTitle.innerHTML = title;

  const getMessage = document.querySelector('.modal-text');
  getMessage.innerHTML = message;

  // Close Modal
  const closeButton = document.querySelector('.modal-close');
  closeButton.addEventListener('click', () => {
      getDivModal.style.display = 'none';
      op();
  });
};

let isCelsius = true;

const getChangeButton = document.getElementById('change');
getChangeButton.addEventListener('click', function () {
  let getInput = document.getElementById('celsius');
  if (isCelsius) {
      isCelsius = false;
      changeElementContent('title', 'id', 'Convert Fahrenheit to Celsius', '');
      document.title = 'Convert Fahrenheit to Celsius';
      getInput.placeholder = 'Convert Fahrenheit to Celsius';

  } else {
      isCelsius = true;
      changeElementContent('title', 'id', 'Convert Celsius to Fahrenheit', '');
      getInput.placeholder = 'Convert Celsius to Fahrenheit';
      document.title = 'Convert Celsius to Fahrenheit';
  }
})

const getConvertButton = document.getElementById('convert');
getConvertButton.addEventListener('click', function () {
  let fahrenheitResult, celsiusResult;
  const inputValue = +getDataFromInput('celsius', 'id');
  if (inputValue && isCelsius) {
      fahrenheitResult = celsiusToFahrenheit(inputValue);
      changeElementContent('result', 'id', fahrenheitResult, 'Fahrenheit');
  } else if (inputValue && !isCelsius) {
      celsiusResult = fahrenheitToCelsius(inputValue);
      changeElementContent('result', 'id', celsiusResult, 'Celsius');
  }
})

// ClearButton
let getClearButton = document.getElementById('clear');
getClearButton.addEventListener('click', function () {
  showModal('Clear', 'All data has been cleared', function () {
      let result = document.querySelector('#result');
      result.innerHTML = '';

      let input = document.querySelector('#celsius');
      input.value = '';
  })
})
