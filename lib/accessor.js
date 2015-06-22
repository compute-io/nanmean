'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' );

// FUNCTIONS //

var contains = require( './contains.js' );

// NANMEAN

/**
* FUNCTION: nanmean( arr, encoding, clbk )
*	Computes the arithmetic mean of an array using an accessor function ignoring non-numeric / missing values.
*
* @param {Array} arr - input array
* @param {Array} encoding - array whose elements encode missing values
* @param {Function} clbk - accessor function for accessing array values
* @returns {Number|Null} arithmetic mean or null
*/
function nanmean( arr, encoding, clbk ) {
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
		x =  clbk( arr[ i ], i );
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
