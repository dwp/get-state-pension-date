const assert = require('assert');
const {getStatePensionDate} = require('../src/get-state-pension-date');
const {getStatePensionDateAsString} = require('../src/get-state-pension-date');

describe('Parameter validation checks', () => {
  describe('Checking in/valid gender variations. So, getStatePensionDateAsString', () => {
    //
    // Ability to use 'male' & 'female' as gender values
    //
    // Verify we can supply 'female' insted of 'f' as a gender
    it('should return 2088-02-29 when a DOB of 2020-02-29 is applied to a gender of \'female\'', () => {
      assert.equal('2088-02-29', getStatePensionDateAsString('2020-02-29', 'female'));
    });

    // Verify we can supply 'male' insted of 'm' as a gender
    it('should return 2088-02-29 when a DOB of 2020-02-29 is applied to a gender of \'male\'', () => {
      assert.equal('2088-02-29', getStatePensionDateAsString('2020-02-29', 'male'));
    });

    // Verify we can supply 'FEMALE' insted of 'f' as a gender
    it('should return 2088-02-29 when a DOB of 2020-02-29 is applied to a gender of \'FEMALE\'', () => {
      assert.equal('2088-02-29', getStatePensionDateAsString('2020-02-29', 'FEMALE'));
    });

    // Verify we can supply 'FEMALE' insted of 'm' as a gender
    it('should return 2088-02-29 when a DOB of 2020-02-29 is applied to a gender of \'MALE\'', () => {
      assert.equal('2088-02-29', getStatePensionDateAsString('2020-02-29', 'MALE'));
    });

    // Verify we cannot supply 'FE' as a gender
    it('should return undefined when a DOB of 2020-02-29 is applied to a gender of \'FE\'', () => {
      assert.throws(() => getStatePensionDateAsString('2020-02-29', 'FE'), TypeError);
    });

    // Verify we cannot supply 'MA' as a gender
    it('should return undefined when a DOB of 2020-02-29 is applied to a gender of \'MA\'', () => {
      assert.throws(() => getStatePensionDateAsString('2020-02-29', 'MA'), TypeError);
    });
  });

  describe('Checking in/valid date variations. So, getStatePensionDate', () => {
    // Date without padded values should be sanitized (Ensure day & month are padded to 2 chars)
    it('should return 2019-11-06 when a DOB of 1954-4-6 and \'F\' is supplied', () => {
      assert.equal('2019-11-06', getStatePensionDateAsString('1954-4-6', 'F'));
    });

    it('should return 2020-03-06 when a DOB of 1954-6-06 and \'M\' is supplied', () => {
      assert.equal('2020-03-06', getStatePensionDateAsString('1954-6-06', 'M'));
    });

    it('should return 2020-07-06 when a DOB of 1954-08-6 and \'F\' is supplied', () => {
      assert.equal('2020-07-06', getStatePensionDateAsString('1954-08-6', 'F'));
    });

    // Invalid year
    it('should return \'TypeError\' as out of accepted range 1000-400 when a DOB of 4001-12-05 is supplied with \'M\'', () => {
      assert.throws(() => getStatePensionDate('4001-12-05', 'M'), TypeError);
    });

    it('********should return \'TypeError\'as out of accepted range 1-12 when a DOB of 1981-13-05 is supplied with \'M\'', () => {
      assert.throws(() => getStatePensionDate('1981-13-05', 'M'), TypeError);
    });

    // Invalid year
    it('should return \'TypeError\' when a DOB of 195-12-05 is supplied with \'M\'', () => {
      assert.throws(() => getStatePensionDate('195-12-05', 'M'), TypeError);
    });

    it('should return \'TypeError\' when a DOB of 19521205 is supplied with \'M\'', () => {
      assert.throws(() => getStatePensionDate('19521205', 'M'), TypeError);
    });

    it('should return \'TypeError\' when a DOB of 1952-12-05 is supplied with \'N\'', () => {
      assert.throws(() => getStatePensionDate('1952-12-05', 'N'), TypeError);
    });

    it('should return \'TypeError\' when a DOB of -- is supplied with \'F\'', () => {
      assert.throws(() => getStatePensionDate('--', 'F'), TypeError);
    });

    it('should return \'TypeError\' when a DOB of 1960/01/01 is supplied with \'F\'', () => {
      assert.throws(() => getStatePensionDate('1960/01/01', 'F'), TypeError);
    });

    it('should return \'TypeError\' when a DOB of 02-08-1999 is supplied with \'F\'', () => {
      assert.throws(() => getStatePensionDate('02-08-1999', 'F'), TypeError);
    });

    it('should return \'TypeError\' when a DOB of 1990-02-30 is supplied with \'M\'', () => {
      assert.throws(() => getStatePensionDate('1990-02-30', 'M'), TypeError);
    });

    it('should return \'TypeError\' when a DOB of 2017-02-29 is supplied with \'M\'', () => {
      assert.throws(() => getStatePensionDate('2017-02-29', 'M'), TypeError);
    });

    // Without a gender, we can't be expected to match a rule
    it('should return \'TypeError\' when a DOB of 1952-12-05 is supplied without gender', () => {
      assert.throws(() => getStatePensionDate('1952-12-05'), TypeError);
    });

    // Without a gender, we can't be expected to match a rule
    it('should return \'TypeError\' when a DOB of 1950-04-05 is supplied with \'\'', () => {
      assert.throws(() => getStatePensionDate('1952-12-05', ''), TypeError);
    });

    // Without a gender, we can't be expected to match a rule
    it('should return \'TypeError\' when a DOB of 1950-04-05 is supplied with \'       \'', () => {
      assert.throws(() => getStatePensionDate('1952-12-05', '        '), TypeError);
    });
  });
});
