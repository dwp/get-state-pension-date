'use strict';

const t = require('tap');
const {getStatePensionDate: getSPADate} = require('../src/get-state-pension-date');

t.type(getSPADate('1953-12-05', 'male'), Date, 'returns a Date');

// Input parameter validation
t.test('Throw if', async t => {
  t.throws(() => getSPADate(9, 'male'), 'Date of birth is not a string');
  t.throws(() => getSPADate('01-02-1920', 'male'), 'Date of birth is not a YYYY-MM-DD string');
  t.throws(() => getSPADate('1950-00-00', 'female'), 'Date of birth is a YYYY-MM-DD string but not a valid date');
  t.throws(() => getSPADate('1950-03-05', false), 'Gender is not a string');
  t.throws(() => getSPADate('1950-03-05', 'fail'), 'Gender is a string but not male or female');
});

t.same(
  getSPADate('1954-03-05', 'male'),
  getSPADate('1954-3-5', 'male'),
  'Supports dates with and without leading zeros'
);

t.test('Men pre-equalisation', async t => {
  t.test('Born before 6 Dec 1953 retire at 65', async t => {
    t.same(getSPADate('1900-01-01', 'male'), new Date(1965, 0, 1), 'Born on 1900-01-01');
    t.same(getSPADate('1952-02-29', 'male'), new Date(2017, 2, 1), 'Born on 1952-02-29 (leap date)');
    t.same(getSPADate('1953-12-05', 'male'), new Date(2018, 11, 5), 'Born on 1953-12-05');
  });
});

