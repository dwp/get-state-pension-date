'use strict';

const assert = require('assert');

const isValidDate = require('../../src/utils/is-valid-date-string');

describe('isValidDate()', () => {
  describe('Return type', () => {
    it('should return a boolean', () => {
      assert.strictEqual(typeof isValidDate('2018-01-01'), 'boolean');
    });
  });

  describe('Format', () => {
    it('should return true for 2018-01-01', () => {
      assert.strictEqual(isValidDate('2018-01-01'), true);
    });

    it('should return true for 2018-1-1', () => {
      assert.strictEqual(isValidDate('2018-1-1'), true);
    });

    it('should return true for 2018-1-31', () => {
      assert.strictEqual(isValidDate('2018-1-31'), true);
    });

    it('should return true for 2018-12-31', () => {
      assert.strictEqual(isValidDate('2018-12-31'), true);
    });

    it('should return false for 2018 12 31', () => {
      assert.strictEqual(isValidDate('2018 12 31'), false);
    });

    it('should return false for 01-01-2018', () => {
      assert.strictEqual(isValidDate('01-01-2018'), false);
    });
  });

  describe('Real dates', () => {
    it('should return true for 1 - 31 January', () => {
      assert.strictEqual(isValidDate('2018-01-01'), true);
      assert.strictEqual(isValidDate('2018-01-31'), true);
    });

    it('should return false for 32 January', () => {
      assert.strictEqual(isValidDate('2018-01-32'), false);
    });

    it('should return true for 1 - 28 Febuary in a non leap year', () => {
      assert.strictEqual(isValidDate('2018-02-01'), true);
      assert.strictEqual(isValidDate('2018-02-28'), true);
    });

    it('should return false for 29 Febuary in a non leap year', () => {
      assert.strictEqual(isValidDate('2018-02-29'), false);
    });

    it('should return true for 1 - 29 Febuary in a leap year', () => {
      assert.strictEqual(isValidDate('2016-02-01'), true);
      assert.strictEqual(isValidDate('2016-02-29'), true);
      assert.strictEqual(isValidDate('2000-02-01'), true);
      assert.strictEqual(isValidDate('2000-02-29'), true);
    });

    it('should return false for 30 Febuary in a leap year', () => {
      assert.strictEqual(isValidDate('2000-02-30'), false);
      assert.strictEqual(isValidDate('2000-02-30'), false);
    });

    it('should return true for 1 - 31 March', () => {
      assert.strictEqual(isValidDate('2018-03-01'), true);
      assert.strictEqual(isValidDate('2018-03-31'), true);
    });

    it('should return false for 32 March', () => {
      assert.strictEqual(isValidDate('2018-03-32'), false);
    });

    it('should return true for 1 - 30 April', () => {
      assert.strictEqual(isValidDate('2018-04-01'), true);
      assert.strictEqual(isValidDate('2018-04-30'), true);
    });

    it('should return false for 31 April', () => {
      assert.strictEqual(isValidDate('2018-04-31'), false);
    });

    it('should return true for 1 - 31 May', () => {
      assert.strictEqual(isValidDate('2018-05-01'), true);
      assert.strictEqual(isValidDate('2018-05-31'), true);
    });

    it('should return false for 32 May', () => {
      assert.strictEqual(isValidDate('2018-05-32'), false);
    });

    it('should return true for 1 - 30 June', () => {
      assert.strictEqual(isValidDate('2018-06-01'), true);
      assert.strictEqual(isValidDate('2018-06-30'), true);
    });

    it('should return false for 31 June', () => {
      assert.strictEqual(isValidDate('2018-06-31'), false);
    });

    it('should return true for 1 - 31 July', () => {
      assert.strictEqual(isValidDate('2018-07-01'), true);
      assert.strictEqual(isValidDate('2018-07-31'), true);
    });

    it('should return false for 32 July', () => {
      assert.strictEqual(isValidDate('2018-07-32'), false);
    });

    it('should return true for 1 - 31 August', () => {
      assert.strictEqual(isValidDate('2018-08-01'), true);
      assert.strictEqual(isValidDate('2018-08-31'), true);
    });

    it('should return false for 32 August', () => {
      assert.strictEqual(isValidDate('2018-08-32'), false);
    });

    it('should return true for 1 - 30 September', () => {
      assert.strictEqual(isValidDate('2018-09-01'), true);
      assert.strictEqual(isValidDate('2018-09-30'), true);
    });

    it('should return false for 31 September', () => {
      assert.strictEqual(isValidDate('2018-09-31'), false);
    });

    it('should return true for 1 - 31 October', () => {
      assert.strictEqual(isValidDate('2018-10-01'), true);
      assert.strictEqual(isValidDate('2018-10-31'), true);
    });

    it('should return false for 32 October', () => {
      assert.strictEqual(isValidDate('2018-10-32'), false);
    });

    it('should return true for 1 - 30 November', () => {
      assert.strictEqual(isValidDate('2018-11-01'), true);
      assert.strictEqual(isValidDate('2018-11-30'), true);
    });

    it('should return false for 31 November', () => {
      assert.strictEqual(isValidDate('2018-11-31'), false);
    });

    it('should return true for 1 - 31 December', () => {
      assert.strictEqual(isValidDate('2018-12-01'), true);
      assert.strictEqual(isValidDate('2018-12-31'), true);
    });

    it('should return false for 32 December', () => {
      assert.strictEqual(isValidDate('2018-12-32'), false);
    });

    it('should return false for 0 days', () => {
      assert.strictEqual(isValidDate('2018-12-0'), false);
      assert.strictEqual(isValidDate('2018-12-00'), false);
    });

    it('should return false for 0 month', () => {
      assert.strictEqual(isValidDate('2018-0-01'), false);
      assert.strictEqual(isValidDate('2018-00-01'), false);
    });

    it('should return false for 13 month', () => {
      assert.strictEqual(isValidDate('2018-13-01'), false);
    });
  });
});
