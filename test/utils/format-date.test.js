'use strict';

const { equal } = require('node:assert/strict');
const { describe, it } = require('node:test');
const formatDate = require('../../src/utils/format-date');

describe('formatDate()', () => {
  it('returns a string', () => {
    equal(typeof formatDate(new Date()), 'string');
  });

  it('format YYYY-MM-DD', () => {
    equal(formatDate(new Date(2018, 9, 10)), '2018-10-10');
  });

  it('pad single digits with 0s', () => {
    equal(formatDate(new Date(2018, 0, 1)), '2018-01-01');
  });
});
