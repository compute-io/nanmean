nanmean
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the arithmetic mean ignoring any values which are not numeric or encoded as missing values.


## Installation

``` bash
$ npm install compute-nanmean
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage


``` javascript
var nanmean = require( 'compute-nanmean' );
```

#### nanmean( x[, opts] )

Computes the arithmetic mean ignoring any non-numeric values or values encoded as missing. `x` may be either an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix).


``` javascript
var data, mu;

data = [ 2, 4, NaN, 5, 3, 8, 2, NaN ];
mu = nanmean( data );
// returns 4

data = new Float64Array( data );
mu = nanmean( data );
// returns 4
```

If the array or matrix contains missing values encoded by numbers, use the `encoding` option to ensure they do not affect the calculation:

* __encoding__: `array` holding all values which will be regarded as missing values. Default: `[]`.

``` javascript
var data, mu;

data = [ 2, 4, 999, 5, 3, 8, 2, 981 ];
mu = nanmean( data, {
	'encoding': [ 981, 999 ]
});
// returns 4

data = new Int32Array( data );
mu = nanmean( data, {
	'encoding': [ 981, 999 ]
});
// returns 4
``` 

For object `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	{'x':2},
	{'x':4},
	{'x':NaN},
	{'x':5},
	{'x':3},
	{'x':8},
	{'x':2}
	{'x':NaN},
];

function getValue( d, i ) {
	return d.x;
}

var mu = nanmean( data, {
	'accessor': getValue
});
// returns 4
```

If provided a [`matrix`](https://github.com/dstructs/matrix), the function accepts the following two additional `options`:

*	__dim__: dimension along which to compute the [arithmetic mean](http://en.wikipedia.org/wiki/Arithmetic_mean). Default: `2` (along the columns).
*	__dtype__: output [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.

By default, the function computes the [arithmetic mean](http://en.wikipedia.org/wiki/Arithmetic_mean) along the columns (`dim=2`).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	mu,
	i;

data = new Int8Array( 25 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [5,5], 'int8' );
/*
	[  0  1  2  3  4
	   5  6  7  8  9
	  10 11 12 13 14
	  15 16 17 18 19
	  20 21 22 23 24 ]
*/

mu = nanmean( mat );
/*
	[  2
	   7
	  12
	  17
	  22 ]
*/
```

To compute the [arithmetic mean](http://en.wikipedia.org/wiki/Arithmetic_mean) along the rows, set the `dim` option to `1`.

``` javascript
mu = mean( mat, {
	'dim': 1
});
/*
	[ 10, 11, 12, 13, 14 ]
*/
```

By default, the output [`matrix`](https://github.com/dstructs/matrix) data type is `float64`. To specify a different output data type, set the `dtype` option.

``` javascript
mu = nanmean( mat, {
	'dim': 1,
	'dtype': 'uint8'
});
/*
	[ 10, 11, 12, 13, 14 ]
*/

var dtype = mu.dtype;
// returns 'uint8'
```

If provided a [`matrix`](https://github.com/dstructs/matrix) having either dimension equal to `1`, the function treats the [`matrix`](https://github.com/dstructs/matrix) as a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) and returns a `numeric` value.

``` javascript
data = [ 2, 4, 5, 3, 8, 2 ];

// Row vector:
mat = matrix( new Int8Array( data ), [1,6], 'int8' );
mu = nanmean( mat );
// returns 4

// Column vector:
mat = matrix( new Int8Array( data ), [6,1], 'int8' );
mu = nanmean( mat );
// returns 4
```

If provided an empty [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix), the function returns `null`.

``` javascript
mu = nanmean( [] );
// returns null

mu = nanmean( new Int8Array( [] ) );
// returns null

mu = nanmean( matrix( [0,0] ) );
// returns null

mu = nanmean( matrix( [0,10] ) );
// returns null

mu = nanmean( matrix( [10,0] ) );
// returns null
```

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	nanmean = require( 'compute-nanmean' );

var data,
	mat,
	mu,
	i;

// Plain arrays...
data = new Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	if ( i%5 === 0 ) {
		data[ i ] = NaN;
	} else {
		data[ i ] = Math.random() * 100;
	}
}
mu = nanmean( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
mu = nanmean( data, {
	'accessor': getValue
});

// Typed arrays...
data = new Int32Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	if ( i%5 === 0 ) {
		data[ i ] = 999;
	} else {
		data[ i ] = Math.random() * 100;
	}
}
mu = nanmean( data, {
	'encoding': [ 999 ]
});

// Matrices (along rows)...
mat = matrix( data, [100,10], 'int32' );
mu = nanmean( mat, {
	'dim': 1,
	'encoding': [ 999 ]
});

// Matrices (along columns)...
mu = nanmean( mat, {
	'dim': 2,
	'encoding': [ 999 ]
});

// Matrices (custom output data type)...
mu = nanmean( mat, {
	'dtype': 'uint8',
	'encoding': [ 999 ]
});
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

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

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

---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.


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
