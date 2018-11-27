'use strict';
const assert = require('assert');
const proxyquire = require('proxyquire');

const requestStatePensionDate = require('../src/request-state-pension-date.js');
const FakeRequest = require('./helpers/fake-request');
const FakeResponse = require('./helpers/fake-response');

describe('Request to getStatePensionDate end point returns success response', () => {
  const request = new FakeRequest();
  const response = new FakeResponse();
  request.params = {dateOfBirth: '1953-12-05', gender: 'M'};

  it('Should return a valid date and status code 200', () => {
    requestStatePensionDate(request, response);
    assert.deepEqual(response.body, '{"statePensionDate":"2018-12-05T00:00:00.000Z"}');
    assert.equal(response.statusCode, 200);
  });
});

describe('Request to getStatePensionDate end point returns Error invalid input response', () => {
  const request = new FakeRequest();
  const response = new FakeResponse();
  request.params = {dateOfBirth: '1953-12-', gender: 'M'};

  it('Should return an Error JSON and status code 400', () => {
    requestStatePensionDate(request, response);
    assert.deepEqual(response.body, '{"error":"The client input was invalid: Date of birth: \'1953-12-\', Gender: \'M\'"}');
    assert.equal(response.statusCode, 400);
  });
});

describe('Request to getStatePensionDate end point returns Error unexpected error response', () => {
  const request = new FakeRequest();
  const response = new FakeResponse();

  request.params = {dateOfBirth: '1981-12-05', gender: 'M'};

  it('Should return an Error JSON and status code 500 when no data could be matched', () => {
    const testFunct = {
      getStatePensionDate() {
        throw new TypeError('No match found for input');
      }
    };
    const proxyRequestStatePensionDate = proxyquire('../src/request-state-pension-date', {'../src/get-state-pension-date': testFunct});

    proxyRequestStatePensionDate(request, response);
    assert.deepEqual(response.body, '{"error":"Input returned no result for input: Date of birth: \'1981-12-05\', Gender: \'M\'"}');
    assert.equal(response.statusCode, 500);
  });

  it('Should return an Error JSON and status code 500 when there\'s an unexpected Error', () => {
    const testFunct = {
      getStatePensionDate() {
        throw new TypeError('Unexpected happening');
      }
    };
    const proxyRequestStatePensionDate = proxyquire('../src/request-state-pension-date', {'../src/get-state-pension-date': testFunct});

    proxyRequestStatePensionDate(request, response);
    assert.deepEqual(response.body, '{"error":"Unexpected error occurred for input: Date of birth: \'1981-12-05\', Gender: \'M\'"}');
    assert.equal(response.statusCode, 500);
  });

  it('Should return an Error JSON and status code 500 when statePensionDate is not a Date', () => {
    const testFunct = {
      getStatePensionDate() {
        return 'not a date';
      }
    };
    const proxyRequestStatePensionDate = proxyquire('../src/request-state-pension-date', {'../src/get-state-pension-date': testFunct});

    proxyRequestStatePensionDate(request, response);
    assert.deepEqual(response.body, '{"error":"Unexpected error occurred for input: Date of birth: \'1981-12-05\', Gender: \'M\'"}');
    assert.equal(response.statusCode, 500);
  });
});
