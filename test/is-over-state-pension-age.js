'use strict';

const t = require('tap');
const timekeeper = require('timekeeper');
const {isOverStatePensionAge: overSPA} = require('../src/get-state-pension-date');

// Freeze date so SPA date for 1954-03-25 is always 'today'
timekeeper.freeze(new Date(2019, 8, 6));

// Return type
t.type(overSPA('1953-12-05'), 'boolean', 'returns a boolean');

// Reuses getStatePensionDate() validation
t.throws(() => overSPA('fail'), 'throws if date of birth is not valid');

// Tests
t.ok(overSPA('1953-12-05'), 'true when SPA date is in the past');
t.ok(overSPA('1954-03-25'), 'true when SPA date is today');
t.notOk(overSPA('1990-12-05'), 'false when SPA date is in the future');

timekeeper.reset();
