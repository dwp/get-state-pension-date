'use strict';

const t = require('tap');
const isValidDate = require('../../src/utils/is-valid-date-string');

t.type(isValidDate('2018-01-01'), 'boolean', 'returns a boolean');

t.test('Invalid formats', async t => {
  t.notOk(isValidDate('2018 12 31'), 'YYYY MM DD');
  t.notOk(isValidDate('2018 31 12'), 'YYYY DD MM');
  t.notOk(isValidDate('31-01-2018'), 'DD-MM-YYYY');
  t.notOk(isValidDate('01-31-2018'), 'MM-DD-YYYY');
  t.notOk(isValidDate('2018-12-0'), '1 digit zero day');
  t.notOk(isValidDate('2018-12-00'), '2 digit zero day');
  t.notOk(isValidDate('2018-0-01'), '1 digit zero month');
  t.notOk(isValidDate('2018-00-01'), '2 digit zero month');
  t.notOk(isValidDate('2018-13-01'), '13th month');
  t.notOk(isValidDate('201-01-01'), '3 digit year');
  t.notOk(isValidDate('20-01-01'), '2 digit year');
  t.notOk(isValidDate('2-01-01'), '1 digit year');
});

t.test('Support single character month/date', async t => {
  t.ok(isValidDate('2018-01-1'), 'single character day');
  t.ok(isValidDate('2018-1-01'), 'single character month');
  t.ok(isValidDate('2018-1-1'), 'single character day and month');
});

t.test('January', async t => {
  t.ok(isValidDate('2018-01-01'), '1st');
  t.ok(isValidDate('2018-01-31'), '31st');
  t.notOk(isValidDate('2018-01-32'), 'no 32nd');
});

t.test('Febuary in a non leap year', async t => {
  t.ok(isValidDate('2018-02-01'), '1st');
  t.ok(isValidDate('2018-02-28'), '28th');
  t.notOk(isValidDate('2018-02-29'), 'no 29th');
});

t.test('Febuary in a leap year', async t => {
  t.ok(isValidDate('2000-02-01'), '1st');
  t.ok(isValidDate('2000-02-29'), '29th');
  t.notOk(isValidDate('2000-02-30'), 'no 30th');
});

t.test('March', async t => {
  t.ok(isValidDate('2018-03-01'), '1st');
  t.ok(isValidDate('2018-03-31'), '31st');
  t.notOk(isValidDate('2018-03-32'), 'no 32nd');
});

t.test('April', async t => {
  t.ok(isValidDate('2018-04-01'), '1st');
  t.ok(isValidDate('2018-04-30'), '30th');
  t.notOk(isValidDate('2018-04-31'), 'no 31st');
});

t.test('May', async t => {
  t.ok(isValidDate('2018-05-01'), '1st');
  t.ok(isValidDate('2018-05-31'), '31st');
  t.notOk(isValidDate('2018-05-32'), 'no 32nd');
});

t.test('June', async t => {
  t.ok(isValidDate('2018-06-01'), '1st');
  t.ok(isValidDate('2018-06-30'), '30th');
  t.notOk(isValidDate('2018-06-31'), 'no 31st');
});

t.test('July', async t => {
  t.ok(isValidDate('2018-07-01'), '1st');
  t.ok(isValidDate('2018-07-31'), '31st');
  t.notOk(isValidDate('2018-07-32'), 'no 32nd');
});

t.test('August', async t => {
  t.ok(isValidDate('2018-08-01'), '1st');
  t.ok(isValidDate('2018-08-31'), '31st');
  t.notOk(isValidDate('2018-08-32'), 'no 32nd');
});

t.test('September', async t => {
  t.ok(isValidDate('2018-09-01'), '1st');
  t.ok(isValidDate('2018-09-30'), '30th');
  t.notOk(isValidDate('2018-09-31'), 'no 31st');
});

t.test('October', async t => {
  t.ok(isValidDate('2018-10-01'), '1st');
  t.ok(isValidDate('2018-10-31'), '31st');
  t.notOk(isValidDate('2018-10-32'), 'no 32nd');
});

t.test('November', async t => {
  t.ok(isValidDate('2018-11-01'), '1st');
  t.ok(isValidDate('2018-11-30'), '30th');
  t.notOk(isValidDate('2018-11-31'), 'no 31st');
});

t.test('December', async t => {
  t.ok(isValidDate('2018-12-01'), '1st');
  t.ok(isValidDate('2018-12-31'), '31st');
  t.notOk(isValidDate('2018-12-32'), 'no 32nd');
});
