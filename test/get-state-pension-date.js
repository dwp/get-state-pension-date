'use strict';

const assert = require('assert');
const timekeeper = require('timekeeper');
const {getStatePensionDate, getStatePensionDateAsString, isOverStatePensionAge} = require('../src/get-state-pension-date');

describe('getStatePensionDate()', () => {
  describe('Input validation', () => {
    it('should throw a TypeError when date of birth is not a string', () => {
      assert.throws(() => getStatePensionDate(9, 'male'), TypeError);
    });

    it('should throw a TypeError when gender is not a string', () => {
      assert.throws(() => getStatePensionDate('1950-03-05', false), TypeError);
    });

    it('should throw an Error when gender is a string but not male or female', () => {
      assert.throws(() => getStatePensionDate('1950-03-05', 'test'), Error);
    });

    it('should throw an Error when date of birth is a string but not a valid date', () => {
      assert.throws(() => getStatePensionDate('1950-00-00', 'female'), Error);
    });

    it('should return the same value for dates with and without leading zeros', () => {
      const zeroSPA = getStatePensionDate('1954-03-05', 'male');
      const noZeroSPA = getStatePensionDate('1954-3-5', 'male');
      assert.deepStrictEqual(zeroSPA, noZeroSPA);
    });
  });

  describe('Return type', () => {
    it('should return a Date', () => {
      assert.strictEqual(getStatePensionDate('1953-12-05', 'male') instanceof Date, true);
    });
  });

  describe('Men born before 6 Dec 1953 retire at 65. So, getStatePensionDate', () => {
    // Men born before 6 Dec 1953 retire at 65
    it('should return 2018-12-05 when a DOB of 1953-12-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-12-05', 'male'), new Date(2018, 11, 5));
    });

    // Men born on a leap day before 6 Dec 1953
    it('should return 2017-03-01 when a DOB of 1952-02-29 (leap date) is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-02-29', 'male'), new Date(2017, 2, 1));
    });
  });

  describe('Women born before 6 Apr 1950 Retire at 60. So, getStatePensionDate', () => {
    // Women born before 6 Apr 1950 Retire at 60
    it('should return 2010-04-05 when a DOB of 1950-04-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1950-04-05', 'female'), new Date(2010, 3, 5));
    });
  });

  describe('Females born 6 Apr 1950 - 5 May 1950, retire on 6 May 2010. So, getStatePensionDate', () => {
    //
    // Pensions act 1995
    //
    // Females born 6 Apr 1950 - 5 May 1950
    it('should return 2010-05-06 when a DOB of 1950-04-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1950-04-06', 'female'), new Date(2010, 4, 6));
    });

    it('should return 2010-05-06 when a DOB of 1950-05-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1950-05-05', 'female'), new Date(2010, 4, 6));
    });

    it('should NOT return 2010-05-06 when a DOB of 1950-05-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1950-05-05', 'male'), new Date(2010, 4, 6));
    });
  });

  describe('Females born 6 May 1950 - 5 Jun 1950, retire on 6 Jul 2010. So, getStatePensionDate', () => {
    // Females born 6 May 1950 - 5 Jun 1950
    it('should return 2010-07-06 when a DOB of 1950-05-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1950-05-06', 'female'), new Date(2010, 6, 6));
    });

    it('should return 2010-07-06 when a DOB of 1950-06-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1950-06-05', 'female'), new Date(2010, 6, 6));
    });

    it('should NOT return 2010-07-06 when a DOB of 1950-07-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1950-06-05', 'male'), new Date(2010, 6, 6));
    });
  });

  describe('Females born 6 Jun 1950 - 5 Jul 1950, retire on 6 Sep 2010. So, getStatePensionDate', () => {
    // Females born 6 Jun 1950 - 5 Jul 1950
    it('should return 2010-09-06 when a DOB of 1950-06-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1950-06-06', 'female'), new Date(2010, 8, 6));
    });

    it('should return 2010-09-06 when a DOB of 1950-07-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1950-07-05', 'female'), new Date(2010, 8, 6));
    });

    it('should NOT return 2010-09-06 when a DOB of 1950-07-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1950-07-05', 'male'), new Date(2010, 8, 6));
    });
  });

  describe('Females born 6 Jul 1950 - 5 Aug 1950, retire on 6 Nov 2010. So, getStatePensionDate', () => {
    // Females born 6 Jul 1950 - 5 Aug 1950
    it('should return 2010-01-06 when a DOB of 1950-07-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1950-07-06', 'female'), new Date(2010, 10, 6));
    });

    it('should return 2010-11-06 when a DOB of 1950-08-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1950-08-05', 'female'), new Date(2010, 10, 6));
    });

    it('should NOT return 2010-09-06 when a DOB of 1950-07-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1950-08-05', 'male'), new Date(2010, 10, 6));
    });
  });

  describe('Females born 6 Aug 1950 - 5 Sep 1950, retire on 6 Jan 2011. So, getStatePensionDate', () => {
    // Females born 6 Aug 1950 - 5 Sep 1950
    it('should return 2011-01-06 when a DOB of 1950-08-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1950-08-06', 'female'), new Date(2011, 0, 6));
    });

    it('should return 2011-01-06 when a DOB of 1950-09-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1950-09-05', 'female'), new Date(2011, 0, 6));
    });

    it('should NOT return 2011-01-06 when a DOB of 1950-09-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1950-09-05', 'male'), new Date(2011, 0, 6));
    });
  });

  describe('Females born 6 Sep 1950 - 5 Oct 1950, retire on 6 Mar 2011. So, getStatePensionDate', () => {
    // Females born 6 Sep 1950 - 5 Oct 1950
    it('should return 2011-03-06 when a DOB of 1950-09-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1950-09-06', 'female'), new Date(2011, 2, 6));
    });

    it('should return 2011-03-06 when a DOB of 1950-10-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1950-10-05', 'female'), new Date(2011, 2, 6));
    });

    it('should NOT return 2011-03-06 when a DOB of 1950-10-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1950-10-05', 'male'), new Date(2011, 2, 6));
    });
  });

  describe('Females born 6 Oct 1950 - 5 Nov 1950, retire on 6 May 2011. So, getStatePensionDate', () => {
    // Females born 6 Oct 1950 - 5 Nov 1950
    it('should return 2011-05-06 when a DOB of 1950-10-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1950-10-06', 'female'), new Date(2011, 4, 6));
    });

    it('should return 2011-05-06 when a DOB of 1950-11-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1950-11-05', 'female'), new Date(2011, 4, 6));
    });

    it('should NOT return 2011-05-06 when a DOB of 1950-11-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1950-11-05', 'male'), new Date(2011, 4, 6));
    });
  });

  describe('Females born 6 Nov 1950 - 5 Dec 1950, retire on 6 Jul 2011. So, getStatePensionDate', () => {
    // Females born 6 nov 1950 - 5 Dec 1950
    it('should return 2011-07-06 when a DOB of 1950-11-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1950-11-06', 'female'), new Date(2011, 6, 6));
    });

    it('should return 2011-07-06 when a DOB of 1950-12-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1950-12-05', 'female'), new Date(2011, 6, 6));
    });

    it('should NOT return 2011-07-06 when a DOB of 1950-12-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1950-12-05', 'male'), new Date(2011, 6, 6));
    });
  });

  describe('Females born 6 Dec 1950 - 5 Jan 1951, retire on 6 Sep 2011. So, getStatePensionDate', () => {
    // Females born 6 Dec 1950 - 5 Jan 1951
    it('should return 2011-09-06 when a DOB of 1950-12-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1950-12-06', 'female'), new Date(2011, 8, 6));
    });

    it('should return 2011-09-06 when a DOB of 1951-01-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-01-05', 'female'), new Date(2011, 8, 6));
    });

    it('should NOT return 2011-09-06 when a DOB of 1951-01-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1951-01-05', 'male'), new Date(2011, 8, 6));
    });
  });

  describe('Females born 6 Jan 1951 - 5 Feb 1951, retire on 6 Nov 2011. So, getStatePensionDate', () => {
    // Females born 6 Jan 1951 - 5 Feb 1951
    it('should return 2011-11-06 when a DOB of 1951-01-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-01-06', 'female'), new Date(2011, 10, 6));
    });

    it('should return 2011-11-06 when a DOB of 1951-02-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-02-05', 'female'), new Date(2011, 10, 6));
    });

    it('should NOT return 2011-11-06 when a DOB of 1951-02-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1951-02-05', 'male'), new Date(2011, 10, 6));
    });
  });

  describe('Females born 6 Feb 1951 - 5 Mar 1951, retire on 6 Jan 2012. So, getStatePensionDate', () => {
    // Females born 6 Feb 1951 - 5 Mar 1951
    it('should return 2012-01-06 when a DOB of 1951-02-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-02-06', 'female'), new Date(2012, 0, 6));
    });

    it('should return 2012-01-06 when a DOB of 1951-03-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-03-05', 'female'), new Date(2012, 0, 6));
    });

    it('should NOT return 2012-01-06 when a DOB of 1951-03-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1951-03-05', 'male'), new Date(2012, 0, 6));
    });
  });

  describe('Females born 6 Mar 1951 - 5 Apr 1951, retire on 6 Mar 2012. So, getStatePensionDate', () => {
    // Females born 6 Mar 1951 - 5 Apr 1951
    it('should return 2012-03-06 when a DOB of 1951-03-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-03-06', 'female'), new Date(2012, 2, 6));
    });

    it('should return 2012-03-06 when a DOB of 1951-04-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-04-05', 'female'), new Date(2012, 2, 6));
    });

    it('should NOT return 2012-03-06 when a DOB of 1951-04-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1951-04-05', 'male'), new Date(2012, 2, 6));
    });
  });

  describe('Females born 6 Apr 1951 - 5 May 1951, retire on 6 May 2012. So, getStatePensionDate', () => {
    // Females born 6 Apr 1951 - 5 May 1951
    it('should return 2012-05-06 when a DOB of 1951-04-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-04-06', 'female'), new Date(2012, 4, 6));
    });

    it('should return 2012-05-06 when a DOB of 1951-05-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-05-05', 'female'), new Date(2012, 4, 6));
    });

    it('should NOT return 2012-05-06 when a DOB of 1951-05-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1951-05-05', 'male'), new Date(2012, 4, 6));
    });
  });

  describe('Females born 6 May 1951 - 5 Jun 1951, retire on 6 Jul 2012. So, getStatePensionDate', () => {
    // Females born 6 May 1951 - 5 Jun 1951
    it('should return 2012-07-06 when a DOB of 1951-05-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-05-06', 'female'), new Date(2012, 6, 6));
    });

    it('should return 2012-07-06 when a DOB of 1951-06-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-06-05', 'female'), new Date(2012, 6, 6));
    });

    it('should NOT return 2012-07-06 when a DOB of 1951-06-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1951-06-05', 'male'), new Date(2012, 6, 6));
    });
  });

  describe('Females born 6 Jun 1951 - 5 Jul 1951, retire on 6 Sep 2012. So, getStatePensionDate', () => {
    // Females born 6 Jun 1951 - 5 Jul 1951
    it('should return 2012-09-06 when a DOB of 1951-06-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-06-06', 'female'), new Date(2012, 8, 6));
    });

    it('should return 2012-09-06 when a DOB of 1951-07-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-07-05', 'female'), new Date(2012, 8, 6));
    });

    it('should NOT return 2012-09-06 when a DOB of 1951-07-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1951-07-05', 'male'), new Date(2012, 8, 6));
    });
  });

  describe('Females born 6 Jul 1951 - 5 Aug 1951, retire on 6 Nov 2012. So, getStatePensionDate', () => {
    // Females born 6 Jul 1951 - 5 Aug 1951
    it('should return 2012-11-06 when a DOB of 1951-07-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-07-06', 'female'), new Date(2012, 10, 6));
    });

    it('should return 2012-11-06 when a DOB of 1951-08-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-08-05', 'female'), new Date(2012, 10, 6));
    });

    it('should NOT return 2012-11-06 when a DOB of 1951-08-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1951-08-05', 'male'), new Date(2012, 10, 6));
    });
  });

  describe('Females born 6 Aug 1951 - 5 Sep 1951, retire on 6 Jan 2013. So, getStatePensionDate', () => {
    // Females born 6 Aug 1951 - 5 Sep 1951
    it('should return 2013-01-06 when a DOB of 1951-08-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-08-06', 'female'), new Date(2013, 0, 6));
    });

    it('should return 2013-01-06 when a DOB of 1951-09-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-09-05', 'female'), new Date(2013, 0, 6));
    });

    it('should NOT return 2013-01-06 when a DOB of 1951-09-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1951-09-05', 'male'), new Date(2013, 0, 6));
    });
  });

  describe('Females born 6 Sep 1951 - 5 Oct 1951, retire on 6 Mar 2013. So, getStatePensionDate', () => {
    // Females born 6 Sep 1951 - 5 Oct 1951
    it('should return 2013-03-06 when a DOB of 1951-09-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-09-06', 'female'), new Date(2013, 2, 6));
    });

    it('should return 2013-03-06 when a DOB of 1951-10-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-10-05', 'female'), new Date(2013, 2, 6));
    });

    it('should NOT return 2013-03-06 when a DOB of 1951-10-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1951-10-05', 'male'), new Date(2013, 2, 6));
    });
  });

  describe('Females born 6 Oct 1951 - 5 Nov 1951, retire on 6 May 2013. So, getStatePensionDate', () => {
    // Females born 6 Oct 1951 - 5 Nov 1951
    it('should return 2013-05-06 when a DOB of 1951-10-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-10-06', 'female'), new Date(2013, 4, 6));
    });

    it('should return 2013-05-06 when a DOB of 1951-11-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-11-05', 'female'), new Date(2013, 4, 6));
    });

    it('should NOT return 2013-05-06 when a DOB of 1951-11-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1951-11-05', 'male'), new Date(2013, 4, 6));
    });
  });

  describe('Females born 6 Nov 1951 - 5 Dec 1951, retire on 6 Jul 2013. So, getStatePensionDate', () => {
    // Females born 6 Nov 1951 - 5 Dec 1951
    it('should return 2013-07-06 when a DOB of 1951-11-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-11-06', 'female'), new Date(2013, 6, 6));
    });

    it('should return 2013-07-06 when a DOB of 1951-12-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-12-05', 'female'), new Date(2013, 6, 6));
    });

    it('should NOT return 2013-07-06 when a DOB of 1951-12-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1951-12-05', 'male'), new Date(2013, 6, 6));
    });
  });

  describe('Females born 6 Dec 1951 - 5 Jan 1951, retire on 6 Sep 2013. So, getStatePensionDate', () => {
    // Females born 6 Dec 1951 - 5 Jan 1952
    it('should return 2013-09-06 when a DOB of 1951-12-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1951-12-06', 'female'), new Date(2013, 8, 6));
    });

    it('should return 2013-09-06 when a DOB of 1952-01-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-01-05', 'female'), new Date(2013, 8, 6));
    });

    it('should NOT return 2013-09-06 when a DOB of 1952-01-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1952-01-05', 'male'), new Date(2013, 8, 6));
    });
  });

  describe('Females born 6 Jan 1952 - 5 Feb 1952, retire on 6 Nov 2013. So, getStatePensionDate', () => {
    // Females born 6 Jan 1952 - 5 Feb 1952
    it('should return 2013-11-06 when a DOB of 1952-01-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-01-06', 'female'), new Date(2013, 10, 6));
    });

    it('should return 2013-11-06 when a DOB of 1952-02-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-02-05', 'female'), new Date(2013, 10, 6));
    });

    it('should NOT return 2013-11-06 when a DOB of 1952-02-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1952-02-05', 'male'), new Date(2013, 10, 6));
    });
  });

  describe('Females born 6 Feb 1952 - 5 Mar 1952, retire on 6 Jan 2014. So, getStatePensionDate', () => {
    // Females born 6 Feb 1952 - 5 Mar 1952
    it('should return 2014-01-06 when a DOB of 1952-02-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-02-06', 'female'), new Date(2014, 0, 6));
    });

    it('should return 2014-01-06 when a DOB of 1952-03-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-03-05', 'female'), new Date(2014, 0, 6));
    });

    it('should NOT return 2014-01-06 when a DOB of 1952-03-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1952-03-05', 'male'), new Date(2014, 0, 6));
    });
  });

  describe('Females born 6 Mar 1952 - 5 Apr 1952, retire on 6 Mar 2014. So, getStatePensionDate', () => {
    // Females born 6 Mar 1952 - 5 Apr 1952
    it('should return 2014-03-06 when a DOB of 1952-03-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-03-06', 'female'), new Date(2014, 2, 6));
    });

    it('should return 2014-03-06 when a DOB of 1952-04-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-04-05', 'female'), new Date(2014, 2, 6));
    });

    it('should NOT return 2014-03-06 when a DOB of 1952-04-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1952-04-05', 'male'), new Date(2014, 2, 6));
    });
  });

  describe('Females born 6 Apr 1952 - 5 May 1952, retire on 6 May 2014. So, getStatePensionDate', () => {
    // Females born 6 Apr 1952 - 5 May 1952
    it('should return 2014-05-06 when a DOB of 1952-04-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-04-06', 'female'), new Date(2014, 4, 6));
    });

    it('should return 2014-05-06 when a DOB of 1952-05-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-05-05', 'female'), new Date(2014, 4, 6));
    });

    it('should NOT return 2014-05-06 when a DOB of 1952-05-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1952-05-05', 'male'), new Date(2014, 4, 6));
    });
  });

  describe('Females born 6 May 1952 - 5 Jun 1952, retire on 6 Jul 2014. So, getStatePensionDate', () => {
    // Females born 6 May 1952 - 5 Jun 1952
    it('should return 2014-07-06 when a DOB of 1952-05-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-05-06', 'female'), new Date(2014, 6, 6));
    });

    it('should return 2014-07-06 when a DOB of 1952-06-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-06-05', 'female'), new Date(2014, 6, 6));
    });

    it('should NOT return 2014-07-06 when a DOB of 1952-06-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1952-06-05', 'male'), new Date(2014, 6, 6));
    });
  });

  describe('Females born 6 Jun 1952 - 5 Jul 1952, retire on 6 Sep 2014. So, getStatePensionDate', () => {
    // Females born 6 Jun 1952 - 5 Jul 1952
    it('should return 2014-09-06 when a DOB of 1952-06-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-06-06', 'female'), new Date(2014, 8, 6));
    });

    it('should return 2014-09-06 when a DOB of 1952-07-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-07-05', 'female'), new Date(2014, 8, 6));
    });

    it('should NOT return 2014-09-06 when a DOB of 1952-07-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1952-07-05', 'male'), new Date(2014, 8, 6));
    });
  });

  describe('Females born 6 Jul 1952 - 5 Aug 1952, retire on 6 Nov 2014. So, getStatePensionDate', () => {
    // Females born 6 Jul 1952 - 5 Aug 1952
    it('should return 2014-11-06 when a DOB of 1952-07-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-07-06', 'female'), new Date(2014, 10, 6));
    });

    it('should return 2014-11-06 when a DOB of 1952-08-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-08-05', 'female'), new Date(2014, 10, 6));
    });

    it('should NOT return 2014-11-06 when a DOB of 1952-08-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1952-08-05', 'male'), new Date(2014, 10, 6));
    });
  });

  describe('Females born 6 Aug 1952 - 5 Sep 1952, retire on 6 Jan 2015. So, getStatePensionDate', () => {
    // Females born 6 Aug 1952 - 5 Sep 1952
    it('should return 2015-01-06 when a DOB of 1952-08-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-08-06', 'female'), new Date(2015, 0, 6));
    });

    it('should return 2015-01-06 when a DOB of 1952-09-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-09-05', 'female'), new Date(2015, 0, 6));
    });

    it('should NOT return 2015-01-06 when a DOB of 1952-09-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1952-09-05', 'male'), new Date(2015, 0, 6));
    });
  });

  describe('Females born 6 Sep 1952 - 5 Oct 1952, retire on 6 Mar 2015. So, getStatePensionDate', () => {
    // Females born 6 Sep 1952 - 5 Oct 1952
    it('should return 2015-03-06 when a DOB of 1952-09-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-09-06', 'female'), new Date(2015, 2, 6));
    });

    it('should return 2015-03-06 when a DOB of 1952-10-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-10-05', 'female'), new Date(2015, 2, 6));
    });

    it('should NOT return 2015-03-06 when a DOB of 1952-10-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1952-10-05', 'male'), new Date(2015, 2, 6));
    });
  });

  describe('Females born 6 Oct 1952 - 5 Nov 1952, retire on 6 May 2015. So, getStatePensionDate', () => {
    // Females born 6 Oct 1952 - 5 Nov 1952
    it('should return 2015-05-06 when a DOB of 1952-10-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-10-06', 'female'), new Date(2015, 4, 6));
    });

    it('should return 2015-05-06 when a DOB of 1952-11-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-11-05', 'female'), new Date(2015, 4, 6));
    });

    it('should NOT return 2015-05-06 when a DOB of 1952-11-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1952-11-05', 'male'), new Date(2015, 4, 6));
    });
  });

  describe('Females born 6 Nov 1952 - 5 Dec 1952, retire on 6 Jul 2015. So, getStatePensionDate', () => {
    // Females born 6 Nov 1952 - 5 Dec 1952
    it('should return 2015-07-06 when a DOB of 1952-11-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-11-06', 'female'), new Date(2015, 6, 6));
    });

    it('should return 2015-07-06 when a DOB of 1952-12-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-12-05', 'female'), new Date(2015, 6, 6));
    });

    it('should NOT return 2015-07-06 when a DOB of 1952-12-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1952-12-05', 'male'), new Date(2015, 6, 6));
    });
  });

  describe('Females born 6 Dec 1952 - 5 Jan 1953, retire on 6 Sep 2015. So, getStatePensionDate', () => {
    // Females born 6 Dec 1952 - 5 Jan 1953
    it('should return 2015-09-06 when a DOB of 1952-12-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1952-12-06', 'female'), new Date(2015, 8, 6));
    });

    it('should return 2015-09-06 when a DOB of 1953-01-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-01-05', 'female'), new Date(2015, 8, 6));
    });

    it('should NOT return 2015-09-06 when a DOB of 1953-01-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1953-01-05', 'male'), new Date(2015, 8, 6));
    });
  });

  describe('Females born 6 Jan 1953 - 5 Feb 1953, retire on 6 Nov 2015. So, getStatePensionDate', () => {
    // Females born 6 Jan 1953 - 5 Feb 1953
    it('should return 2015-11-06 when a DOB of 1953-01-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-01-06', 'female'), new Date(2015, 10, 6));
    });

    it('should return 2015-11-06 when a DOB of 1953-02-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-02-05', 'female'), new Date(2015, 10, 6));
    });

    it('should NOT return 2015-11-06 when a DOB of 1953-02-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1953-02-05', 'male'), new Date(2015, 10, 6));
    });
  });

  describe('Females born 6 Feb 1953 - 5 Mar 1953, retire on 6 Jan 2016. So, getStatePensionDate', () => {
    // Females born 6 Feb 1953 - 5 Mar 1953
    it('should return 2016-01-06 when a DOB of 1953-02-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-02-06', 'female'), new Date(2016, 0, 6));
    });

    it('should return 2016-01-06 when a DOB of 1953-03-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-03-05', 'female'), new Date(2016, 0, 6));
    });

    it('should NOT return 2016-01-06 when a DOB of 1953-03-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1953-03-05', 'male'), new Date(2016, 0, 6));
    });
  });

  describe('Females born 6 Mar 1953 - 5 Apr 1953, retire on 6 Mar 2016. So, getStatePensionDate', () => {
    // Females born 6 Mar 1953 - 5 Apr 1953
    it('should return 2016-03-06 when a DOB of 1953-03-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-03-06', 'female'), new Date(2016, 2, 6));
    });

    it('should return 2016-03-06 when a DOB of 1953-04-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-04-05', 'female'), new Date(2016, 2, 6));
    });

    it('should NOT return 2016-03-06 when a DOB of 1953-04-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1953-04-05', 'male'), new Date(2016, 2, 6));
    });
  });

  describe('Females born 6 Apr 1953 - 5 May 1953, retire on 6 Jul 2016. So, getStatePensionDate', () => {
    //
    // Pensions act 2011
    //
    // Females born 6 Apr 1953 - 5 May 1953
    it('should return 2016-07-06 when a DOB of 1953-04-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-04-06', 'female'), new Date(2016, 6, 6));
    });

    it('should return 2016-07-06 when a DOB of 1953-05-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-05-05', 'female'), new Date(2016, 6, 6));
    });

    it('should NOT return 2016-07-06 when a DOB of 1953-05-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1953-05-05', 'male'), new Date(2016, 6, 6));
    });
  });

  describe('Females born 6 May 1953 - 5 Jun 1953, retire on 6 Nov 2016. So, getStatePensionDate', () => {
    // Females born 6 May 1953 - 5 Jun 1953
    it('should return 2016-11-06 when a DOB of 1953-05-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-05-06', 'female'), new Date(2016, 10, 6));
    });

    it('should return 2016-11-06 when a DOB of 1953-06-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-06-05', 'female'), new Date(2016, 10, 6));
    });

    it('should NOT return 2016-11-06 when a DOB of 1953-06-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1953-06-05', 'male'), new Date(2016, 10, 6));
    });
  });

  describe('Females born 6 Jun 1953 - 5 Jul 1953, retire on 6 Mar 2017. So, getStatePensionDate', () => {
    // Females born 6 Jun 1953 - 5 Jul 1953
    it('should return 2017-03-06 when a DOB of 1953-06-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-06-06', 'female'), new Date(2017, 2, 6));
    });

    it('should return 2017-03-06 when a DOB of 1953-07-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-07-05', 'female'), new Date(2017, 2, 6));
    });

    it('should NOT return 2017-03-06 when a DOB of 1953-07-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1953-07-05', 'male'), new Date(2017, 2, 6));
    });
  });

  describe('Females born 6 Jul 1953 - 5 Aug 1953, retire on 6 Jul 2017. So, getStatePensionDate', () => {
    // Females born 6 Jul 1953 - 5 Aug 1953
    it('should return 2017-07-06 when a DOB of 1953-07-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-07-06', 'female'), new Date(2017, 6, 6));
    });

    it('should return 2017-07-06 when a DOB of 1953-08-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-08-05', 'female'), new Date(2017, 6, 6));
    });

    it('should NOT return 2017-07-06 when a DOB of 1953-08-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1953-08-05', 'male'), new Date(2017, 6, 6));
    });
  });

  describe('Females born 6 Aug 1953 - 5 Sep 1953, retire on 6 Nov 2017. So, getStatePensionDate', () => {
    // Females born 6 Aug 1953 - 5 Sep 1953
    it('should return 2017-11-06 when a DOB of 1953-08-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-08-06', 'female'), new Date(2017, 10, 6));
    });

    it('should return 2017-11-06 when a DOB of 1953-09-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-09-05', 'female'), new Date(2017, 10, 6));
    });

    it('should NOT return 2017-11-06 when a DOB of 1953-09-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1953-09-05', 'male'), new Date(2017, 10, 6));
    });
  });

  describe('Females born 6 Sep 1953 - 5 Oct 1953, retire on 6 Mar 2018. So, getStatePensionDate', () => {
    // Females born 6 Sep 1953 - 5 Oct 1953
    it('should return 2018-03-06 when a DOB of 1953-09-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-09-06', 'female'), new Date(2018, 2, 6));
    });

    it('should return 2018-03-06 when a DOB of 1953-10-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-10-05', 'female'), new Date(2018, 2, 6));
    });

    it('should NOT return 2018-03-06 when a DOB of 1953-10-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1953-10-05', 'male'), new Date(2018, 2, 6));
    });
  });

  describe('Females born 6 Oct 1953 - 5 Nov 1953, retire on 6 Jul 2018. So, getStatePensionDate', () => {
    // Females born 6 Oct 1953 - 5 Nov 1953
    it('should return 2018-07-06 when a DOB of 1953-10-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-10-06', 'female'), new Date(2018, 6, 6));
    });

    it('should return 2018-07-06 when a DOB of 1953-11-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-11-05', 'female'), new Date(2018, 6, 6));
    });

    it('should NOT return 2018-07-06 when a DOB of 1953-11-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1953-11-05', 'male'), new Date(2018, 6, 6));
    });
  });

  describe('Females born 6 Nov 1953 - 5 Dec 1953, retire on 6 Nov 2018. So, getStatePensionDate', () => {
    // Females born 6 Nov 1953 - 5 Dec 1953
    it('should return 2018-11-06 when a DOB of 1953-11-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-11-06', 'female'), new Date(2018, 10, 6));
    });

    it('should return 2018-11-06 when a DOB of 1953-12-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-12-05', 'female'), new Date(2018, 10, 6));
    });

    it('should NOT return 2018-11-06 when a DOB of 1953-12-05 is applied to a Male', () => {
      assert.notDeepStrictEqual(getStatePensionDate('1953-12-05', 'male'), new Date(2018, 10, 6));
    });
  });

  describe('All people born 6 Dec 1953 - 5 Jan 1953, retire on 6 Mar 2019. So, getStatePensionDate', () => {
    // Men & Women between 6 Dec 1953 - 5 Jan 1954
    it('should return 2019-03-06 when a DOB of 1953-12-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-12-06', 'female'), new Date(2019, 2, 6));
    });

    it('should return 2019-03-06 when a DOB of 1953-12-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1953-12-06', 'male'), new Date(2019, 2, 6));
    });

    it('should return 2019-03-06 when a DOB of 1954-01-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-01-05', 'female'), new Date(2019, 2, 6));
    });

    it('should return 2019-03-06 when a DOB of 1954-01-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-01-05', 'male'), new Date(2019, 2, 6));
    });
  });

  describe('All people born 6 Jan 1953 - 5 Feb 1953, retire on 6 May 2019. So, getStatePensionDate', () => {
    // Men & Women between 6 Jan 1954 - 5 Feb 1954
    it('should return 2019-05-06 when a DOB of 1954-01-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-01-06', 'female'), new Date(2019, 4, 6));
    });

    it('should return 2019-05-06 when a DOB of 1954-01-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-01-06', 'male'), new Date(2019, 4, 6));
    });

    it('should return 2019-05-06 when a DOB of 1954-01-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-02-05', 'female'), new Date(2019, 4, 6));
    });

    it('should return 2019-05-06 when a DOB of 1954-01-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-02-05', 'male'), new Date(2019, 4, 6));
    });
  });

  describe('All people born 6 Feb 1953 - 5 Mar 1953, retire on 6 Jul 2019. So, getStatePensionDate', () => {
    // Men & Women between 6 Feb 1954 - 5 Mar 1954
    it('should return 2019-07-06 when a DOB of 1954-02-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-02-06', 'female'), new Date(2019, 6, 6));
    });

    it('should return 2019-07-06 when a DOB of 1954-02-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-02-06', 'male'), new Date(2019, 6, 6));
    });

    it('should return 2019-07-06 when a DOB of 1954-03-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-03-05', 'female'), new Date(2019, 6, 6));
    });

    it('should return 2019-07-06 when a DOB of 1954-03-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-03-05', 'male'), new Date(2019, 6, 6));
    });
  });

  describe('All people born 6 Mar 1953 - 5 Apr 1953, retire on 6 Sep 2019. So, getStatePensionDate', () => {
    // Men & Women between 6 Mar 1954 - 5 Apr 1954
    it('should return 2019-09-06 when a DOB of 1954-03-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-03-06', 'female'), new Date(2019, 8, 6));
    });

    it('should return 2019-09-06 when a DOB of 1954-03-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-03-06', 'male'), new Date(2019, 8, 6));
    });

    it('should return 2019-09-06 when a DOB of 1954-04-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-04-05', 'female'), new Date(2019, 8, 6));
    });

    it('should return 2019-09-06 when a DOB of 1954-04-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-04-05', 'male'), new Date(2019, 8, 6));
    });
  });

  describe('All people born 6 Apr 1953 - 5 May 1953, retire on 6 Nov 2019. So, getStatePensionDate', () => {
    // Men & Women between 6 Apr 1954 - 5 May 1954
    it('should return 2019-11-06 when a DOB of 1954-04-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-04-06', 'female'), new Date(2019, 10, 6));
    });

    it('should return 2019-11-06 when a DOB of 1954-04-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-04-06', 'male'), new Date(2019, 10, 6));
    });

    it('should return 2019-11-06 when a DOB of 1954-05-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-05-05', 'female'), new Date(2019, 10, 6));
    });

    it('should return 2019-11-06 when a DOB of 1954-05-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-05-05', 'male'), new Date(2019, 10, 6));
    });
  });

  describe('All people born 6 May 1953 - 5 Jun 1953, retire on 6 Jan 2020. So, getStatePensionDate', () => {
    // Men & Women between 6 May 1954 - 5 Jun 1954
    it('should return 2020-01-06 when a DOB of 1954-05-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-05-06', 'female'), new Date(2020, 0, 6));
    });

    it('should return 2020-01-06 when a DOB of 1954-04-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-05-06', 'male'), new Date(2020, 0, 6));
    });

    it('should return 2020-01-06 when a DOB of 1954-06-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-06-05', 'female'), new Date(2020, 0, 6));
    });

    it('should return 2020-01-06 when a DOB of 1954-06-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-06-05', 'male'), new Date(2020, 0, 6));
    });
  });

  describe('All people born 6 Jun 1953 - 5 Jul 1953, retire on 6 Mar 2020. So, getStatePensionDate', () => {
    // Men & Women between 6 Jun 1954 - 5 Jul 1954
    it('should return 2020-03-06 when a DOB of 1954-06-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-06-06', 'female'), new Date(2020, 2, 6));
    });

    it('should return 2020-03-06 when a DOB of 1954-06-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-06-06', 'male'), new Date(2020, 2, 6));
    });

    it('should return 2020-03-06 when a DOB of 1954-07-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-07-05', 'female'), new Date(2020, 2, 6));
    });

    it('should return 2020-03-06 when a DOB of 1954-07-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-07-05', 'male'), new Date(2020, 2, 6));
    });
  });

  describe('All people born 6 Jul 1953 - 5 Aug 1953, retire on 6 May 2020. So, getStatePensionDate', () => {
    // Men & Women between 6 Jul 1954 - 5 Aug 1954
    it('should return 2020-05-06 when a DOB of 1954-07-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-07-06', 'female'), new Date(2020, 4, 6));
    });

    it('should return 2020-05-06 when a DOB of 1954-07-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-07-06', 'male'), new Date(2020, 4, 6));
    });

    it('should return 2020-05-06 when a DOB of 1954-08-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-08-05', 'female'), new Date(2020, 4, 6));
    });

    it('should return 2020-05-06 when a DOB of 1954-08-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-08-05', 'male'), new Date(2020, 4, 6));
    });
  });

  describe('All people born 6 Aug 1953 - 5 Sep 1953, retire on 6 Jul 2020. So, getStatePensionDate', () => {
    // Men & Women between 6 Aug 1954 - 5 Sep 1954
    it('should return 2020-07-06 when a DOB of 1954-08-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-08-06', 'female'), new Date(2020, 6, 6));
    });

    it('should return 2020-07-06 when a DOB of 1954-08-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-08-06', 'male'), new Date(2020, 6, 6));
    });

    it('should return 2020-07-06 when a DOB of 1954-09-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-09-05', 'female'), new Date(2020, 6, 6));
    });

    it('should return 2020-07-06 when a DOB of 1954-09-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-09-05', 'male'), new Date(2020, 6, 6));
    });
  });

  describe('All people born 6 Sep 1953 - 5 Oct 1953, retire on 6 Sep 2020. So, getStatePensionDate', () => {
    // Men & Women between 6 Sep 1954 - 5 Oct 1954
    it('should return 2020-09-06 when a DOB of 1954-09-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-09-06', 'female'), new Date(2020, 8, 6));
    });

    it('should return 2020-09-06 when a DOB of 1954-09-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-09-06', 'male'), new Date(2020, 8, 6));
    });

    it('should return 2020-09-06 when a DOB of 1954-10-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-10-05', 'female'), new Date(2020, 8, 6));
    });

    it('should return 2020-09-06 when a DOB of 1954-10-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-10-05', 'male'), new Date(2020, 8, 6));
    });
  });

  describe('All people born 6 Oct 1953 - 5 Apr 1960, retire on their 66th birthday. So, getStatePensionDate', () => {
    // Men & Women between 6 Oct 1954 - 5 Apr 1960
    it('should return 2020-10-06 when a DOB of 1954-10-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-10-06', 'female'), new Date(2020, 9, 6));
    });

    it('should return 2020-10-06 when a DOB of 1954-10-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1954-10-06', 'male'), new Date(2020, 9, 6));
    });

    it('should return 2026-04-05 when a DOB of 1960-04-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-04-05', 'female'), new Date(2026, 3, 5));
    });

    it('should return 2026-04-05 when a DOB of 1960-04-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-04-05', 'male'), new Date(2026, 3, 5));
    });

    // Leap day 29 Feb 1956
    it('should return 2022-03-01 when a DOB of 1956-02-29 (leap day) is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1956-02-29', 'female'), new Date(2022, 2, 1));
    });

    it('should return 2022-03-01 when a DOB of 1956-02-29 (leap day) is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1956-02-29', 'male'), new Date(2022, 2, 1));
    });
  });

  describe('All people born 6 Apr 1960 - 5 May 1960, retire after 66 years and 1 month. So, getStatePensionDate', () => {
    //
    // Pensions act 2014
    //
    // Men & Women between 6 Apr 1960 - 5 May 1960
    it('should return 2026-05-06 when a DOB of 1960-04-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-04-06', 'female'), new Date(2026, 4, 6));
    });

    it('should return 2026-05-06 when a DOB of 1960-04-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-04-06', 'male'), new Date(2026, 4, 6));
    });

    it('should return 2026-06-05 when a DOB of 1960-05-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-05-05', 'female'), new Date(2026, 5, 5));
    });

    it('should return 2026-06-56 when a DOB of 1960-05-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-05-05', 'male'), new Date(2026, 5, 5));
    });
  });

  describe('All people born 6 May 1960 - 5 Jun 1960, retire after 66 years and 2 months. So, getStatePensionDate', () => {
    // Men & Women between 6 May 1960 - 5 Jun 1960
    it('should return 2026-07-06 when a DOB of 1960-05-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-05-06', 'female'), new Date(2026, 6, 6));
    });

    it('should return 2026-07-06 when a DOB of 1960-05-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-05-06', 'male'), new Date(2026, 6, 6));
    });

    it('should return 2026-08-05 when a DOB of 1960-06-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-06-05', 'female'), new Date(2026, 7, 5));
    });

    it('should return 2026-08-05 when a DOB of 1960-06-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-06-05', 'male'), new Date(2026, 7, 5));
    });
  });

  describe('All people born 6 Jun 1960 - 5 Jul 1960, retire after 66 years and 3 months. So, getStatePensionDate', () => {
    // Men & Women between 6 Jun 1960 - 5 Jul 1960
    it('should return 2026-09-06 when a DOB of 1960-06-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-06-06', 'female'), new Date(2026, 8, 6));
    });

    it('should return 2026-09-06 when a DOB of 1960-06-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-06-06', 'male'), new Date(2026, 8, 6));
    });

    it('should return 2026-10-05 when a DOB of 1960-07-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-07-05', 'female'), new Date(2026, 9, 5));
    });

    it('should return 2026-10-05 when a DOB of 1960-07-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-07-05', 'male'), new Date(2026, 9, 5));
    });
  });

  describe('All people born 6 Jul 1960 - 5 Aug 1960, retire after 66 years and 4 months. So, getStatePensionDate', () => {
    // Men & Women between 6 Jul 1960 - 5 Aug 1960
    it('should return 2026-11-06 when a DOB of 1960-07-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-07-06', 'female'), new Date(2026, 10, 6));
    });

    it('should return 2026-11-06 when a DOB of 1960-07-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-07-06', 'male'), new Date(2026, 10, 6));
    });

    it('should return 2026-11-30 when a DOB of 1960-07-31 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-07-31', 'female'), new Date(2026, 10, 30));
    });

    it('should return 2026-11-30 when a DOB of 1960-07-31 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-07-31', 'male'), new Date(2026, 10, 30));
    });

    it('should return 2026-12-05 when a DOB of 1960-08-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-08-05', 'female'), new Date(2026, 11, 5));
    });

    it('should return 2026-12-05 when a DOB of 1960-08-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-08-05', 'male'), new Date(2026, 11, 5));
    });
  });

  describe('All people born 6 Aug 1960 - 5 Sep 1960, retire after 66 years and 5 months. So, getStatePensionDate', () => {
    // Men & Women between 6 Aug 1960 - 5 Sep 1960
    it('should return 2027-01-06 when a DOB of 1960-08-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-08-06', 'female'), new Date(2027, 0, 6));
    });

    it('should return 2027-01-06 when a DOB of 1960-08-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-08-06', 'male'), new Date(2027, 0, 6));
    });

    it('should return 2027-02-05 when a DOB of 1960-09-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-09-05', 'female'), new Date(2027, 1, 5));
    });

    it('should return 2027-02-05 when a DOB of 1960-09-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-09-05', 'male'), new Date(2027, 1, 5));
    });
  });

  describe('All people born 6 Sep 1960 - 5 Oct 1960, retire after 66 years and 6 months. So, getStatePensionDate', () => {
    // Men & Women between 6 Sep 1960 - 5 Oct 1960
    it('should return 2027-03-06 when a DOB of 1960-09-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-09-06', 'female'), new Date(2027, 2, 6));
    });

    it('should return 2027-03-06 when a DOB of 1960-09-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-09-06', 'male'), new Date(2027, 2, 6));
    });

    it('should return 2027-04-05 when a DOB of 1960-10-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-10-05', 'female'), new Date(2027, 3, 5));
    });

    it('should return 2027-04-05 when a DOB of 1960-10-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-10-05', 'male'), new Date(2027, 3, 5));
    });
  });

  describe('All people born 6 Oct 1960 - 5 Nov 1960, retire after 66 years and 7 months. So, getStatePensionDate', () => {
    // Men & Women between 6 Oct 1960 - 5 Nov 1960
    it('should return 2027-05-06 when a DOB of 1960-10-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-10-06', 'female'), new Date(2027, 4, 6));
    });

    it('should return 2027-05-06 when a DOB of 1960-10-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-10-06', 'male'), new Date(2027, 4, 6));
    });

    it('should return 2027-06-05 when a DOB of 1960-11-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-11-05', 'female'), new Date(2027, 5, 5));
    });

    it('should return 2027-06-05 when a DOB of 1960-11-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-11-05', 'male'), new Date(2027, 5, 5));
    });
  });

  describe('All people born 6 Nov 1960 - 5 Dec 1960, retire after 66 years and 8 months. So, getStatePensionDate', () => {
    // Men & Women between 6 Nov 1960 - 5 Dec 1960
    it('should return 2027-07-06 when a DOB of 1960-11-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-11-06', 'female'), new Date(2027, 6, 6));
    });

    it('should return 2027-07-06 when a DOB of 1960-11-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-11-06', 'male'), new Date(2027, 6, 6));
    });

    it('should return 2027-08-05 when a DOB of 1960-12-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-12-05', 'female'), new Date(2027, 7, 5));
    });

    it('should return 2027-08-05 when a DOB of 1960-12-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-12-05', 'male'), new Date(2027, 7, 5));
    });
  });

  describe('All people born 6 Dec 1961 - 5 Jan 1961, retire after 66 years and 9 months. So, getStatePensionDate', () => {
    // Men & Women between 6 Dec 1960 - 5 Jan 1961
    it('should return 2027-09-06 when a DOB of 1960-12-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-12-06', 'female'), new Date(2027, 8, 6));
    });

    it('should return 2027-09-06 when a DOB of 1960-12-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-12-06', 'male'), new Date(2027, 8, 6));
    });

    it('should return 2027-09-30 when a DOB of 1960-12-31 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-12-31', 'female'), new Date(2027, 8, 30));
    });

    it('should return 2027-09-30 when a DOB of 1960-12-31 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1960-12-31', 'male'), new Date(2027, 8, 30));
    });

    it('should return 2027-10-05 when a DOB of 1961-01-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1961-01-05', 'female'), new Date(2027, 9, 5));
    });

    it('should return 2027-10-05 when a DOB of 1961-01-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1961-01-05', 'male'), new Date(2027, 9, 5));
    });
  });

  describe('All people born 6 Jan 1961 - 5 Feb 1961, retire after 66 years and 10 months. So, getStatePensionDate', () => {
    // Men & Women between 6 Jan 1961 - 5 Feb 1961
    it('should return 2027-11-06 when a DOB of 1961-01-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1961-01-06', 'female'), new Date(2027, 10, 6));
    });

    it('should return 2027-11-06 when a DOB of 1961-01-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1961-01-06', 'male'), new Date(2027, 10, 6));
    });

    it('should return 2027-11-30 when a DOB of 1961-01-31 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1961-01-31', 'female'), new Date(2027, 10, 30));
    });

    it('should return 2027-11-30 when a DOB of 1961-01-31 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1961-01-31', 'male'), new Date(2027, 10, 30));
    });

    it('should return 2027-12-05 when a DOB of 1961-02-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1961-02-05', 'female'), new Date(2027, 11, 5));
    });

    it('should return 2027-12-05 when a DOB of 1961-02-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1961-02-05', 'male'), new Date(2027, 11, 5));
    });
  });

  describe('All people born 6 Feb 1961 - 5 Mar 1961, retire after 66 years and 11 months. So, getStatePensionDate', () => {
    // Men & Women between 6 Feb 1961 - 5 Mar 1961
    it('should return 2028-01-06 when a DOB of 1961-02-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1961-02-06', 'female'), new Date(2028, 0, 6));
    });

    it('should return 2028-01-06 when a DOB of 1961-02-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1961-02-06', 'male'), new Date(2028, 0, 6));
    });

    it('should return 2028-02-05 when a DOB of 1961-03-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1961-03-05', 'female'), new Date(2028, 1, 5));
    });

    it('should return 2028-02-05 when a DOB of 1961-03-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1961-03-05', 'male'), new Date(2028, 1, 5));
    });
  });

  describe('All people born 6 Mar 1961 - 5 Apr 1977, retire on their 67th birthday. So, getStatePensionDate', () => {
    // Men & Women between 6 Mar 1961 - 5 Apr 1977
    it('should return 2028-03-06 when a DOB of 1961-03-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1961-03-06', 'female'), new Date(2028, 2, 6));
    });

    it('should return 2028-03-06 when a DOB of 1961-03-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1961-03-06', 'male'), new Date(2028, 2, 6));
    });

    it('should return 2044-04-05 when a DOB of 1977-04-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-04-05', 'female'), new Date(2044, 3, 5));
    });

    it('should return 2044-04-05 when a DOB of 1977-04-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-04-05', 'male'), new Date(2044, 3, 5));
    });
  });

  describe('All people born 6 Apr 1977 - 5 May 1977, retire on 6 May 2044. So, getStatePensionDate', () => {
    //
    // Pensions act 2007
    //
    // Men & Women between 6 Apr 1977 - 5 May 1977
    it('should return 2044-05-06 when a DOB of 1977-04-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-04-06', 'female'), new Date(2044, 4, 6));
    });

    it('should return 2044-05-06 when a DOB of 1977-04-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-04-06', 'male'), new Date(2044, 4, 6));
    });

    it('should return 2044-05-06 when a DOB of 1977-05-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-05-05', 'female'), new Date(2044, 4, 6));
    });

    it('should return 2044-05-06 when a DOB of 1977-05-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-05-05', 'male'), new Date(2044, 4, 6));
    });
  });

  describe('All people born 6 May 1977 - 5 Jun 1977, retire on 6 Jul 2044. So, getStatePensionDate', () => {
    // Men & Women between 6 May 1977 - 5 Jun 1977
    it('should return 2044-07-06 when a DOB of 1977-05-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-05-06', 'female'), new Date(2044, 6, 6));
    });

    it('should return 2044-07-06 when a DOB of 1977-05-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-05-06', 'male'), new Date(2044, 6, 6));
    });

    it('should return 2044-07-06 when a DOB of 1977-06-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-06-05', 'female'), new Date(2044, 6, 6));
    });

    it('should return 2044-07-06 when a DOB of 1977-06-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-06-05', 'male'), new Date(2044, 6, 6));
    });
  });

  describe('All people born 6 Jun 1977 - 5 Jul 1977, retire on 6 Sep 2044. So, getStatePensionDate', () => {
    // Men & Women between 6 Jun 1977 - 5 Jul 1977
    it('should return 2044-09-06 when a DOB of 1977-06-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-06-06', 'female'), new Date(2044, 8, 6));
    });

    it('should return 2044-09-06 when a DOB of 1977-06-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-06-06', 'male'), new Date(2044, 8, 6));
    });

    it('should return 2044-09-06 when a DOB of 1977-07-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-07-05', 'female'), new Date(2044, 8, 6));
    });

    it('should return 2044-09-06 when a DOB of 1977-07-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-07-05', 'male'), new Date(2044, 8, 6));
    });
  });

  describe('All people born 6 Jul 1977 - 5 Aug 1977, retire on 6 Nov 2044. So, getStatePensionDate', () => {
    // Men & Women between 6 Jul 1977 - 5 Aug 1977
    it('should return 2044-11-06 when a DOB of 1977-07-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-07-06', 'female'), new Date(2044, 10, 6));
    });

    it('should return 2044-11-06 when a DOB of 1977-07-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-07-06', 'male'), new Date(2044, 10, 6));
    });

    it('should return 2044-11-06 when a DOB of 1977-08-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-08-05', 'female'), new Date(2044, 10, 6));
    });

    it('should return 2044-11-06 when a DOB of 1977-08-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-08-05', 'male'), new Date(2044, 10, 6));
    });
  });

  describe('All people born 6 Aug 1977 - 5 Sep 1977, retire on 6 Jan 2045. So, getStatePensionDate', () => {
    // Men & Women between 6 Aug 1977 - 5 Sep 1977
    it('should return 2045-01-06 when a DOB of 1977-08-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-08-06', 'female'), new Date(2045, 0, 6));
    });

    it('should return 2045-01-06 when a DOB of 1977-08-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-08-06', 'male'), new Date(2045, 0, 6));
    });

    it('should return 2045-01-06 when a DOB of 1977-09-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-09-05', 'female'), new Date(2045, 0, 6));
    });

    it('should return 2045-01-06 when a DOB of 1977-09-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-09-05', 'male'), new Date(2045, 0, 6));
    });
  });

  describe('All people born 6 Sep 1977 - 5 Oct 1977, retire on 6 Mar 2045. So, getStatePensionDate', () => {
    // Men & Women between 6 Sep 1977 - 5 Oct 1977
    it('should return 2045-03-06 when a DOB of 1977-09-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-09-06', 'female'), new Date(2045, 2, 6));
    });

    it('should return 2045-03-06 when a DOB of 1977-09-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-09-06', 'male'), new Date(2045, 2, 6));
    });

    it('should return 2045-03-06 when a DOB of 1977-10-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-10-05', 'female'), new Date(2045, 2, 6));
    });

    it('should return 2045-03-06 when a DOB of 1977-10-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-10-05', 'male'), new Date(2045, 2, 6));
    });
  });

  describe('All people born 6 Oct 1977 - 5 Nov 1977, retire on 6 May 2045. So, getStatePensionDate', () => {
    // Men & Women between 6 Oct 1977 - 5 Nov 1977
    it('should return 2045-05-06 when a DOB of 1977-10-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-10-06', 'female'), new Date(2045, 4, 6));
    });

    it('should return 2045-05-06 when a DOB of 1977-10-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-10-06', 'male'), new Date(2045, 4, 6));
    });

    it('should return 2045-05-06 when a DOB of 1977-11-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-11-05', 'female'), new Date(2045, 4, 6));
    });

    it('should return 2045-05-06 when a DOB of 1977-11-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-11-05', 'male'), new Date(2045, 4, 6));
    });
  });

  describe('All people born 6 Nov 1977 - 5 Dec 1977, retire on 6 Jul 2045. So, getStatePensionDate', () => {
    // Men & Women between 6 Nov 1977 - 5 Dec 1977
    it('should return 2045-07-06 when a DOB of 1977-11-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-11-06', 'female'), new Date(2045, 6, 6));
    });

    it('should return 2045-07-06 when a DOB of 1977-11-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-11-06', 'male'), new Date(2045, 6, 6));
    });

    it('should return 2045-07-06 when a DOB of 1977-12-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-12-05', 'female'), new Date(2045, 6, 6));
    });

    it('should return 2045-07-06 when a DOB of 1977-12-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-12-05', 'male'), new Date(2045, 6, 6));
    });
  });

  describe('All people born 6 Dec 1977 - 5 Jan 1977, retire on 6 Sep 2045. So, getStatePensionDate', () => {
    // Men & Women between 6 Dec 1977 - 5 Jan 1978
    it('should return 2045-09-06 when a DOB of 1977-12-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-12-06', 'female'), new Date(2045, 8, 6));
    });

    it('should return 2045-09-06 when a DOB of 1977-12-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1977-12-06', 'male'), new Date(2045, 8, 6));
    });

    it('should return 2045-09-06 when a DOB of 1978-01-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1978-01-05', 'female'), new Date(2045, 8, 6));
    });

    it('should return 2045-09-06 when a DOB of 1978-01-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1978-01-05', 'male'), new Date(2045, 8, 6));
    });
  });

  describe('All people born 6 Jan 1978 - 5 Feb 1978, retire on 6 Nov 2045. So, getStatePensionDate', () => {
    // Men & Women between 6 Jan 1978 - 5 Feb 1978
    it('should return 2045-11-06 when a DOB of 1978-01-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1978-01-06', 'female'), new Date(2045, 10, 6));
    });

    it('should return 2045-11-06 when a DOB of 1978-01-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1978-01-06', 'male'), new Date(2045, 10, 6));
    });

    it('should return 2045-11-06 when a DOB of 1978-02-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1978-02-05', 'female'), new Date(2045, 10, 6));
    });

    it('should return 2045-11-06 when a DOB of 1978-02-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1978-02-05', 'male'), new Date(2045, 10, 6));
    });
  });

  describe('All people born 6 Feb 1978 - 5 Mar 1978, retire on 6 Jan 2046. So, getStatePensionDate', () => {
    // Men & Women between 6 Feb 1978 - 5 Mar 1978
    it('should return 2046-01-06 when a DOB of 1978-02-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1978-02-06', 'female'), new Date(2046, 0, 6));
    });

    it('should return 2046-01-06 when a DOB of 1978-02-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1978-02-06', 'male'), new Date(2046, 0, 6));
    });

    it('should return 2046-01-06 when a DOB of 1978-03-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1978-03-05', 'female'), new Date(2046, 0, 6));
    });

    it('should return 2046-01-06 when a DOB of 1978-03-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1978-03-05', 'male'), new Date(2046, 0, 6));
    });
  });

  describe('All people born 6 Mar 1978 - 5 Apr 1978, retire on 6 Mar 2046. So, getStatePensionDate', () => {
    // Men & Women between 6 Mar 1978 - 5 Apr 1978
    it('should return 2046-03-06 when a DOB of 1978-03-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1978-03-06', 'female'), new Date(2046, 2, 6));
    });

    it('should return 2046-03-06 when a DOB of 1978-03-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1978-03-06', 'male'), new Date(2046, 2, 6));
    });

    it('should return 2046-03-06 when a DOB of 1978-04-05 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1978-04-05', 'female'), new Date(2046, 2, 6));
    });

    it('should return 2046-03-06 when a DOB of 1978-04-05 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1978-04-05', 'male'), new Date(2046, 2, 6));
    });
  });

  describe('All people born 6 Apr 1978 - onwards, retire on their 68th birthday. So, getStatePensionDate', () => {
    // Men & Women between 6 Apr 1978 - onwards
    it('should return 2046-04-06 when a DOB of 1978-04-06 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('1978-04-06', 'female'), new Date(2046, 3, 6));
    });

    it('should return 2046-04-06 when a DOB of 1978-04-06 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('1978-04-06', 'male'), new Date(2046, 3, 6));
    });

    // Random future date - 29 Feb 2020
    it('should return 2088-02-29 when a DOB of 2020-02-29 is applied to a Female', () => {
      assert.deepStrictEqual(getStatePensionDate('2020-02-29', 'female'), new Date(2088, 1, 29));
    });

    it('should return 2088-02-29 when a DOB of 2020-02-29 is applied to a Male', () => {
      assert.deepStrictEqual(getStatePensionDate('2020-02-29', 'male'), new Date(2088, 1, 29));
    });
  });
});

