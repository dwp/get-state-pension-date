'use strict';

const t = require('tap');
const timekeeper = require('timekeeper');
const {isOverStatePensionAge} = require('../src/get-state-pension-date');

// Freeze date so SPA date for 1954-03-25 is always 'today'
timekeeper.freeze(new Date(2019, 8, 6));

// Return type
t.type(isOverStatePensionAge('1953-12-05', 'male'), 'boolean', 'returns a boolean');

// Tests
t.ok(isOverStatePensionAge('1953-12-05', 'male'), 'true when SPA date is in the past');
t.ok(isOverStatePensionAge('1954-03-25', 'female'), 'true when SPA date is today');
t.notOk(isOverStatePensionAge('1990-12-05', 'female'), 'false when SPA date is in the future');

timekeeper.reset();
