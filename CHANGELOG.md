# Changelog
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][unreleased]
- There are no unreleased features at this time

## [2.0.0 - 2022-02-08][2.0.0]
### Breaking Changes
- Updated `provision` to return an array of results from `insert` instead of the result from `Array.push`
- Removed documentation generation due to the utility library being unmaintained and severely out of date
- Removed deprecated function `addData` in favor of using `alsoRemove`. 
### Updated
- Updated all dependencies
- Changed `provision` to execute inserts sequentially, ensuring order`

## [1.3.0 - 2020-05-06][1.3.0]
### Updated
- Added support for batched provisioning

## [1.2.1 - 2019-05-06][1.2.1]
### Updated
- Fixed and simplified example fixtures
- Added (README.md)[/README.md]
- Added CHANGELOG.md
- Updated `addData` deprecation warning
- Added nodejs 10 to travis configuration
- Updated linting rules to adhere to "lib" rules
- Added npm scripts for generating function documentation

[1.2.1]: https://github.com/SparkPost/fixture-interface/compare/v1.2.0...v1.2.1
[1.3.0]: https://github.com/SparkPost/fixture-interface/compare/v1.2.1...v1.3.0
[2.0.0]: https://github.com/SparkPost/fixture-interface/compare/v1.3.0...v2.0.0
