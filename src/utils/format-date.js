/**
 * Function that takes a Date object and returns a YYYY-MM-DD formatted string.
 *
 * @param {Date} date Input Date object
 * @returns {string} Formatted string
 */
function formatDate(date) {
  return `${String(date.getFullYear())}-${
    String(date.getMonth() + 1).padStart(2, '0')}-${
    String(date.getDate()).padStart(2, '0')}`;
}

module.exports = formatDate;
