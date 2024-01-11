'use strict';

const { equal } = require('node:assert/strict');
const { describe, it } = require('node:test');
const { getStatePensionDateAsString } = require('../src/get-state-pension-date');

describe('getStatePensionAsString()', () => {
  it('returns a string', () => {
    equal(typeof getStatePensionDateAsString('1953-12-05', 'male'), 'string');
  });

  it('returns a string in YYYY-MM-DD format', () => {
    equal(getStatePensionDateAsString('1953-12-05', 'male'), '2018-12-05');
  });
});
