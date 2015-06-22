/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	nanmean = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-nanmean', function tests() {

	it( 'should export a function', function test() {
		expect( nanmean ).to.be.a( 'function' );
	});

	it( 'should throw an error if the first argument is neither array-like or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				nanmean( value );
			};
		}
	});

	it( 'should throw an error if provided a dimension which is greater than 2 when provided a matrix', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				nanmean( matrix( [2,2] ), {
					'dim': value
				});
			};
		}
	});

	it( 'should throw an error if provided an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				nanmean( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should compute the arithmetic mean ignoring non-numeric values', function test() {
		var data, expected;

		data = [ 2, 4, NaN, 5, 3, NaN, 8, true, [], {}, null, undefined, function(){}, 2 ];

		expected = 4;

		assert.strictEqual( nanmean( data ), expected );
	});

	it( 'should compute the arithmetic mean of a typed array ignoring missing values', function test() {
		var data, expected, actual;

		data = new Int32Array( [ 2, 4, 5, 3, 8, 2, 981, 999 ] );

		expected = 4;

		actual = nanmean( data, {
			'encoding': [981, 999]
		});

		assert.strictEqual( actual, expected );
	});

	it( 'should compute the arithmetic mean using an accessor function', function test() {
		var data, expected, actual;

		data = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2}
		];

		expected = 4;

		actual = nanmean( data, {
			'accessor': getValue
		});

		assert.strictEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should compute the arithmetic mean using an accessor ignoring non-numeric / missing values', function test() {
		var data, expected, actual;

		data = [
			{'x':2},
			{'x':4},
			{'x':NaN},
			{'x':5},
			{'x':3},
			{'x':NaN},
			{'x':8},
			{'x':true},
			{'x':[]},
			{'x':{}},
			{'x':null},
			{'x':undefined},
			{'x':function(){}},
			{'x':2},
			{'x':999},
			{'x':981}
		];
		expected = 4;

		actual = nanmean( data, {
			'accessor': getValue,
			'encoding': [ 981, 999 ]
		});

		assert.strictEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should compute the arithmetic mean along a matrix dimension', function test() {
		var expected,
			data,
			mat,
			mu,
			i;

		data = new Int8Array( 25 );
		for ( i = 0; i < data.length; i++ ) {
			data[ i ] = i;
		}
		mat = matrix( data, [5,5], 'int8' );

		// Default:
		mu = nanmean( mat );
		expected = '2;7;12;17;22';

		assert.strictEqual( mu.toString(), expected, 'default' );

		// Along columns:
		mu = nanmean( mat, {
			'dim': 2
		});
		expected = '2;7;12;17;22';

		assert.strictEqual( mu.toString(), expected, 'dim: 2' );

		// Along rows:
		mu = nanmean( mat, {
			'dim': 1
		});
		expected = '10,11,12,13,14';

		assert.strictEqual( mu.toString(), expected, 'dim: 1' );
	});

	it( 'should compute the arithmetic mean of 1d matrices (vectors)', function test() {
		var data, mat, expected;

		data = [ 2, 4, 5, 3, 8, 2 ];

		expected = 4;

		// Row vector:
		mat = matrix( data, [1,6], 'int8' );
		assert.strictEqual( nanmean( mat ), expected );

		// Column vector:
		mat = matrix( data, [6,1], 'int8' );
		assert.strictEqual( nanmean( mat ), expected );
	});

	it( 'should compute the arithmetic mean of matrices containing non-numeric values', function test() {

		var data, mat, mu, expected;

		data = new Float64Array( [1,2,3,4,5,6,7,8,NaN] );
		mat = matrix( data, [3,3]);

		mu = nanmean( mat, {
			'dtype': 'int8'
		});
		expected = '2;5;7';

		assert.strictEqual( mu.toString(), expected );
	});

});
