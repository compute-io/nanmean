nanmean
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the arithmetic mean over an array of values ignoring any values which are not numeric.


## Installation

``` bash
$ npm install compute-nanmean
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var nanmean = require( 'compute-nanmean' );
```

#### nanmean( arr )

Computes the arithmetic mean while ignoring any non-numeric values.

``` javascript
var data = [ 1, NaN, 2, 3, NaN ];

var mu = nanmean( data );
// returns 2
```


## Examples

``` javascript
var nanmean = require( 'compute-nanmean' );

var data = new Array( 1000 );

for ( var i = 0; i < data.length; i++ ) {
	if ( Math.floor( i/5 ) === 0 ) {
		data[ i ] = NaN;
	} else {
		data[ i ] = Math.random() * 100;
	}
}

console.log( nanmean( data ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Notes

The mean value of an array containing non-numeric values is equal to the mean value of an equivalent array which contains only the numeric values. Hence,

``` javascript
var d1 = [ 1, NaN, 2, 3, NaN ],
	d2 = [ 1, 2, 3 ];

console.log( nanmean( d1 ) === nanmean( d2 ) );
// returns true
```


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-nanmean.svg
[npm-url]: https://npmjs.org/package/compute-nanmean

[travis-image]: http://img.shields.io/travis/compute-io/nanmean/master.svg
[travis-url]: https://travis-ci.org/compute-io/nanmean

[coveralls-image]: https://img.shields.io/coveralls/compute-io/nanmean/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/nanmean?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/nanmean.svg
[dependencies-url]: https://david-dm.org/compute-io/nanmean

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/nanmean.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/nanmean

[github-issues-image]: http://img.shields.io/github/issues/compute-io/nanmean.svg
[github-issues-url]: https://github.com/compute-io/nanmean/issues