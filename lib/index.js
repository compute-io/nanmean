'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ).raw,
	validate = require( './validate.js' );


// FUNCTIONS //

var nanmean1 = require( './array.js' ),
	nanmean2 = require( './accessor.js' ),
	nanmean3 = require( './matrix.js' );


// NANMEAN //

/**
* FUNCTION: nanmean( x[, opts] )
*	Computes the arithmetic mean ignoring non-numeric / missing values.
*
* @param {Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {Object} [opts] - function options
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {Number} [opts.dim=2] - dimension along which to compute the arithmetic mean.
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Matrix|Null} arithmetic mean value(s) or null
*/
function nanmean( x, options ) {
	/* jshint newcap:false */
	var opts = {},
		shape,
		ctor,
		err,
		len,
		dim,
		dt,
		d,
		m,
		encoding;

	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}

	encoding = opts.encoding || [];

	if ( isMatrixLike( x ) ) {
		dt = opts.dtype || 'float64';
		dim = opts.dim;

		// Determine if provided a vector...
		if ( x.shape[ 0 ] === 1 || x.shape[ 1 ] === 1 ) {
			// Treat as an array-like object:
			return nanmean1( x.data, encoding );
		}
		if ( dim > 2 ) {
			throw new RangeError( 'nanmean()::invalid option. Dimension option exceeds number of matrix dimensions. Option: `' + dim + '`.' );
		}
		if ( dim === void 0 || dim === 2 ) {
			len = x.shape[ 0 ];
			shape = [ len, 1 ];
		} else {
			len = x.shape[ 1 ];
			shape = [ 1, len ];
		}
		ctor = ctors( dt );
		if ( ctor === null ) {
			throw new Error( 'nanmean()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
		}
		// Create an output matrix and calculate the arithmetic means:
		d = new ctor( len );
		m = matrix( d, shape, dt );
		return nanmean3( m, x, encoding, dim );
	}
	if ( isArrayLike( x ) ) {
		if ( opts.accessor ) {
			return nanmean2( x, encoding, opts.accessor );
		}
		return nanmean1( x, encoding );
	}
	throw new TypeError( 'nanmean()::invalid input argument. First argument must be either an array or a matrix. Value: `' + x + '`.' );
} // end FUNCTION nanmean()


// EXPORTS //

module.exports = nanmean;
