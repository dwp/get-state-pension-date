'use strict';

const t = require('tap');
const {getStatePensionDateAsString} = require('../src/get-state-pension-date');

const spaDate = getStatePensionDateAsString('1953-12-05', 'male');

t.type(spaDate, 'string', 'returns a string');
t.equal(spaDate, '2018-12-05', 'returns a string in YYYY-MM-DD format');
