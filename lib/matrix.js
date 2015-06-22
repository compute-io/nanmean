'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' );

// FUNCTIONS //

var contains = require( './contains.js' );

// NANMEAN

/**
* FUNCTION: nanmean( out, mat, encoding[, dim] )
*	Computes the arithmetic mean along a matrix dimension ignoring non-numeric / missing values.
*
* @param {Matrix} out - output matrix
* @param {Matrix} mat - input matrix
* @param {Array} encoding - array whose elements encode missing values
* @param {Number} [dim=2] - matrix dimension along which to compute an arithmetic mean. If `dim=1`, compute along matrix rows. If `dim=2`, compute along matrix columns.
* @returns {Matrix|Null} arithmetic means or null
*/
function nanmean( out, mat, encoding, dim ) {
	var delta,
		mu,
		M, N, Nobs,
		s0, s1,
		o,
		i, j, k,
		x;

	if ( dim === 1 ) {
		// Compute along the rows...
		M = mat.shape[ 1 ];
		N = mat.shape[ 0 ];
		s0 = mat.strides[ 1 ];
		s1 = mat.strides[ 0 ];
	} else {
		// Compute along the columns...
		M = mat.shape[ 0 ];
		N = mat.shape[ 1 ];
		s0 = mat.strides[ 0 ];
		s1 = mat.strides[ 1 ];
	}
	if ( M === 0 || N === 0 ) {
		return null;
	}
	o = mat.offset;
	for ( i = 0; i < M; i++ ) {
		k = o + i*s0;
		mu = 0;
		Nobs = 0;
		for ( j = 0; j < N; j++ ) {
			x = mat.data[ k + j*s1 ];
			if ( !isNumber( x ) || contains( encoding, x ) ) {
				continue;
			}
			Nobs += 1;
			delta = x - mu;
			mu += delta / Nobs;
		}
		out.data[ i ] = mu;
	}
	return out;
} // end FUNCTION nanmean()


// EXPORTS //

module.exports = nanmean;