t.test('Women pre-equalisation', async t => {
  t.test('Women born before 6 Apr 1950 retire at 60', async t => {
    t.same(getSPADate('1900-01-01', 'female'), new Date(1960, 0, 1), 'Born on 1900-01-01');
    t.same(getSPADate('1950-04-05', 'female'), new Date(2010, 3, 5), 'Born on 1950-04-05');
  });

  // Pensions act 1995
  t.test('Women born 6 Apr 1950 - 5 May 1950, retire on 6 May 2010', async t => {
    t.same(getSPADate('1950-04-06', 'female'), new Date(2010, 4, 6), 'Born on 1950-04-06');
    t.same(getSPADate('1950-05-05', 'female'), new Date(2010, 4, 6), 'Born on 1950-05-05');
  });

  t.test('Women born 6 May 1950 - 5 Jun 1950, retire on 6 Jul 2010', async t => {
    t.same(getSPADate('1950-05-06', 'female'), new Date(2010, 6, 6), 'Born on 1950-05-06');
    t.same(getSPADate('1950-06-05', 'female'), new Date(2010, 6, 6), 'Born on 1950-06-05');
  });

  t.test('Women born 6 Jun 1950 - 5 Jul 1950, retire on 6 Sep 2010', async t => {
    t.same(getSPADate('1950-06-06', 'female'), new Date(2010, 8, 6), 'Born on 1950-06-06');
    t.same(getSPADate('1950-07-05', 'female'), new Date(2010, 8, 6), 'Born on 1950-07-05');
  });

  t.test('Women born 6 Jul 1950 - 5 Aug 1950, retire on 6 Nov 2010', async t => {
    t.same(getSPADate('1950-07-06', 'female'), new Date(2010, 10, 6), 'Born on 1950-07-06');
    t.same(getSPADate('1950-08-05', 'female'), new Date(2010, 10, 6), 'Born on 1950-08-05');
  });

  t.test('Women born 6 Aug 1950 - 5 Sep 1950, retire on 6 Jan 2011', async t => {
    t.same(getSPADate('1950-08-06', 'female'), new Date(2011, 0, 6), 'Born on 1950-08-06');
    t.same(getSPADate('1950-09-05', 'female'), new Date(2011, 0, 6), 'Born on 1950-09-05');
  });

  t.test('Women born 6 Sep 1950 - 5 Oct 1950, retire on 6 Mar 2011', async t => {
    t.same(getSPADate('1950-09-06', 'female'), new Date(2011, 2, 6), 'Born on 1950-09-06');
    t.same(getSPADate('1950-10-05', 'female'), new Date(2011, 2, 6), 'Born on 1950-10-05');
  });

  t.test('Women born 6 Oct 1950 - 5 Nov 1950, retire on 6 May 2011', async t => {
    t.same(getSPADate('1950-10-06', 'female'), new Date(2011, 4, 6), 'Born on 1950-10-06');
    t.same(getSPADate('1950-11-05', 'female'), new Date(2011, 4, 6), 'Born on 1950-11-05');
  });

  t.test('Women born 6 Nov 1950 - 5 Dec 1950, retire on 6 Jul 2011', async t => {
    t.same(getSPADate('1950-11-06', 'female'), new Date(2011, 6, 6), 'Born on 1950-11-06');
    t.same(getSPADate('1950-12-05', 'female'), new Date(2011, 6, 6), 'Born on 1950-12-05');
  });

  t.test('Women born 6 Dec 1950 - 5 Jan 1951, retire on 6 Sep 2011', async t => {
    t.same(getSPADate('1950-12-06', 'female'), new Date(2011, 8, 6), 'Born on 1950-12-06');
    t.same(getSPADate('1951-01-05', 'female'), new Date(2011, 8, 6), 'Born on 1951-01-05');
  });

  t.test('Women born 6 Jan 1951 - 5 Feb 1951, retire on 6 Nov 2011', async t => {
    t.same(getSPADate('1951-01-06', 'female'), new Date(2011, 10, 6), 'Born on 1951-01-06');
    t.same(getSPADate('1951-02-05', 'female'), new Date(2011, 10, 6), 'Born on 1951-02-05');
  });

  t.test('Women born 6 Feb 1951 - 5 Mar 1951, retire on 6 Jan 2012', async t => {
    t.same(getSPADate('1951-02-06', 'female'), new Date(2012, 0, 6), 'Born on 1951-02-06');
    t.same(getSPADate('1951-03-05', 'female'), new Date(2012, 0, 6), 'Born on 1951-03-05');
  });

  t.test('Women born 6 Mar 1951 - 5 Apr 1951, retire on 6 Mar 2012', async t => {
    t.same(getSPADate('1951-03-06', 'female'), new Date(2012, 2, 6), 'Born on 1951-03-06');
    t.same(getSPADate('1951-04-05', 'female'), new Date(2012, 2, 6), 'Born on 1951-04-05');
  });

  t.test('Women born 6 Apr 1951 - 5 May 1951, retire on 6 May 2012', async t => {
    t.same(getSPADate('1951-04-06', 'female'), new Date(2012, 4, 6), 'Born on 1951-04-06');
    t.same(getSPADate('1951-05-05', 'female'), new Date(2012, 4, 6), 'Born on 1951-05-05');
  });

  t.test('Women born 6 May 1951 - 5 Jun 1951, retire on 6 Jul 2012', async t => {
    t.same(getSPADate('1951-05-06', 'female'), new Date(2012, 6, 6), 'Born on 1951-05-06');
    t.same(getSPADate('1951-06-05', 'female'), new Date(2012, 6, 6), 'Born on 1951-06-05');
  });

  t.test('Women born 6 Jun 1951 - 5 Jul 1951, retire on 6 Sep 2012', async t => {
    t.same(getSPADate('1951-06-06', 'female'), new Date(2012, 8, 6), 'Born on 1951-06-06');
    t.same(getSPADate('1951-07-05', 'female'), new Date(2012, 8, 6), 'Born on 1951-07-05');
  });

  t.test('Women born 6 Jul 1951 - 5 Aug 1951, retire on 6 Nov 2012', async t => {
    t.same(getSPADate('1951-07-06', 'female'), new Date(2012, 10, 6), 'Born on 1951-07-06');
    t.same(getSPADate('1951-08-05', 'female'), new Date(2012, 10, 6), 'Born on 1951-08-05');
  });

  t.test('Women born 6 Aug 1951 - 5 Sep 1951, retire on 6 Jan 2013', async t => {
    t.same(getSPADate('1951-08-06', 'female'), new Date(2013, 0, 6), 'Born on 1951-08-06');
    t.same(getSPADate('1951-09-05', 'female'), new Date(2013, 0, 6), 'Born on 1951-09-05');
  });

  t.test('Women born 6 Sep 1951 - 5 Oct 1951, retire on 6 Mar 2013', async t => {
    t.same(getSPADate('1951-09-06', 'female'), new Date(2013, 2, 6), 'Born on 1951-09-06');
    t.same(getSPADate('1951-10-05', 'female'), new Date(2013, 2, 6), 'Born on 1951-10-05');
  });

  t.test('Women born 6 Oct 1951 - 5 Nov 1951, retire on 6 May 2013', async t => {
    t.same(getSPADate('1951-10-06', 'female'), new Date(2013, 4, 6), 'Born on 1951-10-06');
    t.same(getSPADate('1951-11-05', 'female'), new Date(2013, 4, 6), 'Born on 1951-11-05');
  });

  t.test('Women born 6 Nov 1951 - 5 Dec 1951, retire on 6 Jul 2013', async t => {
    t.same(getSPADate('1951-11-06', 'female'), new Date(2013, 6, 6), 'Born on 1951-11-06');
    t.same(getSPADate('1951-12-05', 'female'), new Date(2013, 6, 6), 'Born on 1951-12-05');
  });

  t.test('Women born 6 Dec 1951 - 5 Jan 1951, retire on 6 Sep 2013', async t => {
    t.same(getSPADate('1951-12-06', 'female'), new Date(2013, 8, 6), 'Born on 1951-12-06');
    t.same(getSPADate('1952-01-05', 'female'), new Date(2013, 8, 6), 'Born on 1952-01-05');
  });

  t.test('Women born 6 Jan 1952 - 5 Feb 1952, retire on 6 Nov 2013', async t => {
    t.same(getSPADate('1952-01-06', 'female'), new Date(2013, 10, 6), 'Born on 1952-01-06');
    t.same(getSPADate('1952-02-05', 'female'), new Date(2013, 10, 6), 'Born on 1952-02-05');
  });

  t.test('Women born 6 Feb 1952 - 5 Mar 1952, retire on 6 Jan 2014', async t => {
    t.same(getSPADate('1952-02-06', 'female'), new Date(2014, 0, 6), 'Born on 1952-02-06');
    t.same(getSPADate('1952-03-05', 'female'), new Date(2014, 0, 6), 'Born on 1952-03-05');
  });

  t.test('Women born 6 Mar 1952 - 5 Apr 1952, retire on 6 Mar 2014', async t => {
    t.same(getSPADate('1952-03-06', 'female'), new Date(2014, 2, 6), 'Born on 1952-03-06');
    t.same(getSPADate('1952-04-05', 'female'), new Date(2014, 2, 6), 'Born on 1952-04-05');
  });

  t.test('Women born 6 Apr 1952 - 5 May 1952, retire on 6 May 2014', async t => {
    t.same(getSPADate('1952-04-06', 'female'), new Date(2014, 4, 6), 'Born on 1952-04-06');
    t.same(getSPADate('1952-05-05', 'female'), new Date(2014, 4, 6), 'Born on 1952-05-05');
  });

  t.test('Women born 6 May 1952 - 5 Jun 1952, retire on 6 Jul 2014', async t => {
    t.same(getSPADate('1952-05-06', 'female'), new Date(2014, 6, 6), 'Born on 1952-05-06');
    t.same(getSPADate('1952-06-05', 'female'), new Date(2014, 6, 6), 'Born on 1952-06-05');
  });

  t.test('Women born 6 Jun 1952 - 5 Jul 1952, retire on 6 Sep 2014', async t => {
    t.same(getSPADate('1952-06-06', 'female'), new Date(2014, 8, 6), 'Born on 1952-06-06');
    t.same(getSPADate('1952-07-05', 'female'), new Date(2014, 8, 6), 'Born on 1952-07-05');
  });

  t.test('Women born 6 Jul 1952 - 5 Aug 1952, retire on 6 Nov 2014', async t => {
    t.same(getSPADate('1952-07-06', 'female'), new Date(2014, 10, 6), 'Born on 1952-07-06');
    t.same(getSPADate('1952-08-05', 'female'), new Date(2014, 10, 6), 'Born on 1952-08-05');
  });

  t.test('Women born 6 Aug 1952 - 5 Sep 1952, retire on 6 Jan 2015', async t => {
    t.same(getSPADate('1952-08-06', 'female'), new Date(2015, 0, 6), 'Born on 1952-08-06');
    t.same(getSPADate('1952-09-05', 'female'), new Date(2015, 0, 6), 'Born on 1952-09-05');
  });

  t.test('Women born 6 Sep 1952 - 5 Oct 1952, retire on 6 Mar 2015', async t => {
    t.same(getSPADate('1952-09-06', 'female'), new Date(2015, 2, 6), 'Born on 1952-09-06');
    t.same(getSPADate('1952-10-05', 'female'), new Date(2015, 2, 6), 'Born on 1952-10-05');
  });

  t.test('Women born 6 Oct 1952 - 5 Nov 1952, retire on 6 May 2015', async t => {
    t.same(getSPADate('1952-10-06', 'female'), new Date(2015, 4, 6), 'Born on 1952-10-06');
    t.same(getSPADate('1952-11-05', 'female'), new Date(2015, 4, 6), 'Born on 1952-11-05');
  });

  t.test('Women born 6 Nov 1952 - 5 Dec 1952, retire on 6 Jul 2015', async t => {
    t.same(getSPADate('1952-11-06', 'female'), new Date(2015, 6, 6), 'Born on 1952-11-06');
    t.same(getSPADate('1952-12-05', 'female'), new Date(2015, 6, 6), 'Born on 1952-12-05');
  });

  t.test('Women born 6 Dec 1952 - 5 Jan 1953, retire on 6 Sep 2015', async t => {
    t.same(getSPADate('1952-12-06', 'female'), new Date(2015, 8, 6), 'Born on 1952-12-06');
    t.same(getSPADate('1953-01-05', 'female'), new Date(2015, 8, 6), 'Born on 1953-01-05');
  });

  t.test('Women born 6 Jan 1953 - 5 Feb 1953, retire on 6 Nov 2015', async t => {
    t.same(getSPADate('1953-01-06', 'female'), new Date(2015, 10, 6), 'Born on 1953-01-06');
    t.same(getSPADate('1953-02-05', 'female'), new Date(2015, 10, 6), 'Born on 1953-02-05');
  });

  t.test('Women born 6 Feb 1953 - 5 Mar 1953, retire on 6 Jan 2016', async t => {
    t.same(getSPADate('1953-02-06', 'female'), new Date(2016, 0, 6), 'Born on 1953-02-06');
    t.same(getSPADate('1953-03-05', 'female'), new Date(2016, 0, 6), 'Born on 1953-03-05');
  });

  t.test('Women born 6 Mar 1953 - 5 Apr 1953, retire on 6 Mar 2016', async t => {
    t.same(getSPADate('1953-03-06', 'female'), new Date(2016, 2, 6), 'Born on 1953-03-06');
    t.same(getSPADate('1953-04-05', 'female'), new Date(2016, 2, 6), 'Born on 1953-04-05');
  });

  // Pensions act 2011
  t.test('Women born 6 Apr 1953 - 5 May 1953, retire on 6 Jul 2016', async t => {
    t.same(getSPADate('1953-04-06', 'female'), new Date(2016, 6, 6), 'Born on 1953-04-06');
    t.same(getSPADate('1953-05-05', 'female'), new Date(2016, 6, 6), 'Born on 1953-05-05');
  });

  t.test('Women born 6 May 1953 - 5 Jun 1953, retire on 6 Nov 2016', async t => {
    t.same(getSPADate('1953-05-06', 'female'), new Date(2016, 10, 6), 'Born on 1953-05-06');
    t.same(getSPADate('1953-06-05', 'female'), new Date(2016, 10, 6), 'Born on 1953-06-05');
  });

  t.test('Women born 6 Jun 1953 - 5 Jul 1953, retire on 6 Mar 2017', async t => {
    t.same(getSPADate('1953-06-06', 'female'), new Date(2017, 2, 6), 'Born on 1953-06-06');
    t.same(getSPADate('1953-07-05', 'female'), new Date(2017, 2, 6), 'Born on 1953-07-05');
  });

  t.test('Women born 6 Jul 1953 - 5 Aug 1953, retire on 6 Jul 2017', async t => {
    t.same(getSPADate('1953-07-06', 'female'), new Date(2017, 6, 6), 'Born on 1953-07-06');
    t.same(getSPADate('1953-08-05', 'female'), new Date(2017, 6, 6), 'Born on 1953-08-05');
  });

  t.test('Women born 6 Aug 1953 - 5 Sep 1953, retire on 6 Nov 2017', async t => {
    t.same(getSPADate('1953-08-06', 'female'), new Date(2017, 10, 6), 'Born on 1953-08-06');
    t.same(getSPADate('1953-09-05', 'female'), new Date(2017, 10, 6), 'Born on 1953-09-05');
  });

  t.test('Women born 6 Sep 1953 - 5 Oct 1953, retire on 6 Mar 2018', async t => {
    t.same(getSPADate('1953-09-06', 'female'), new Date(2018, 2, 6), 'Born on 1953-09-06');
    t.same(getSPADate('1953-10-05', 'female'), new Date(2018, 2, 6), 'Born on 1953-10-05');
  });

  t.test('Women born 6 Oct 1953 - 5 Nov 1953, retire on 6 Jul 2018', async t => {
    t.same(getSPADate('1953-10-06', 'female'), new Date(2018, 6, 6), 'Born on 1953-10-06');
    t.same(getSPADate('1953-11-05', 'female'), new Date(2018, 6, 6), 'Born on 1953-11-05');
  });

  t.test('Women born 6 Nov 1953 - 5 Dec 1953, retire on 6 Nov 2018', async t => {
    t.same(getSPADate('1953-11-06', 'female'), new Date(2018, 10, 6), 'Born on 1953-11-06');
    t.same(getSPADate('1953-12-05', 'female'), new Date(2018, 10, 6), 'Born on 1953-12-05');
  });
});

