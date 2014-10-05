/**
*
*	COMPUTE: nanmean
*
*
*	DESCRIPTION:
*		- Computes the arithmetic mean over an array of values ignoring any values which are not numeric.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

(function() {
	'use strict';

	// NANMEAN //

	/**
	* FUNCTION: nanmean( arr )
	*	Computes the arithmetic mean over an array of values ignoring any non-numeric values.
	*
	* @param {Array} arr - array of values
	* @returns {Number} mean value
	*/
	function nanmean( arr ) {
		if ( !Array.isArray( arr ) ) {
			throw new TypeError( 'mean()::invalid input argument. Must provide an array.' );
		}
		var len = arr.length,
			N = 0,
			mu = 0,
			diff = 0,
			val;

		for ( var i = 0; i < len; i++ ) {
			val = arr[ i ];
			if ( typeof val !== 'number' || val !== val ) {
				continue;
			}
			N += 1;
			diff = val - mu;
			mu += diff / N;
		}
		return mu;
	} // end FUNCTION nanmean()


	// EXPORTS //

	module.exports = nanmean;

})();