const isValidDateString = require('./utils/is-valid-date-string');
const formatDate = require('./utils/format-date');
const statePensionAgeData = require('./spa-data');
const {
  FIXED, MALE, FEMALE, EQUALISED, EQUALISATION_DATE,
} = require('./consts');

/**
 * Function to calculate UK State Pension date for a given 'gender' and
 * 'Date of birth'.
 *
 * @param {string} dateOfBirth Input date of birth string (YYYY-MM-DD).
 * @param {string} gender Gender as string ('male' or 'female').
 * @returns {Date} State pension date as a Date object.
 * @throws {Error} When given invalid arguments.
 */
const getStatePensionDate = (dateOfBirth, gender) => {
  if (typeof dateOfBirth !== 'string') {
    throw new TypeError(`Expected dateOfBirth to be string got ${typeof dateOfBirth}: ${dateOfBirth}`);
  }

  if (typeof gender !== 'string') {
    throw new TypeError(`Expected gender to be string got ${typeof gender}: ${gender}`);
  }

  if (gender !== FEMALE && gender !== MALE) {
    throw new Error(`gender string must be '${FEMALE}' or '${MALE}', got: ${gender}`);
  }

  if (!isValidDateString(dateOfBirth)) {
    throw new Error(`dateOfBirth string must be real date in YYYY-MM-DD format, got: ${dateOfBirth}`);
  }

  // Sanitise date of birth string (zero pad months and days)
  const dateElements = dateOfBirth.split('-');
  const sanitisedDob = `${dateElements[0]}-${
    dateElements[1].padStart(2, '0')}-${
    dateElements[2].padStart(2, '0')}`;

  // If date of birth is on or afer the equalised date use equalisation SPA data
  // otherwise use the gender specific data
  const spaDataSet = sanitisedDob >= EQUALISATION_DATE ? EQUALISED : gender;

  // Get state pension age data that matches the date of birth
  const ageData = statePensionAgeData[spaDataSet].find((spaData) => {
    if ((!spaData.periodStart || sanitisedDob >= spaData.periodStart)
        && (!spaData.periodEnd || sanitisedDob <= spaData.periodEnd)) {
      return true;
    }

    return false;
  });

  // If fixed state pension date, return fixed value
  if (ageData.pensionDate.type === FIXED) {
    const spaDateElements = ageData.pensionDate.value.split('-');
    const spaYear = Number.parseInt(spaDateElements[0], 10);
    const spaMonth = Number.parseInt(spaDateElements[1], 10) - 1;
    const spaDay = Number.parseInt(spaDateElements[2], 10);
    return new Date(spaYear, spaMonth, spaDay);
  }

  // Otherwise pensionDate.type must be 'age'
  // Parse dateOfBirth elements as ints
  const dobYear = Number.parseInt(dateElements[0], 10);
  const dobMonth = Number.parseInt(dateElements[1], 10) - 1;
  const dobDay = Number.parseInt(dateElements[2], 10);

  // State pension date is date of birth plus years and months from data
  const spaYear = dobYear + ageData.pensionDate.years;
  const spaMonth = dobMonth + ageData.pensionDate.months;

  // Create SPA Date
  const spaDate = new Date(spaYear, spaMonth, dobDay);

  // If date day is the same, or a leap day, return date
  if (dobDay !== spaDate.getDate() && dobDay !== 29 && dobMonth !== 1) {
    return new Date(spaYear, spaMonth, dobDay - spaDate.getDate());
  }

  return spaDate;
};

/**
 * Function to calculate UK State Pension date for a given 'gender' and
 * 'Date of birth' as a YYYY-MM-DD formatted string.
 *
 * @param {string} dateOfBirth Input date of birth string (YYYY-MM-DD).
 * @param {string} gender Gender as string ('male' or 'female').
 * @returns {Date} State pension date as a Date object.
 */
const getStatePensionDateAsString = (dateOfBirth, gender) => {
  const spaDate = getStatePensionDate(dateOfBirth, gender);
  return formatDate(spaDate);
};

/**
 * Function to determine whether a person is currently over State Pension age
 * based on their date of birth.
 *
 * @param {string} dateOfBirth Input date of birth string (YYYY-MM-DD).
 * @returns {boolean} True if over SPA, false if not.
 */
const isOverStatePensionAge = (dateOfBirth) => {
  // Since December 2018 the State Pension age has been equalised for men and
  // women so we no longer need a gender flag to passed by the user, hardcoding
  // for this call.
  const spaDate = getStatePensionDate(dateOfBirth, 'male');
  const now = Date.now();
  return spaDate.getTime() <= now;
};

// Export functions
module.exports = {
  getStatePensionDate,
  getStatePensionDateAsString,
  isOverStatePensionAge,
};
