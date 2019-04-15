# Change Log

<a name="1.0.1"></a>
## [1.0.1](https://github.com/gunjam/get-state-pension-date/compare/1.0.0...1.0.1) (2019-04-15)

### Fixed

* Passing date strings with and without padded zeros for months and / or days could potentially return differing SPA dates

### Chore

* bump version of mocha to 6.1.3
* add git repository info to package.json


<a name="1.0.0"></a>
## [1.0.0](https://github.com/gunjam/get-state-pension-date/compare/9a3b94a...1.0.0) (2019-04-11)

### Features

* Added function to return `true` or `false` if over State Pension age ([5cc03b4](https://github.com/gunjam/get-state-pension-date/commit/5cc03b4))

### Refactor

* Forked from [BSP-State-Pension-Date](https://github.com/dwp/BSP-State-Pension-Date) removed Express server and refactored code ([4d6553c](https://github.com/gunjam/get-state-pension-date/commit/4d6553c))
