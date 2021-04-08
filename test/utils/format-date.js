'use strict';

const t = require('tap');
const formatDate = require('../../src/utils/format-date');

t.type(formatDate(new Date()), 'string', 'returns a string');
t.equal(formatDate(new Date(2018, 9, 10)), '2018-10-10', 'format YYYY-MM-DD');
t.equal(formatDate(new Date(2018, 0, 1)), '2018-01-01', 'pad single digits with 0s');
