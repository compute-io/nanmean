'use strict';

var matrix = require( 'dstructs-matrix' ),
	nanmean = require( './../lib' );

var data,
	mat,
	mu,
	i;


// ----
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
console.log( 'Arrays: %d\n', mu );


// ----
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
console.log( 'Accessors: %d\n', mu );


// ----
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
console.log( 'Typed arrays: %d\n', mu );


// ----
// Matrices (along rows)...
mat = matrix( data, [100,10], 'int32' );
mu = nanmean( mat, {
	'dim': 1,
	'encoding': [ 999 ]
});
console.log( 'Matrix (rows): %s\n', mu.toString() );


// ----
// Matrices (along columns)...
mu = nanmean( mat, {
	'dim': 2,
	'encoding': [ 999 ]
});
console.log( 'Matrix (columns): %s\n', mu.toString() );


// ----
// Matrices (custom output data type)...
mu = nanmean( mat, {
	'dtype': 'uint8',
	'encoding': [ 999 ]
});
console.log( 'Matrix (%s): %s\n', mu.dtype, mu.toString() );
