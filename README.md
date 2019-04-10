# get-state-pension-date #

This package provides two simple functions that allows the calculation of the date on which a UK citizen becomes eligible for their State Pension.

## Installation

```bash
npm install get-state-pension-date
```

## Usage

`getStatePensionDate()` takes a date of birth string and gender and returns a state pension age `Date` object.
`getStatePensionDateAsString()` takes the same parameters but returns a `string`.

For example:

```javascript
const {getStatePensionDate, getStatePensionDateAsString} = require('get-state-pension-date');

// Date: 2058-03-25T00:00:00.000Z
const SPADate = getStatePensionDate('1990-03-25', 'male');

// String: 2058-03-25
const SPAString = getStatePensionDateAsString('1990-03-25', 'female');
```

Both functions will throw if the date of birth is not a `YYYY-MM-DD` formatted
string or if the gender is not a string of `male` or `female`.

## Caveat

The dates produced by this package are based on legislation in place at the point of publishing (November 2018).
Dates that fall beyond the current legislation (i.e. after 5/4/1977) are calculated on a best endeavours basis only.

[Further information about State Pension age timetables](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/310231/spa-timetable.pdf).
