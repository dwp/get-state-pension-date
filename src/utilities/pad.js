'use strict';
/*
* Utility function to pad a value with leading characters
*/
module.exports = (value, padCharacter, requiredLength) => {
  let valueString = value.toString();

  while (valueString.length < requiredLength) {
    valueString = padCharacter + valueString;
  }

  return valueString;
}; // End function
