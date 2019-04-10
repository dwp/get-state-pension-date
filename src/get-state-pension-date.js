'use strict';

const isValidDateString = require('./utils/is-valid-date-string');
const formatDate = require('./utils/format-date');
const {pensionAgeData} = require('./spa-data');

/**
 * Function to calculate UK State Pension date for a given 'gender' and
 * 'Date of birth'.
 *
 * @param {string} dateOfBirth Input date of birth string (YYYY-MM-DD)
 * @param {string} gender gender as string ('male' or 'female')
 * @returns {Date} state pension date as a Date object
 */
function getStatePensionDate(dateOfBirth, gender) {
  if (typeof dateOfBirth !== 'string') {
    throw new TypeError(`Expected string got ${typeof dateOfBirth}: ${dateOfBirth}`);
  }

  if (typeof gender !== 'string') {
    throw new TypeError(`Expected string got ${typeof gender}: ${gender}`);
  }

  if (gender !== 'female' && gender !== 'male') {
    throw new Error(`gender string must be 'female' or 'male', got: ${gender}`);
  }

  if (!isValidDateString(dateOfBirth)) {
    throw new Error(`Date of birth string must be real date in YYYY-MM-DD format, got: ${dateOfBirth}`);
  }

  // Get state pension age data
  const statePensionAgeData = pensionAgeData();

  // Get state pension age data that matches the gender and date of birth
  const ageData = statePensionAgeData.find(spaData => {
    if (spaData.gender === gender || spaData.gender === '') {
      if ((spaData.periodStart === '' || dateOfBirth >= spaData.periodStart) &&
          (spaData.periodEnd === '' || dateOfBirth <= spaData.periodEnd)) {
        return true;
      }
    }

    return false;
  });

  // If fixed state pension date, return fixed value
  if (ageData.pensionDate.type === 'fixed') {
    return new Date(ageData.pensionDate.value);
  }

  // Otherwise pensionDate.type must be 'age'
  // Parse dateOfBirth as date
  const dateElements = dateOfBirth.split('-');
  const dobYear = parseInt(dateElements[0], 10);
  const dobMonth = parseInt(dateElements[1], 10) - 1;
  const dobDay = parseInt(dateElements[2], 10);

  // State pension date is date of birth plus years and months from data
  const spaYear = dobYear + ageData.pensionDate.years;
  const spaMonth = dobMonth + ageData.pensionDate.months;

  // Create SPA Date
  const spaDate = new Date(Date.UTC(spaYear, spaMonth, dobDay));

  // If date day is the same, or a leap day, return date
  if (dobDay !== spaDate.getDate() && dobDay !== 29 && dobMonth !== 1) {
    return new Date(Date.UTC(spaYear, spaMonth, dobDay - spaDate.getDate()));
  }

  return spaDate;
}

/**
 * Function to calculate UK State Pension date for a given 'gender' and
 * 'Date of birth' as a YYYY-MM-DD formatted string.
 *
 * @param {string} dateOfBirth Input date of birth string (YYYY-MM-DD)
 * @param {string} gender gender as string ('male' or 'female')
 * @returns {Date} state pension date as a Date object
 */
function getStatePensionDateAsString(dateOfBirth, gender) {
  const spaDate = getStatePensionDate(dateOfBirth, gender);
  const string = formatDate(spaDate);
  return string;
}

/**
 * Function determine whether a person of a given 'gender' and 'Date of birth'
 * would be over State Pension age.
 *
 * @param {string} dateOfBirth Input date of birth string (YYYY-MM-DD)
 * @param {string} gender gender as string ('male' or 'female')
 * @returns {boolean} true if over SPA, false if not
 */
function isOverStatePensionAge(dateOfBirth, gender) {
  const spaDate = getStatePensionDate(dateOfBirth, gender);
  const now = Date.now();
  return spaDate.getTime() <= now;
}

// Export functions
module.exports = {
  getStatePensionDate,
  getStatePensionDateAsString,
  isOverStatePensionAge
};
