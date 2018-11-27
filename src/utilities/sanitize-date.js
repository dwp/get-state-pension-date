'use strict';
//
// Utility function to try and ensure we have a consistent date string format
// I.e. Ensure months and days are zero padded.
//
const pad = require('./pad');

module.exports = dateString => {
  const dateElements = dateString.split('-');
  const year = parseInt(dateElements[0], 10);
  let month = parseInt(dateElements[1], 10);
  let day = parseInt(dateElements[2], 10);

  month = pad(month, '0', 2);
  day = pad(day, '0', 2);

  return year + '-' + month + '-' + day;
}; // End function sanitizeDate()
