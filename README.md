# get-state-pension-date #

[![Build Status](https://travis-ci.org/gunjam/get-state-pension-date.svg?branch=master)](https://travis-ci.org/gunjam/get-state-pension-date)
[![Code Coverage](https://img.shields.io/codecov/c/github/gunjam/get-state-pension-date.svg)](https://codecov.io/github/gunjam/get-state-pension-date?branch=master)
[![ESLint code style](https://img.shields.io/badge/code_style-eslint-5ed9c7.svg)](https://github.com/dwp/eslint-config-bases)
[![Install size](https://packagephobia.now.sh/badge?p=get-state-pension-date)](https://packagephobia.now.sh/result?p=get-state-pension-date)

This package provides functions that allows the calculation of the date on which a UK citizen becomes eligible for their State Pension.

## Installation

```bash
npm install get-state-pension-date
```

## Usage

### `getStatePensionDate()`
Takes a date of birth string and a gender and returns a `Date` object representing when State Pension age would be reached.

**For example:**

```javascript
const {getStatePensionDate} = require('get-state-pension-date');

// Date: 2058-03-25T00:00:00.000Z
const spaDate = getStatePensionDate('1990-03-25', 'male');
```

### `getStatePensionDateAsString()`
Takes the same parameters as `getStatePensionDate()` but returns the State Pension age date as a `string`.

**For example:**

```javascript
const {getStatePensionDateAsString} = require('get-state-pension-date');

// string: 2058-03-25
const spaString = getStatePensionDateAsString('1990-03-25', 'female');
```

### `isOverStatePensionAge()`
Takes a date of birth and returns a `boolean`, returning `true` if the State Pension age date is today or in the past, `false` if it’s in the future.

**For example:**

```javascript
const {isOverStatePensionAge} = require('get-state-pension-date');

// boolean: true
const overSpa = isOverStatePensionAge('1953-03-25');

// boolean: false
const workingAge = isOverStatePensionAge('1990-03-25');
```

All functions will throw if the date of birth is not a `YYYY-MM-DD` formatted string or if the gender is not a string of `male` or `female`.

## Caveat

The dates produced by this package are based on legislation in place at the point of publishing (November 2018).
Dates that fall beyond the current legislation (i.e. after 5/4/1977) are calculated on a best endeavours basis only.

[Further information about State Pension age timetables](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/310231/spa-timetable.pdf).
