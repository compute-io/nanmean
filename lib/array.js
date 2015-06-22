'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' );

// FUNCTIONS //

var contains = require( './contains.js' );

// NANMEAN //

/**
* FUNCTION: nanmean( arr, encoding )
*	Computes the arithmetic mean of a numeric array ignoring non-numeric / missing values.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @param {Array} encoding - array whose elements encode missing values
* @returns {Number|Null} arithmetic mean or null
*/
function nanmean( arr, encoding ) {
	var len = arr.length,
		N = 0,
		delta,
		mu,
		i,
		x;

	if ( !len ) {
		return null;
	}
	mu = 0;
	for ( i = 0; i < len; i++ ) {
		x = arr[ i ];
		if ( !isNumber( x ) || contains( encoding, x ) ) {
			continue;
		}
		N += 1;
		delta = x - mu;
		mu += delta / N;
	}
	return mu;
} // end FUNCTION nanmean()


// EXPORTS //

module.exports = nanmean;
