'use strict';

// Regular expression to match date format YYYY-MM-DD
const dateRegex = /^\d{4}(?:-\d{1,2}){2}$/;

// Array of max days in a month from Jan [0] - Dec [11]
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * Function that returns whether the input date string is a valid date
 *
 * @param {string} input Input date string
 * @returns {boolean} Whether date string is valid
 */
const isValidDate = input => {
  // Check date string matches format
  if (!dateRegex.test(input)) {
    return false;
  }

  // Split the date into relevant parts and cast into numbers
  const dateElements = input.split('-');
  const year = Number.parseInt(dateElements[0], 10);
  const month = Number.parseInt(dateElements[1], 10);
  const day = Number.parseInt(dateElements[2], 10);

  // Return false if month is not valid
  if (month === 0 || month > 12) {
    return false;
  }

  // Return false if day is 0
  if (day === 0) {
    return false;
  }

  // Return false when day is > 29 when month is February on a leap year
  if (month === 2 && (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))) {
    if (day > 29) {
      return false;
    }
  } else if (day > daysInMonth[month - 1]) {
    // Return false if day is > max days in the month
    return false;
  }

  // Must be valid, return true
  return true;
};

module.exports = isValidDate;
