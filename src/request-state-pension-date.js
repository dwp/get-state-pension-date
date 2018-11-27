'use strict';

const {getStatePensionDate} = require('./get-state-pension-date');

function requestStatePensionDate(request, response) {
  const {dateOfBirth, gender} = request.params;
  let statePensionDate;

  try {
    statePensionDate = getStatePensionDate(dateOfBirth, gender);
    if (typeof statePensionDate === 'object' && statePensionDate instanceof Date) {
      response.status(200).json({statePensionDate});
    } else {
      throw new TypeError('Unknown error');
    }
  } catch (err) {
    if (err.message === 'Invalid Input') {
      response.status(400).json({error: `The client input was invalid: Date of birth: '${dateOfBirth}', Gender: '${gender}'`});
    } else if (err.message === 'No match found for input') {
      response.status(500).json({error: `Input returned no result for input: Date of birth: '${dateOfBirth}', Gender: '${gender}'`});
    } else {
      response.status(500).json({error: `Unexpected error occurred for input: Date of birth: '${dateOfBirth}', Gender: '${gender}'`});
    }
  }
}

module.exports = requestStatePensionDate;
