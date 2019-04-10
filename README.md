# get-state-pension-date #

This package provides functions that allows the calculation of the date on which a UK citizen becomes eligible for their State Pension.

## Installation

```bash
npm install get-state-pension-date
```

## Usage

`getStatePensionDate()` takes a date of birth string and a gender and returns a `Date` object representing when State Pension age would be reached.

**For example:**

```javascript
const {getStatePensionDate} = require('get-state-pension-date');

// Date: 2058-03-25T00:00:00.000Z
const spaDate = getStatePensionDate('1990-03-25', 'male');
```

`getStatePensionDateAsString()` takes the same parameters but returns the State Pension age date as a `string`.

**For example:**

```javascript
const {getStatePensionDateAsString} = require('get-state-pension-date');

// string: 2058-03-25
const spaString = getStatePensionDateAsString('1990-03-25', 'female');
```

`isOverStatePensionAge()` takes the same parameters but returns a `boolean` if the State Pension age date is today or in the past.

**For example:**

```javascript
const {isOverStatePensionAge} = require('get-state-pension-date');

// boolean: true
const overSpa = isOverStatePensionAge('1953-03-25', 'male');

// boolean: false
const workingAge = isOverStatePensionAge('1990-03-25', 'female');
```

All functions will throw if the date of birth is not a `YYYY-MM-DD` formatted string or if the gender is not a string of `male` or `female`.

## Caveat

The dates produced by this package are based on legislation in place at the point of publishing (November 2018).
Dates that fall beyond the current legislation (i.e. after 5/4/1977) are calculated on a best endeavours basis only.

[Further information about State Pension age timetables](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/310231/spa-timetable.pdf).
