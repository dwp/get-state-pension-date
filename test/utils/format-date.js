'use strict';

const assert = require('assert');

const formatDate = require('../../src/utils/format-date');

describe('formatDate()', () => {
  it('should return a string', () => {
    assert.strictEqual(typeof formatDate(new Date()), 'string');
  });

  it('should return a YYYY-MM-DD formatted string', () => {
    assert.strictEqual(formatDate(new Date('2018-10-10')), '2018-10-10');
  });

  it('should pad single digits with 0s', () => {
    assert.strictEqual(formatDate(new Date('2018-1-1')), '2018-01-01');
  });
});