describe('getStatePensionDateAsString()', () => {
  describe('Input validation', () => {
    it('should throw a TypeError when date of birth is not a string', () => {
      assert.throws(() => getStatePensionDateAsString(9, 'male'), TypeError);
    });

    it('should throw a TypeError when gender is not a string', () => {
      assert.throws(() => getStatePensionDateAsString('1950-03-05', false), TypeError);
    });

    it('should throw an Error when gender is a string but not male or female', () => {
      assert.throws(() => getStatePensionDateAsString('1950-03-05', 'test'), Error);
    });

    it('should throw an Error when date of birth is a string but not a valid date', () => {
      assert.throws(() => getStatePensionDateAsString('1950-00-00', 'female'), Error);
    });
  });

  describe('Return type', () => {
    it('should return a string', () => {
      assert.strictEqual(typeof getStatePensionDateAsString('1953-12-05', 'male'), 'string');
    });
  });

  describe('String format', () => {
    it('should return SPA date as a string in YYYY-MM-DD format', () => {
      assert.deepStrictEqual(getStatePensionDateAsString('1953-12-05', 'male'), '2018-12-05');
    });
  });
});

describe('isOverStatePensionAge()', () => {
  describe('Input validation', () => {
    it('should throw a TypeError when date of birth is not a string', () => {
      assert.throws(() => isOverStatePensionAge(9, 'male'), TypeError);
    });

    it('should throw a TypeError when gender is not a string', () => {
      assert.throws(() => isOverStatePensionAge('1950-03-05', false), TypeError);
    });

    it('should throw an Error when gender is a string but not male or female', () => {
      assert.throws(() => isOverStatePensionAge('1950-03-05', 'test'), Error);
    });

    it('should throw an Error when date of birth is a string but not a valid date', () => {
      assert.throws(() => isOverStatePensionAge('1950-00-00', 'female'), Error);
    });
  });

  describe('Return type', () => {
    it('should return a boolean', () => {
      assert.strictEqual(typeof isOverStatePensionAge('1953-12-05', 'male'), 'boolean');
    });
  });

  describe('Boolean', () => {
    it('should return true when SPA date is in the past', () => {
      assert.deepStrictEqual(isOverStatePensionAge('1953-12-05', 'male'), true);
    });

    it('should return true when SPA date is today', () => {
      timekeeper.freeze(new Date(2019, 8, 6));
      assert.deepStrictEqual(isOverStatePensionAge('1954-03-25', 'female'), true);
      timekeeper.reset();
    });

    it('should return false when SPA date is in the future', () => {
      assert.deepStrictEqual(isOverStatePensionAge('1990-12-05', 'female'), false);
    });
  });
});
