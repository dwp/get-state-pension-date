'use strict';

/**
 * Function that takes a Date object and returns a YYYY-MM-DD formatted string
 *
 * @param {Date} date input Date object
 * @returns {string} formatted string
 */
const formatDate = date => {
  const string =
    String(date.getFullYear()) + '-' +
    String(date.getMonth() + 1).padStart(2, '0') + '-' +
    String(date.getDate()).padStart(2, '0');

  return string;
};

module.exports = formatDate;
