'use strict';

const {AGE, FIXED, MALE, FEMALE, EQUALISED} = require('./consts');

// This module exports an array of objects that define the rules for calculating
// the date on which a person becomes eligible for their State Pension.
//
// Each object in the array has the following attributes...
//	periodStart: A date on which this rule becomes active.  I.e if a DOB is
//				 earlier than this date, then this rule would not be
//				 considered a match.
//
//	periodEnd: A date on which this rule ceases to be active.  I.e if a DOB is
//				 later than this date, then this rule would not be
//				 considered a match.
//
//	pensionDate: has the following...
//			type: can have the values FIXED or AGE.
//
//			value: This will be present for FIXED types, and specifies a fixed
//					date on which the person will reach state pension age.
//
//			Years: This will be present for AGE types, and specifies the
//					number of years that will be added to the date of birth in
//					order to calculate state pension age.
//
//			Months: This will be present for AGE types, and specifies the
//					number of months that will be added to the date of birth in
//					order to calculate state pension age.
module.exports = Object.freeze({
  [FEMALE]: [
    // Women’s State Pension age under the Pensions Act 1995
    {
      periodEnd: '1950-04-05',
      pensionDate: {
        type: AGE,
        years: 60,
        months: 0
      }
    },
    {
      periodStart: '1950-04-06',
      periodEnd: '1950-05-05',
      pensionDate: {
        type: FIXED,
        value: '2010-05-06'
      }
    },
    {
      periodStart: '1950-05-06',
      periodEnd: '1950-06-05',
      pensionDate: {
        type: FIXED,
        value: '2010-07-06'
      }
    },
    {
      periodStart: '1950-06-06',
      periodEnd: '1950-07-05',
      pensionDate: {
        type: FIXED,
        value: '2010-09-06'
      }
    },
    {
      periodStart: '1950-07-06',
      periodEnd: '1950-08-05',
      pensionDate: {
        type: FIXED,
        value: '2010-11-06'
      }
    },
    {
      periodStart: '1950-08-06',
      periodEnd: '1950-09-05',
      pensionDate: {
        type: FIXED,
        value: '2011-01-06'
      }
    },
    {
      periodStart: '1950-09-06',
      periodEnd: '1950-10-05',
      pensionDate: {
        type: FIXED,
        value: '2011-03-06'
      }
    },
    {
      periodStart: '1950-10-06',
      periodEnd: '1950-11-05',
      pensionDate: {
        type: FIXED,
        value: '2011-05-06'
      }
    },
    {
      periodStart: '1950-11-06',
      periodEnd: '1950-12-05',
      pensionDate: {
        type: FIXED,
        value: '2011-07-06'
      }
    },
    {
      periodStart: '1950-12-06',
      periodEnd: '1951-01-05',
      pensionDate: {
        type: FIXED,
        value: '2011-09-06'
      }
    },
    {
      periodStart: '1951-01-06',
      periodEnd: '1951-02-05',
      pensionDate: {
        type: FIXED,
        value: '2011-11-06'
      }
    },
    {
      periodStart: '1951-02-06',
      periodEnd: '1951-03-05',
      pensionDate: {
        type: FIXED,
        value: '2012-01-06'
      }
    },
    {
      periodStart: '1951-03-06',
      periodEnd: '1951-04-05',
      pensionDate: {
        type: FIXED,
        value: '2012-03-06'
      }
    },
    {
      periodStart: '1951-04-06',
      periodEnd: '1951-05-05',
      pensionDate: {
        type: FIXED,
        value: '2012-05-06'
      }
    },
    {
      periodStart: '1951-05-06',
      periodEnd: '1951-06-05',
      pensionDate: {
        type: FIXED,
        value: '2012-07-06'
      }
    },
    {
      periodStart: '1951-06-06',
      periodEnd: '1951-07-05',
      pensionDate: {
        type: FIXED,
        value: '2012-09-06'
      }
    },
    {
      periodStart: '1951-07-06',
      periodEnd: '1951-08-05',
      pensionDate: {
        type: FIXED,
        value: '2012-11-06'
      }
    },
    {
      periodStart: '1951-08-06',
      periodEnd: '1951-09-05',
      pensionDate: {
        type: FIXED,
        value: '2013-01-06'
      }
    },
    {
      periodStart: '1951-09-06',
      periodEnd: '1951-10-05',
      pensionDate: {
        type: FIXED,
        value: '2013-03-06'
      }
    },
    {
      periodStart: '1951-10-06',
      periodEnd: '1951-11-05',
      pensionDate: {
        type: FIXED,
        value: '2013-05-06'
      }
    },
    {
      periodStart: '1951-11-06',
      periodEnd: '1951-12-05',
      pensionDate: {
        type: FIXED,
        value: '2013-07-06'
      }
    },
    {
      periodStart: '1951-12-06',
      periodEnd: '1952-01-05',
      pensionDate: {
        type: FIXED,
        value: '2013-09-06'
      }
    },
    {
      periodStart: '1952-01-06',
      periodEnd: '1952-02-05',
      pensionDate: {
        type: FIXED,
        value: '2013-11-06'
      }
    },
    {
      periodStart: '1952-02-06',
      periodEnd: '1952-03-05',
      pensionDate: {
        type: FIXED,
        value: '2014-01-06'
      }
    },
    {
      periodStart: '1952-03-06',
      periodEnd: '1952-04-05',
      pensionDate: {
        type: FIXED,
        value: '2014-03-06'
      }
    },
    {
      periodStart: '1952-04-06',
      periodEnd: '1952-05-05',
      pensionDate: {
        type: FIXED,
        value: '2014-05-06'
      }
    },
    {
      periodStart: '1952-05-06',
      periodEnd: '1952-06-05',
      pensionDate: {
        type: FIXED,
        value: '2014-07-06'
      }
    },
    {
      periodStart: '1952-06-06',
      periodEnd: '1952-07-05',
      pensionDate: {
        type: FIXED,
        value: '2014-09-06'
      }
    },
    {
      periodStart: '1952-07-06',
      periodEnd: '1952-08-05',
      pensionDate: {
        type: FIXED,
        value: '2014-11-06'
      }
    },
    {
      periodStart: '1952-08-06',
      periodEnd: '1952-09-05',
      pensionDate: {
        type: FIXED,
        value: '2015-01-06'
      }
    },
    {
      periodStart: '1952-08-06',
      periodEnd: '1952-09-05',
      pensionDate: {
        type: FIXED,
        value: '2015-01-06'
      }
    },
    {
      periodStart: '1952-09-06',
      periodEnd: '1952-10-05',
      pensionDate: {
        type: FIXED,
        value: '2015-03-06'
      }
    },
    {
      periodStart: '1952-10-06',
      periodEnd: '1952-11-05',
      pensionDate: {
        type: FIXED,
        value: '2015-05-06'
      }
    },
    {
      periodStart: '1952-11-06',
      periodEnd: '1952-12-05',
      pensionDate: {
        type: FIXED,
        value: '2015-07-06'
      }
    },
    {
      periodStart: '1952-12-06',
      periodEnd: '1953-01-05',
      pensionDate: {
        type: FIXED,
        value: '2015-09-06'
      }
    },
    {
      periodStart: '1953-01-06',
      periodEnd: '1953-02-05',
      pensionDate: {
        type: FIXED,
        value: '2015-11-06'
      }
    },
    {
      periodStart: '1953-02-06',
      periodEnd: '1953-03-05',
      pensionDate: {
        type: FIXED,
        value: '2016-01-06'
      }
    },
    {
      periodStart: '1953-03-06',
      periodEnd: '1953-04-05',
      pensionDate: {
        type: FIXED,
        value: '2016-03-06'
      }
    },
    // Women’s State Pension age under the Pensions Act 2011
    {
      periodStart: '1953-04-06',
      periodEnd: '1953-05-05',
      pensionDate: {
        type: FIXED,
        value: '2016-07-06'
      }
    },
    {
      periodStart: '1953-05-06',
      periodEnd: '1953-06-05',
      pensionDate: {
        type: FIXED,
        value: '2016-11-06'
      }
    },
    {
      periodStart: '1953-06-06',
      periodEnd: '1953-07-05',
      pensionDate: {
        type: FIXED,
        value: '2017-03-06'
      }
    },
    {
      periodStart: '1953-07-06',
      periodEnd: '1953-08-05',
      pensionDate: {
        type: FIXED,
        value: '2017-07-06'
      }
    },
    {
      periodStart: '1953-08-06',
      periodEnd: '1953-09-05',
      pensionDate: {
        type: FIXED,
        value: '2017-11-06'
      }
    },
    {
      periodStart: '1953-09-06',
      periodEnd: '1953-10-05',
      pensionDate: {
        type: FIXED,
        value: '2018-03-06'
      }
    },
    {
      periodStart: '1953-10-06',
      periodEnd: '1953-11-05',
      pensionDate: {
        type: FIXED,
        value: '2018-07-06'
      }
    },
    {
      periodStart: '1953-11-06',
      periodEnd: '1953-12-05',
      pensionDate: {
        type: FIXED,
        value: '2018-11-06'
      }
    }
  ],
  [MALE]: [
    // Men’s pre-equalisation State Pension age
    {
      periodEnd: '1953-12-05',
      pensionDate: {
        type: AGE,
        years: 65,
        months: 0
      }
    }
  ],
  [EQUALISED]: [
    // Increase in State Pension age from 65 to 66, men and women
    {
      periodStart: '1953-12-06',
      periodEnd: '1954-01-05',
      pensionDate: {
        type: FIXED,
        value: '2019-03-06'
      }
    },
    {
      periodStart: '1954-01-06',
      periodEnd: '1954-02-05',
      pensionDate: {
        type: FIXED,
        value: '2019-05-06'
      }
    },
    {
      periodStart: '1954-02-06',
      periodEnd: '1954-03-05',
      pensionDate: {
        type: FIXED,
        value: '2019-07-06'
      }
    },
    {
      periodStart: '1954-03-06',
      periodEnd: '1954-04-05',
      pensionDate: {
        type: FIXED,
        value: '2019-09-06'
      }
    },
    {
      periodStart: '1954-04-06',
      periodEnd: '1954-05-05',
      pensionDate: {
        type: FIXED,
        value: '2019-11-06'
      }
    },
    {
      periodStart: '1954-05-06',
      periodEnd: '1954-06-05',
      pensionDate: {
        type: FIXED,
        value: '2020-01-06'
      }
    },
    {
      periodStart: '1954-06-06',
      periodEnd: '1954-07-05',
      pensionDate: {
        type: FIXED,
        value: '2020-03-06'
      }
    },
    {
      periodStart: '1954-07-06',
      periodEnd: '1954-08-05',
      pensionDate: {
        type: FIXED,
        value: '2020-05-06'
      }
    },
    {
      periodStart: '1954-08-06',
      periodEnd: '1954-09-05',
      pensionDate: {
        type: FIXED,
        value: '2020-07-06'
      }
    },
    {
      periodStart: '1954-09-06',
      periodEnd: '1954-10-05',
      pensionDate: {
        type: FIXED,
        value: '2020-09-06'
      }
    },
    {
      periodStart: '1954-10-06',
      periodEnd: '1960-04-05',
      pensionDate: {
        type: AGE,
        years: 66,
        months: 0
      }
    },
    // Increase in State Pension age from 66 to 67, men and women
    {
      periodStart: '1960-04-06',
      periodEnd: '1960-05-05',
      pensionDate: {
        type: AGE,
        years: 66,
        months: 1
      }
    },
    {
      periodStart: '1960-05-06',
      periodEnd: '1960-06-05',
      pensionDate: {
        type: AGE,
        years: 66,
        months: 2
      }
    },
    {
      periodStart: '1960-06-06',
      periodEnd: '1960-07-05',
      pensionDate: {
        type: AGE,
        years: 66,
        months: 3
      }
    },
    {
      periodStart: '1960-07-06',
      periodEnd: '1960-08-05',
      pensionDate: {
        type: AGE,
        years: 66,
        months: 4
      }
    },
    {
      periodStart: '1960-08-06',
      periodEnd: '1960-09-05',
      pensionDate: {
        type: AGE,
        years: 66,
        months: 5
      }
    },
    {
      periodStart: '1960-09-06',
      periodEnd: '1960-10-05',
      pensionDate: {
        type: AGE,
        years: 66,
        months: 6
      }
    },
    {
      periodStart: '1960-10-06',
      periodEnd: '1960-11-05',
      pensionDate: {
        type: AGE,
        years: 66,
        months: 7
      }
    },
    {
      periodStart: '1960-11-06',
      periodEnd: '1960-12-05',
      pensionDate: {
        type: AGE,
        years: 66,
        months: 8
      }
    },
    {
      periodStart: '1960-12-06',
      periodEnd: '1961-01-05',
      pensionDate: {
        type: AGE,
        years: 66,
        months: 9
      }
    },
    {
      periodStart: '1961-01-06',
      periodEnd: '1961-02-05',
      pensionDate: {
        type: AGE,
        years: 66,
        months: 10
      }
    },
    {
      periodStart: '1961-02-06',
      periodEnd: '1961-03-05',
      pensionDate: {
        type: AGE,
        years: 66,
        months: 11
      }
    },
    {
      periodStart: '1961-03-06',
      periodEnd: '1977-04-05',
      pensionDate: {
        type: AGE,
        years: 67,
        months: 0
      }
    },
    // Increase in State Pension age from 67 to 68 under the Pensions Act 2007
    {
      periodStart: '1977-04-06',
      periodEnd: '1977-05-05',
      pensionDate: {
        type: FIXED,
        value: '2044-05-06'
      }
    },
    {
      periodStart: '1977-05-06',
      periodEnd: '1977-06-05',
      pensionDate: {
        type: FIXED,
        value: '2044-07-06'
      }
    },
    {
      periodStart: '1977-06-06',
      periodEnd: '1977-07-05',
      pensionDate: {
        type: FIXED,
        value: '2044-09-06'
      }
    },
    {
      periodStart: '1977-07-06',
      periodEnd: '1977-08-05',
      pensionDate: {
        type: FIXED,
        value: '2044-11-06'
      }
    },
    {
      periodStart: '1977-08-06',
      periodEnd: '1977-09-05',
      pensionDate: {
        type: FIXED,
        value: '2045-01-06'
      }
    },
    {
      periodStart: '1977-09-06',
      periodEnd: '1977-10-05',
      pensionDate: {
        type: FIXED,
        value: '2045-03-06'
      }
    },
    {
      periodStart: '1977-10-06',
      periodEnd: '1977-11-05',
      pensionDate: {
        type: FIXED,
        value: '2045-05-06'
      }
    },
    {
      periodStart: '1977-11-06',
      periodEnd: '1977-12-05',
      pensionDate: {
        type: FIXED,
        value: '2045-07-06'
      }
    },
    {
      periodStart: '1977-12-06',
      periodEnd: '1978-01-05',
      pensionDate: {
        type: FIXED,
        value: '2045-09-06'
      }
    },
    {
      periodStart: '1978-01-06',
      periodEnd: '1978-02-05',
      pensionDate: {
        type: FIXED,
        value: '2045-11-06'
      }
    },
    {
      periodStart: '1978-02-06',
      periodEnd: '1978-03-05',
      pensionDate: {
        type: FIXED,
        value: '2046-01-06'
      }
    },
    {
      periodStart: '1978-03-06',
      periodEnd: '1978-04-05',
      pensionDate: {
        type: FIXED,
        value: '2046-03-06'
      }
    },
    {
      periodStart: '1978-04-06',
      pensionDate: {
        type: AGE,
        years: 68,
        months: 0
      }
    }
  ]
});
