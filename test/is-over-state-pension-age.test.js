'use strict';

const { equal, throws } = require('node:assert/strict');
const { describe, it } = require('node:test');
const { isOverStatePensionAge } = require('../src/get-state-pension-date');

describe('isOverStatePensionAge()', () => {
  it('returns a boolean', () => {
    equal(typeof isOverStatePensionAge('1953-12-05'), 'boolean');
  });

  // Reuses getStatePensionDate() validation
  it('throws if date of birth is not valid', () => {
    throws(() => isOverStatePensionAge('fail'));
  });

  it('returns true when SPA date is in the past', () => {
    equal(isOverStatePensionAge('1953-12-05'), true);
  });

  it('returns true when SPA date is today', (t) => {
    // Freeze date so SPA date for 1954-03-25 is always 'today'
    t.mock.timers.enable({ apis: ['Date'] });
    t.mock.timers.tick(new Date(2019, 8, 6).getTime());

    equal(isOverStatePensionAge('1954-03-25'), true);
  });

  it('returns false when SPA date is in the future', () => {
    equal(isOverStatePensionAge('1990-12-05'), false);
  });
});
