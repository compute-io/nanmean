
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	nanmean = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-nanmean', function tests() {
	'use strict';

	it( 'should export a function', function test() {
		expect( nanmean ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
				'5',
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

	it( 'should compute the arithmetic mean ignoring non-numeric values', function test() {
		var data, expected;

		data = [ 2, 4, NaN, 5, 3, NaN, 8, true, [], {}, null, undefined, function(){}, 2 ];
		expected = 4;

		assert.strictEqual( nanmean( data ), expected );
	});

});