'use strict';

const { equal } = require('node:assert/strict');
const { describe, it } = require('node:test');
const isValidDate = require('../../src/utils/is-valid-date-string');

describe('isValidDate()', () => {
  it('returns a boolean', () => {
    equal(typeof isValidDate('2018-01-01'), 'boolean');
  });

  describe('validates input string format', () => {
    it('YYYY MM DD', () => {
      equal(isValidDate('2018 12 31'), false);
    });

    it('YYYY DD MM', () => {
      equal(isValidDate('2018 31 12'), false);
    });

    it('DD-MM-YYYY', () => {
      equal(isValidDate('31-01-2018'), false);
    });

    it('MM-DD-YYYY', () => {
      equal(isValidDate('01-31-2018'), false);
    });

    it('1 digit zero day', () => {
      equal(isValidDate('2018-12-0'), false);
    });

    it('2 digit zero day', () => {
      equal(isValidDate('2018-12-00'), false);
    });

    it('1 digit zero month', () => {
      equal(isValidDate('2018-0-01'), false);
    });

    it('2 digit zero month', () => {
      equal(isValidDate('2018-00-01'), false);
    });

    it('13th month', () => {
      equal(isValidDate('2018-13-01'), false);
    });

    it('3 digit year', () => {
      equal(isValidDate('201-01-01'), false);
    });

    it('2 digit year', () => {
      equal(isValidDate('20-01-01'), false);
    });

    it('1 digit year', () => {
      equal(isValidDate('2-01-01'), false);
    });
  });

  describe('supports single character month/date', () => {
    it('single character day', () => {
      equal(isValidDate('2018-01-1'), true);
    });

    it('supports single character month', () => {
      equal(isValidDate('2018-1-01'), true);
    });

    it('supports single character day and month', () => {
      equal(isValidDate('2018-1-1'), true);
    });
  });

  describe('January dates', () => {
    it('1st', () => {
      equal(isValidDate('2018-01-01'), true);
    });

    it('31st', () => {
      equal(isValidDate('2018-01-31'), true);
    });

    it('32nd', () => {
      equal(isValidDate('2018-01-32'), false);
    });
  });

  describe('Febuary dates in a non leap year', () => {
    it('1st', () => {
      equal(isValidDate('2018-02-01'), true);
    });

    it('28th', () => {
      equal(isValidDate('2018-02-28'), true);
    });

    it('no 29th', () => {
      equal(isValidDate('2018-02-29'), false);
    });
  });

  describe('Febuary dates in a leap year', () => {
    it('1st', () => {
      equal(isValidDate('2000-02-01'), true);
    });

    it('29th', () => {
      equal(isValidDate('2000-02-29'), true);
    });

    it('no 30th', () => {
      equal(isValidDate('2000-02-30'), false);
    });
  });

  describe('March dates', () => {
    it('1st', () => {
      equal(isValidDate('2018-03-01'), true);
    });

    it('31st', () => {
      equal(isValidDate('2018-03-31'), true);
    });

    it('no 32nd', () => {
      equal(isValidDate('2018-03-32'), false);
    });
  });

  describe('April dates', () => {
    it('1st', () => {
      equal(isValidDate('2018-04-01'), true);
    });

    it('30th', () => {
      equal(isValidDate('2018-04-30'), true);
    });

    it('no 31st', () => {
      equal(isValidDate('2018-04-31'), false);
    });
  });

  describe('May dates', () => {
    it('1st', () => {
      equal(isValidDate('2018-05-01'), true);
    });

    it('31st', () => {
      equal(isValidDate('2018-05-31'), true);
    });

    it('no 32nd', () => {
      equal(isValidDate('2018-05-32'), false);
    });
  });

  describe('June dates', () => {
    it('1st', () => {
      equal(isValidDate('2018-06-01'), true);
    });

    it('30th', () => {
      equal(isValidDate('2018-06-30'), true);
    });

    it('no 31st', () => {
      equal(isValidDate('2018-06-31'), false);
    });
  });

  describe('July dates', () => {
    it('1st', () => {
      equal(isValidDate('2018-07-01'), true);
    });

    it('31st', () => {
      equal(isValidDate('2018-07-31'), true);
    });

    it('no 32nd', () => {
      equal(isValidDate('2018-07-32'), false);
    });
  });

  describe('August dates', () => {
    it('1st', () => {
      equal(isValidDate('2018-08-01'), true);
    });

    it('31st', () => {
      equal(isValidDate('2018-08-31'), true);
    });

    it('no 32nd', () => {
      equal(isValidDate('2018-08-32'), false);
    });
  });

  describe('September dates', () => {
    it('1st', () => {
      equal(isValidDate('2018-09-01'), true);
    });

    it('30th', () => {
      equal(isValidDate('2018-09-30'), true);
    });

    it('no 31st', () => {
      equal(isValidDate('2018-09-31'), false);
    });
  });

  describe('October dates', () => {
    it('1st', () => {
      equal(isValidDate('2018-10-01'), true);
    });

    it('31st', () => {
      equal(isValidDate('2018-10-31'), true);
    });

    it('no 32nd', () => {
      equal(isValidDate('2018-10-32'), false);
    });
  });

  describe('November dates', () => {
    it('1st', () => {
      equal(isValidDate('2018-11-01'), true);
    });

    it('30th', () => {
      equal(isValidDate('2018-11-30'), true);
    });

    it('no 31st', () => {
      equal(isValidDate('2018-11-31'), false);
    });
  });

  describe('December dates', () => {
    it('1st', () => {
      equal(isValidDate('2018-12-01'), true);
    });

    it('31st', () => {
      equal(isValidDate('2018-12-31'), true);
    });

    it('no 32nd', () => {
      equal(isValidDate('2018-12-32'), false);
    });
  });
});
