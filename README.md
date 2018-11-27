# get-uk-state-pension-date #

This package can be used in two different ways.

1) Installed from a GitLab repository, as a dependency in your package.json file.

2) Cloned from the repository to provide a simple REST based service.


## 1) Package dependency

This package, provides two simple functions that allows the calculation of the
Date on which a UK citizen becomes elligible for their State Pension.

The functions are...

```javascript
getStatePensionDate(dateOfBirth, gender)
getStatePensionDateAsString(dateOfBirth, gender)
```

Where...

* 'dateOfBirth' must be in the YYYY-MM-DD format.
* 'gender' must be one of 'F', 'FEMALE', 'M' or 'MALE' (case insensitive).
* YYYY-MM-DD is the only format supported.
* The YYYY section of the Date of Birth must be in the range 1000 - 4000 (Arbitrary limits imposed by author).
* The 'getStatePensionDate' function returns a Date object representing the State Pension Date.
* The 'getStatePensionDateAsString' function returns a String containing the State Pension Date in the YYYY-MM-DD format.
* If the input provided is invalid the function will throw TypeError('Invalid Input').
* If the State Pension Date cannot be determined, a value of 'undefined' will be returned (by both functions).
* Invalid date values (e.g. 29 feb in non-leap years, or 31 April etc.) will result in 'undefined' being returned (by both functions).
* Invalid gender values (anything other than 'F', 'FEMALE', 'M' or 'MALE') will result in 'undefined' being returned (by both functions).

## Example

Install by cloning this repository and running `npm install`. Once installed, then the functions can simply be required within a Javascrip file
as follows...

```javascript
// Require the module
const UKStatePension = require('get-uk-state-pension-date');

const getUkStatePensionDate = UKStatePension.getUkStatePensionDate;
const getUkStatePensionDateAsString = UKStatePension.getUkStatePensionDateAsString;

// Get state pension date for a male born on 25 March 1990
const pensionDate = getUkStatePensionDate('1990-03-25', 'M');

// Write result to console
console.log(`For a male born on 25 March 1990, their state Pension Date would be ${pensionDate}`);

// Get the same item as a string in the YYYY-MM-DD format
const pensionDateString = getUkStatePensionDateAsString('1990-03-25', 'M');

// Write result to console
console.log(`For a male born on 25 March 1990, their state Pension Date would be ${pensionDateString}`);
```

Error Handling
## 2) Server process
After cloning the project from a repository, and running 'npm install', you can run the following to ensure the component is working correctly:

```script
npm test
```

then you can start a simple server by executing...

```script
npm start
```

** the service will start on port 5000 by default.  To set a different port configure an environment variable SPA_PORT

e.g. SPA_PORT=4001

Once running, the service will accept requests that supply a date of birth and a
gender, and will return a simple piece of content showing the state pension
date.

The RESTfull interface provides 2 endpoints:

##### 1) Get state pension date which provides the state pension age for a given birthday and sex; this is called as per the below query.

Example query...

```html
http://localhost/1990-03-10/M
```

Would return...

```json
{
    "statePensionDate": "2058-03-10T00:00:00.000Z"
}
```

If the input provided is invalid the rest service will return 400 http status code and, for example, the json

```json
{
    "error":"The client input was invalid: Date of birth: '1990-03-10', Gender: 'G'"
}
```

If an error is thrown while processing the rest service will return 500 http status code and, for example, the json


```json
{
   "error":"Unexpected error occurred for input: Date of birth: '1990-03-10', Gender: 'F'"
}
```


##### 2) Ping health which provides a check point for health monitors to call into to ensure the service is up; this is called as per the below query.

Example query...

```html
http://localhost/ping
```

Would return...

```html
pong
```


# Caveat

The dates produced by this package are based on legislation in place at the point of publishing (November 2018).
Dates that fall beyond the current legislation (i.e. after 5/4/1977) are calculated on a best endeavours basis only.

see below link for fuller details
```html
https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/310231/spa-timetable.pdf
```
E&OE
