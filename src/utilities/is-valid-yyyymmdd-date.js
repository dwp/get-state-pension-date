'use strict';
//
// Utility function to validate a date string is both in the correct
// (YYYY-MM-DD) format, and is a valid date.
//
module.exports = dateString => {
  const dateRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // We assume fail unless proven otherwise
  let result = false;

  if (dateRegex.test(dateString)) {
    // Split the date into relevant parts and cast into numbers
    const dateElements = dateString.split('-');
    const year = parseInt(dateElements[0], 10);
    const month = parseInt(dateElements[1], 10);
    const day = parseInt(dateElements[2], 10);

    // If the year is within a sensible range...
    if (year >= 1000 && year <= 4000) {
      // ...and the month is a valid value...
      if (month >= 1 && month <= 12) {
        // ...and the day is within the range for the supplied year/month

        // Adjust Febrary to allow 29 days in leap years...
        if ((year % 400 === 0) || ((year % 100 !== 0) && (year % 4 === 0))) {
          daysInMonth[1] = 29;
        }

        // ...then check day is in range for supplied month
        if (day > 0 && day <= daysInMonth[month - 1]) {
          // We get this far, then the date is valid
          result = true;
        }
      }
    }
  }

  return result;
}; // End function isValidYYYYMMDDDate()
