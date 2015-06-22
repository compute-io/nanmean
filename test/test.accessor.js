/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	nanmean = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor nanmean', function tests() {

	it( 'should export a function', function test() {
		expect( nanmean ).to.be.a( 'function' );
	});

	it( 'should compute the arithmetic mean using an accessor ignoring non-numeric / missing values', function test() {
		var data, expected;

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

		assert.strictEqual( nanmean( data, [ 999, 981 ], getValue ), expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( nanmean( [], [], getValue ) );

		function getValue( d ) {
			return d.x;
		}
	});

});