t.test('Equalisation', async t => {
  t.test('All people born 6 Dec 1953 - 5 Jan 1953, retire on 6 Mar 2019', async t => {
    t.same(getSPADate('1953-12-06', 'female'), new Date(2019, 2, 6), 'Women born on 1953-12-06');
    t.same(getSPADate('1954-01-05', 'female'), new Date(2019, 2, 6), 'Women born on 1954-01-05');
    t.same(getSPADate('1953-12-06', 'male'), new Date(2019, 2, 6), 'Men born on 1953-12-06');
    t.same(getSPADate('1954-01-05', 'male'), new Date(2019, 2, 6), 'Men born on 1954-01-05');
  });

  t.test('All people born 6 Jan 1953 - 5 Feb 1953, retire on 6 May 2019', async t => {
    t.same(getSPADate('1954-01-06', 'female'), new Date(2019, 4, 6), 'Women born on 1954-01-06');
    t.same(getSPADate('1954-02-05', 'female'), new Date(2019, 4, 6), 'Women born on 1954-01-05');
    t.same(getSPADate('1954-01-06', 'male'), new Date(2019, 4, 6), 'Men born on 1954-01-06');
    t.same(getSPADate('1954-02-05', 'male'), new Date(2019, 4, 6), 'Men born on 1954-01-05');
  });

  t.test('All people born 6 Feb 1953 - 5 Mar 1953, retire on 6 Jul 2019', async t => {
    t.same(getSPADate('1954-02-06', 'female'), new Date(2019, 6, 6), 'Women born on 1954-02-06');
    t.same(getSPADate('1954-03-05', 'female'), new Date(2019, 6, 6), 'Women born on 1954-03-05');
    t.same(getSPADate('1954-02-06', 'male'), new Date(2019, 6, 6), 'Men born on 1954-02-06');
    t.same(getSPADate('1954-03-05', 'male'), new Date(2019, 6, 6), 'Men born on 1954-03-05');
  });

  t.test('All people born 6 Mar 1953 - 5 Apr 1953, retire on 6 Sep 2019', async t => {
    t.same(getSPADate('1954-03-06', 'female'), new Date(2019, 8, 6), 'Women born on 1954-03-06');
    t.same(getSPADate('1954-04-05', 'female'), new Date(2019, 8, 6), 'Women born on 1954-04-05');
    t.same(getSPADate('1954-03-06', 'male'), new Date(2019, 8, 6), 'Men born on 1954-03-06');
    t.same(getSPADate('1954-04-05', 'male'), new Date(2019, 8, 6), 'Men born on 1954-04-05');
  });

  t.test('All people born 6 Apr 1953 - 5 May 1953, retire on 6 Nov 2019', async t => {
    t.same(getSPADate('1954-04-06', 'female'), new Date(2019, 10, 6), 'Women born on 1954-04-06');
    t.same(getSPADate('1954-05-05', 'female'), new Date(2019, 10, 6), 'Women born on 1954-05-05');
    t.same(getSPADate('1954-04-06', 'male'), new Date(2019, 10, 6), 'Men born on 1954-04-06');
    t.same(getSPADate('1954-05-05', 'male'), new Date(2019, 10, 6), 'Men born on 1954-05-05');
  });

  t.test('All people born 6 May 1953 - 5 Jun 1953, retire on 6 Jan 2020', async t => {
    t.same(getSPADate('1954-05-06', 'female'), new Date(2020, 0, 6), 'Women born on 1954-05-06');
    t.same(getSPADate('1954-06-05', 'female'), new Date(2020, 0, 6), 'Women born on 1954-06-05');
    t.same(getSPADate('1954-05-06', 'male'), new Date(2020, 0, 6), 'Men born on 1954-04-06');
    t.same(getSPADate('1954-06-05', 'male'), new Date(2020, 0, 6), 'Men born on 1954-06-05');
  });

  t.test('All people born 6 Jun 1953 - 5 Jul 1953, retire on 6 Mar 2020', async t => {
    t.same(getSPADate('1954-06-06', 'female'), new Date(2020, 2, 6), 'Women born on 1954-06-06');
    t.same(getSPADate('1954-07-05', 'female'), new Date(2020, 2, 6), 'Women born on 1954-07-05');
    t.same(getSPADate('1954-06-06', 'male'), new Date(2020, 2, 6), 'Men born on 1954-06-06');
    t.same(getSPADate('1954-07-05', 'male'), new Date(2020, 2, 6), 'Men born on 1954-07-05');
  });

  t.test('All people born 6 Jul 1953 - 5 Aug 1953, retire on 6 May 2020', async t => {
    t.same(getSPADate('1954-07-06', 'female'), new Date(2020, 4, 6), 'Women born on 1954-07-06');
    t.same(getSPADate('1954-08-05', 'female'), new Date(2020, 4, 6), 'Women born on 1954-08-05');
    t.same(getSPADate('1954-07-06', 'male'), new Date(2020, 4, 6), 'Men born on 1954-07-06');
    t.same(getSPADate('1954-08-05', 'male'), new Date(2020, 4, 6), 'Men born on 1954-08-05');
  });

  t.test('All people born 6 Aug 1953 - 5 Sep 1953, retire on 6 Jul 2020', async t => {
    t.same(getSPADate('1954-08-06', 'female'), new Date(2020, 6, 6), 'Women born on 1954-08-06');
    t.same(getSPADate('1954-09-05', 'female'), new Date(2020, 6, 6), 'Women born on 1954-09-05');
    t.same(getSPADate('1954-08-06', 'male'), new Date(2020, 6, 6), 'Men born on 1954-08-06');
    t.same(getSPADate('1954-09-05', 'male'), new Date(2020, 6, 6), 'Men born on 1954-09-05');
  });

  t.test('All people born 6 Sep 1953 - 5 Oct 1953, retire on 6 Sep 2020', async t => {
    t.same(getSPADate('1954-09-06', 'female'), new Date(2020, 8, 6), 'Women born on 1954-09-06');
    t.same(getSPADate('1954-10-05', 'female'), new Date(2020, 8, 6), 'Women born on 1954-10-05');
    t.same(getSPADate('1954-09-06', 'male'), new Date(2020, 8, 6), 'Men born on 1954-09-06');
    t.same(getSPADate('1954-10-05', 'male'), new Date(2020, 8, 6), 'Men born on 1954-10-05');
  });

  t.test('All people born 6 Oct 1953 - 5 Apr 1960, retire on their 66th birthday', async t => {
    t.same(getSPADate('1954-10-06', 'female'), new Date(2020, 9, 6), 'Women born on 1954-10-06');
    t.same(getSPADate('1960-04-05', 'female'), new Date(2026, 3, 5), 'Women born on 1960-04-05');
    t.same(getSPADate('1954-10-06', 'male'), new Date(2020, 9, 6), 'Men born on 1954-10-06');
    t.same(getSPADate('1960-04-05', 'male'), new Date(2026, 3, 5), 'Men born on 1960-04-05');
    // Leap day 29 Feb 1956
    t.same(getSPADate('1956-02-29', 'female'), new Date(2022, 2, 1), 'Women born on 1956-02-29 (leap day)');
    t.same(getSPADate('1956-02-29', 'male'), new Date(2022, 2, 1), 'Men born on 1956-02-29 (leap day)');
  });

  // Pensions act 2014
  t.test('All people born 6 Apr 1960 - 5 May 1960, retire after 66 years and 1 month', async t => {
    t.same(getSPADate('1960-04-06', 'female'), new Date(2026, 4, 6), 'Women born on 1960-04-06');
    t.same(getSPADate('1960-05-05', 'female'), new Date(2026, 5, 5), 'Women born on 1960-05-05');
    t.same(getSPADate('1960-04-06', 'male'), new Date(2026, 4, 6), 'Men born on 1960-04-06');
    t.same(getSPADate('1960-05-05', 'male'), new Date(2026, 5, 5), 'Men born on 1960-05-05');
  });

  t.test('All people born 6 May 1960 - 5 Jun 1960, retire after 66 years and 2 months', async t => {
    t.same(getSPADate('1960-05-06', 'female'), new Date(2026, 6, 6), 'Women born on 1960-05-06');
    t.same(getSPADate('1960-06-05', 'female'), new Date(2026, 7, 5), 'Women born on 1960-06-05');
    t.same(getSPADate('1960-05-06', 'male'), new Date(2026, 6, 6), 'Men born on 1960-05-06');
    t.same(getSPADate('1960-06-05', 'male'), new Date(2026, 7, 5), 'Men born on 1960-06-05');
  });

  t.test('All people born 6 Jun 1960 - 5 Jul 1960, retire after 66 years and 3 months', async t => {
    t.same(getSPADate('1960-06-06', 'female'), new Date(2026, 8, 6), 'Women born on 1960-06-06');
    t.same(getSPADate('1960-07-05', 'female'), new Date(2026, 9, 5), 'Women born on 1960-07-05');
    t.same(getSPADate('1960-06-06', 'male'), new Date(2026, 8, 6), 'Men born on 1960-06-06');
    t.same(getSPADate('1960-07-05', 'male'), new Date(2026, 9, 5), 'Men born on 1960-07-05');
  });

  t.test('All people born 6 Jul 1960 - 5 Aug 1960, retire after 66 years and 4 months', async t => {
    t.same(getSPADate('1960-07-06', 'female'), new Date(2026, 10, 6), 'Women born on 1960-07-06');
    t.same(getSPADate('1960-07-31', 'female'), new Date(2026, 10, 30), 'Women born on 1960-07-31');
    t.same(getSPADate('1960-08-05', 'female'), new Date(2026, 11, 5), 'Women born on 1960-08-05');
    t.same(getSPADate('1960-07-06', 'male'), new Date(2026, 10, 6), 'Men born on 1960-07-06');
    t.same(getSPADate('1960-07-31', 'male'), new Date(2026, 10, 30), 'Men born on 1960-07-31');
    t.same(getSPADate('1960-08-05', 'male'), new Date(2026, 11, 5), 'Men born on 1960-08-05');
  });

  t.test('All people born 6 Aug 1960 - 5 Sep 1960, retire after 66 years and 5 months', async t => {
    t.same(getSPADate('1960-08-06', 'female'), new Date(2027, 0, 6), 'Women born on 1960-08-06');
    t.same(getSPADate('1960-09-05', 'female'), new Date(2027, 1, 5), 'Women born on 1960-09-05');
    t.same(getSPADate('1960-08-06', 'male'), new Date(2027, 0, 6), 'Men born on 1960-08-06');
    t.same(getSPADate('1960-09-05', 'male'), new Date(2027, 1, 5), 'Men born on 1960-09-05');
  });

  t.test('All people born 6 Sep 1960 - 5 Oct 1960, retire after 66 years and 6 months', async t => {
    t.same(getSPADate('1960-09-06', 'female'), new Date(2027, 2, 6), 'Women born on 1960-09-06');
    t.same(getSPADate('1960-10-05', 'female'), new Date(2027, 3, 5), 'Women born on 1960-10-05');
    t.same(getSPADate('1960-09-06', 'male'), new Date(2027, 2, 6), 'Men born on 1960-09-06');
    t.same(getSPADate('1960-10-05', 'male'), new Date(2027, 3, 5), 'Men born on 1960-10-05');
  });

  t.test('All people born 6 Oct 1960 - 5 Nov 1960, retire after 66 years and 7 months', async t => {
    t.same(getSPADate('1960-10-06', 'female'), new Date(2027, 4, 6), 'Women born on 1960-10-06');
    t.same(getSPADate('1960-11-05', 'female'), new Date(2027, 5, 5), 'Women born on 1960-11-05');
    t.same(getSPADate('1960-10-06', 'male'), new Date(2027, 4, 6), 'Men born on 1960-10-06');
    t.same(getSPADate('1960-11-05', 'male'), new Date(2027, 5, 5), 'Men born on 1960-11-05');
  });

  t.test('All people born 6 Nov 1960 - 5 Dec 1960, retire after 66 years and 8 months', async t => {
    t.same(getSPADate('1960-11-06', 'female'), new Date(2027, 6, 6), 'Women born on 1960-11-06');
    t.same(getSPADate('1960-12-05', 'female'), new Date(2027, 7, 5), 'Women born on 1960-12-05');
    t.same(getSPADate('1960-11-06', 'male'), new Date(2027, 6, 6), 'Men born on 1960-11-06');
    t.same(getSPADate('1960-12-05', 'male'), new Date(2027, 7, 5), 'Men born on 1960-12-05');
  });

  t.test('All people born 6 Dec 1961 - 5 Jan 1961, retire after 66 years and 9 months', async t => {
    t.same(getSPADate('1960-12-06', 'female'), new Date(2027, 8, 6), 'Women born on 1960-12-06');
    t.same(getSPADate('1960-12-31', 'female'), new Date(2027, 8, 30), 'Women born on 1960-12-31');
    t.same(getSPADate('1961-01-05', 'female'), new Date(2027, 9, 5), 'Women born on 1961-01-05');
    t.same(getSPADate('1960-12-06', 'male'), new Date(2027, 8, 6), 'Men born on 1960-12-06');
    t.same(getSPADate('1960-12-31', 'male'), new Date(2027, 8, 30), 'Men born on 1960-12-31');
    t.same(getSPADate('1961-01-05', 'male'), new Date(2027, 9, 5), 'Men born on 1961-01-05');
  });

  t.test('All people born 6 Jan 1961 - 5 Feb 1961, retire after 66 years and 10 months', async t => {
    t.same(getSPADate('1961-01-06', 'female'), new Date(2027, 10, 6), 'Women born on 1961-01-06');
    t.same(getSPADate('1961-01-31', 'female'), new Date(2027, 10, 30), 'Women born on 1961-01-31');
    t.same(getSPADate('1961-02-05', 'female'), new Date(2027, 11, 5), 'Women born on 1961-02-05');
    t.same(getSPADate('1961-01-06', 'male'), new Date(2027, 10, 6), 'Men born on 1961-01-06');
    t.same(getSPADate('1961-01-31', 'male'), new Date(2027, 10, 30), 'Men born on 1961-01-31');
    t.same(getSPADate('1961-02-05', 'male'), new Date(2027, 11, 5), 'Men born on 1961-02-05');
  });

  t.test('All people born 6 Feb 1961 - 5 Mar 1961, retire after 66 years and 11 months', async t => {
    t.same(getSPADate('1961-02-06', 'female'), new Date(2028, 0, 6), 'Women born on 1961-02-06');
    t.same(getSPADate('1961-03-05', 'female'), new Date(2028, 1, 5), 'Women born on 1961-03-05');
    t.same(getSPADate('1961-02-06', 'male'), new Date(2028, 0, 6), 'Men born on 1961-02-06');
    t.same(getSPADate('1961-03-05', 'male'), new Date(2028, 1, 5), 'Men born on 1961-03-05');
  });

  t.test('All people born 6 Mar 1961 - 5 Apr 1977, retire on their 67th birthday', async t => {
    t.same(getSPADate('1961-03-06', 'female'), new Date(2028, 2, 6), 'Women born on 1961-03-06');
    t.same(getSPADate('1977-04-05', 'female'), new Date(2044, 3, 5), 'Women born on 1977-04-05');
    t.same(getSPADate('1961-03-06', 'male'), new Date(2028, 2, 6), 'Men born on 1961-03-06');
    t.same(getSPADate('1977-04-05', 'male'), new Date(2044, 3, 5), 'Men born on 1977-04-05');
  });

  // Pensions act 2007
  t.test('All people born 6 Apr 1977 - 5 May 1977, retire on 6 May 2044', async t => {
    t.same(getSPADate('1977-04-06', 'female'), new Date(2044, 4, 6), 'Women born on 1977-04-06');
    t.same(getSPADate('1977-05-05', 'female'), new Date(2044, 4, 6), 'Women born on 1977-05-05');
    t.same(getSPADate('1977-04-06', 'male'), new Date(2044, 4, 6), 'Men born on 1977-04-06');
    t.same(getSPADate('1977-05-05', 'male'), new Date(2044, 4, 6), 'Men born on 1977-05-05');
  });

  t.test('All people born 6 May 1977 - 5 Jun 1977, retire on 6 Jul 2044', async t => {
    t.same(getSPADate('1977-05-06', 'female'), new Date(2044, 6, 6), 'Women born on 1977-05-06');
    t.same(getSPADate('1977-06-05', 'female'), new Date(2044, 6, 6), 'Women born on 1977-06-05');
    t.same(getSPADate('1977-05-06', 'male'), new Date(2044, 6, 6), 'Men born on 1977-05-06');
    t.same(getSPADate('1977-06-05', 'male'), new Date(2044, 6, 6), 'Men born on 1977-06-05');
  });

  t.test('All people born 6 Jun 1977 - 5 Jul 1977, retire on 6 Sep 2044', async t => {
    t.same(getSPADate('1977-06-06', 'female'), new Date(2044, 8, 6), 'Women born on 1977-06-06');
    t.same(getSPADate('1977-07-05', 'female'), new Date(2044, 8, 6), 'Women born on 1977-07-05');
    t.same(getSPADate('1977-06-06', 'male'), new Date(2044, 8, 6), 'Men born on 1977-06-06');
    t.same(getSPADate('1977-07-05', 'male'), new Date(2044, 8, 6), 'Men born on 1977-07-05');
  });

  t.test('All people born 6 Jul 1977 - 5 Aug 1977, retire on 6 Nov 2044', async t => {
    t.same(getSPADate('1977-07-06', 'female'), new Date(2044, 10, 6), 'Women born on 1977-07-06');
    t.same(getSPADate('1977-08-05', 'female'), new Date(2044, 10, 6), 'Women born on 1977-08-05');
    t.same(getSPADate('1977-07-06', 'male'), new Date(2044, 10, 6), 'Men born on 1977-07-06');
    t.same(getSPADate('1977-08-05', 'male'), new Date(2044, 10, 6), 'Men born on 1977-08-05');
  });

  t.test('All people born 6 Aug 1977 - 5 Sep 1977, retire on 6 Jan 2045', async t => {
    t.same(getSPADate('1977-08-06', 'female'), new Date(2045, 0, 6), 'Women born on 1977-08-06');
    t.same(getSPADate('1977-09-05', 'female'), new Date(2045, 0, 6), 'Women born on 1977-09-05');
    t.same(getSPADate('1977-08-06', 'male'), new Date(2045, 0, 6), 'Men born on 1977-08-06');
    t.same(getSPADate('1977-09-05', 'male'), new Date(2045, 0, 6), 'Men born on 1977-09-05');
  });

  t.test('All people born 6 Sep 1977 - 5 Oct 1977, retire on 6 Mar 2045', async t => {
    t.same(getSPADate('1977-09-06', 'female'), new Date(2045, 2, 6), 'Women born on 1977-09-06');
    t.same(getSPADate('1977-10-05', 'female'), new Date(2045, 2, 6), 'Women born on 1977-10-05');
    t.same(getSPADate('1977-09-06', 'male'), new Date(2045, 2, 6), 'Men born on 1977-09-06');
    t.same(getSPADate('1977-10-05', 'male'), new Date(2045, 2, 6), 'Men born on 1977-10-05');
  });

  t.test('All people born 6 Oct 1977 - 5 Nov 1977, retire on 6 May 2045', async t => {
    t.same(getSPADate('1977-10-06', 'female'), new Date(2045, 4, 6), 'Women born on 1977-10-06');
    t.same(getSPADate('1977-11-05', 'female'), new Date(2045, 4, 6), 'Women born on 1977-11-05');
    t.same(getSPADate('1977-10-06', 'male'), new Date(2045, 4, 6), 'Men born on 1977-10-06');
    t.same(getSPADate('1977-11-05', 'male'), new Date(2045, 4, 6), 'Men born on 1977-11-05');
  });

  t.test('All people born 6 Nov 1977 - 5 Dec 1977, retire on 6 Jul 2045', async t => {
    t.same(getSPADate('1977-11-06', 'female'), new Date(2045, 6, 6), 'Women born on 1977-11-06');
    t.same(getSPADate('1977-12-05', 'female'), new Date(2045, 6, 6), 'Women born on 1977-12-05');
    t.same(getSPADate('1977-11-06', 'male'), new Date(2045, 6, 6), 'Men born on 1977-11-06');
    t.same(getSPADate('1977-12-05', 'male'), new Date(2045, 6, 6), 'Men born on 1977-12-05');
  });

  t.test('All people born 6 Dec 1977 - 5 Jan 1977, retire on 6 Sep 2045', async t => {
    t.same(getSPADate('1977-12-06', 'female'), new Date(2045, 8, 6), 'Women born on 1977-12-06');
    t.same(getSPADate('1978-01-05', 'female'), new Date(2045, 8, 6), 'Women born on 1978-01-05');
    t.same(getSPADate('1977-12-06', 'male'), new Date(2045, 8, 6), 'Men born on 1977-12-06');
    t.same(getSPADate('1978-01-05', 'male'), new Date(2045, 8, 6), 'Men born on 1978-01-05');
  });

  t.test('All people born 6 Jan 1978 - 5 Feb 1978, retire on 6 Nov 2045', async t => {
    t.same(getSPADate('1978-01-06', 'female'), new Date(2045, 10, 6), 'Women born on 1978-01-06');
    t.same(getSPADate('1978-02-05', 'female'), new Date(2045, 10, 6), 'Women born on 1978-02-05');
    t.same(getSPADate('1978-01-06', 'male'), new Date(2045, 10, 6), 'Men born on 1978-01-06');
    t.same(getSPADate('1978-02-05', 'male'), new Date(2045, 10, 6), 'Men born on 1978-02-05');
  });

  t.test('All people born 6 Feb 1978 - 5 Mar 1978, retire on 6 Jan 2046', async t => {
    t.same(getSPADate('1978-02-06', 'female'), new Date(2046, 0, 6), 'Women born on 1978-02-06');
    t.same(getSPADate('1978-03-05', 'female'), new Date(2046, 0, 6), 'Women born on 1978-03-05');
    t.same(getSPADate('1978-02-06', 'male'), new Date(2046, 0, 6), 'Men born on 1978-02-06');
    t.same(getSPADate('1978-03-05', 'male'), new Date(2046, 0, 6), 'Men born on 1978-03-05');
  });

  t.test('All people born 6 Mar 1978 - 5 Apr 1978, retire on 6 Mar 2046', async t => {
    t.same(getSPADate('1978-03-06', 'female'), new Date(2046, 2, 6), 'Women born on 1978-03-06');
    t.same(getSPADate('1978-04-05', 'female'), new Date(2046, 2, 6), 'Women born on 1978-04-05');
    t.same(getSPADate('1978-03-06', 'male'), new Date(2046, 2, 6), 'Men born on 1978-03-06');
    t.same(getSPADate('1978-04-05', 'male'), new Date(2046, 2, 6), 'Men born on 1978-04-05');
  });

  t.test('All people born 6 Apr 1978 - onwards, retire on their 68th birthday', async t => {
    // Men & Women between 6 Apr 1978 - onwards
    t.same(getSPADate('1978-04-06', 'female'), new Date(2046, 3, 6), 'Women born on 1978-04-06');
    t.same(getSPADate('1978-04-06', 'male'), new Date(2046, 3, 6), 'Men born on 1978-04-06');
    // Random future date - 29 Feb 2020
    t.same(getSPADate('2020-02-29', 'female'), new Date(2088, 1, 29), 'Women born on 2020-02-29');
    t.same(getSPADate('2020-02-29', 'male'), new Date(2088, 1, 29), 'Men born on 2020-02-29');
  });
});
