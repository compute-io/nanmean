/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	nanmean = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array nanmean', function tests() {

	it( 'should export a function', function test() {
		expect( nanmean ).to.be.a( 'function' );
	});

	it( 'should compute the arithmetic mean ignoring non-numeric / missing values', function test() {
		var data, expected;


		data = [ 2, 4, NaN, 5, 3, NaN, 8, true, [], {}, null, undefined, function(){}, 2, 999, 981 ];
		expected = 4;

		// encoding missing values as 999, 981
		assert.strictEqual( nanmean( data, [ 999, 981 ] ), expected );
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( nanmean( [], [] ) );
	});

});
