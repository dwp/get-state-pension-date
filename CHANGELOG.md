# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.0.1](https://github.com/dwp/get-state-pension-date/compare/v2.0.0...v2.0.1) (2021-05-19)

<a name="2.0.0"></a>
## [2.0.0](https://github.com/gunjam/get-state-pension-date/compare/v1.0.2...v2.0.0) (2021-04-08)

### BREAKING CHANGES

`getStatePensionDate()` no longer returns UTC dates, dates are constructed using `new Date(int, int, int)` and will be in the local environments timezone.

### Features

* do not return UTC dates
* isOverStatePensionAge() no longer requires gender

### Chore

* bump dependencies
* update engines to > node 8
* remove old node versions from travis config
* clean up .gitignore

### Docs

* use SVG for build status instead of PNG

### Test

* convert tests from mocha to tap


<a name="1.0.2"></a>
## [1.0.2](https://github.com/gunjam/get-state-pension-date/compare/v1.0.1...v1.0.2) (2019-06-06)

### Refactor

* const some strings, restructure SPA data to be more efficient

### Chore

* bump version of mocha to 6.1.4
* bump version of nyc to 14.1.1

### Docs

* change function names to headings in README.md


<a name="1.0.1"></a>
## [1.0.1](https://github.com/gunjam/get-state-pension-date/compare/v1.0.0...v1.0.1) (2019-04-15)

### Fixed

* Passing date strings with and without padded zeros for months and / or days could potentially return differing SPA dates

### Chore

* bump version of mocha to 6.1.3
* add git repository info to package.json


<a name="1.0.0"></a>
## [1.0.0](https://github.com/gunjam/get-state-pension-date/compare/9a3b94a...v1.0.0) (2019-04-11)

### Features

* Added function to return `true` or `false` if over State Pension age ([5cc03b4](https://github.com/gunjam/get-state-pension-date/commit/5cc03b4))

### Refactor

* Forked from [BSP-State-Pension-Date](https://github.com/dwp/BSP-State-Pension-Date) removed Express server and refactored code ([4d6553c](https://github.com/gunjam/get-state-pension-date/commit/4d6553c))
