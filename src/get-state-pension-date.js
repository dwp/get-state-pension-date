'use strict';
const isValidYYYYMMDDDate = require('./utilities/is-valid-yyyymmdd-date');
const pad = require('./utilities/pad');
const sanitizeDate = require('./utilities/sanitize-date');
const {pensionAgeData} = require('./spa-data');

//
// Function to calculate UK State Pension age/date for a given 'Gender' and
// 'Date of birth'.
//
// Returns: 'undefined' if unable to calculate the date, otherwise it returns the
//          state pension date as a Date object
//
function getStatePensionDate(dateOfBirth, gender) {
  // Let result; // Default to 'undefined'

  dateOfBirth = sanitizeDate(dateOfBirth);

  // Don't bother going any further if the input params are not valid
  if (validateInputs(dateOfBirth, gender) === false) {
    throw new TypeError('Invalid Input');
  }

  // Ensure we end up with the single char version of our gender variable
  // I.e. convert 'MALE' to 'M' or 'FEMALE' to 'F'
  gender = gender.substr(0, 1).toUpperCase();

  const dateOfBirthDate = new Date(dateOfBirth);
  let statePensionDate; // Defaults to 'undefined'
  const statePensionAgeData = pensionAgeData();
  // See if we can find a rule in our dataset that matches our DOB & gender
  const ageData = statePensionAgeData.find(currentElement => {
    let matched = false;

    // If rule gender is '' (applies to any gender), or matches the supplied
    // gender...
    if (currentElement.gender === '' || (currentElement.gender.toUpperCase() === gender.toUpperCase())) {
      // ...then check the date of birth is within the range of this rule
      const periodStartDate = new Date(currentElement.periodStart);
      const periodEndDate = new Date(currentElement.periodEnd);

      if ((currentElement.periodStart === '' || (dateOfBirthDate.getTime() >= periodStartDate.getTime())) &&
        (currentElement.periodEnd === '' || (dateOfBirthDate.getTime() <= periodEndDate.getTime()))) {
        // Everything checks out, so we found a match
        matched = true;
      }
    }

    return matched;
  });

  // If we found a match for our date of birth/gender, then use that matching
  // rule to work out the retirement date
  if (ageData !== undefined) {
    switch (ageData.pensionDate.type) {
      case 'fixed': {
        statePensionDate = new Date(ageData.pensionDate.value);
        break;
      }

      case 'age': {
        statePensionDate = new Date(dateOfBirthDate);
        statePensionDate.setFullYear(dateOfBirthDate.getFullYear() + ageData.pensionDate.years);
        statePensionDate.setMonth(dateOfBirthDate.getMonth() + ageData.pensionDate.months);

        // If the DOB is a 'leap day' (29 feb), then if the date of
        // retirement falls in a non-leap year (no 29 feb), we have to
        // move the retirement date 'forwards' to 01 March.
        // However, the 'Pensions act 2014' requires people born on the
        // 31st of a month, who find themselves with a retirement month
        // that does not have a 31st, to be moved 'backwards' to the 30th.
        if (dateOfBirthDate.getDate() !== statePensionDate.getDate()) {
        // So if DOB was a 29 feb, we move them forwards
          if (dateOfBirthDate.getDate() === 29 && dateOfBirthDate.getMonth() === 1) {
            statePensionDate.setMonth(statePensionDate.getMonth() + 1);
          } else {
          // Else, we move them backwards
            statePensionDate.setDate(statePensionDate.getDate() - 1);
          }
        }

        break;
      }

      default: {
        throw new TypeError('No match found for input');
      }
    }
  }

  // Return the result
  // return result;
  return statePensionDate;
}

//
// Function to return the date as a string in the YY-MM-DD format
//
function getStatePensionDateAsString(dateOfBirth, gender) {
  let result;
  const statePensionDate = getStatePensionDate(dateOfBirth, gender);

  if (statePensionDate !== undefined) {
    result = `${statePensionDate.getFullYear()}-${pad(statePensionDate.getMonth() + 1, '0', 2)}-${pad(statePensionDate.getDate(), '0', 2)}`;
  }

  return result;
}

//
// Function to verify we have valid input data
//
function validateInputs(dateOfBirth, gender) {
  let result = true;

  result = isValidYYYYMMDDDate(dateOfBirth);

  // We only support gender of 'M', 'MALE', 'F' & 'FEMALE'
  if (result === true && typeof gender === 'string') {
    if ((gender.toUpperCase() !== 'M') &&
      (gender.toUpperCase() !== 'MALE') &&
      (gender.toUpperCase() !== 'F') &&
      (gender.toUpperCase() !== 'FEMALE')) {
      result = false;
    }
  } else {
    result = false;
  }

  return result;
}
// End function validateInputs()

// Export our two main functions
module.exports = {
  getStatePensionDate,
  getStatePensionDateAsString
};
