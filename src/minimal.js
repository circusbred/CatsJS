/**
 * @license minimal.js v0.3pre
 * Copyright (c) 2011 timmy willison
 * Dual licensed under the MIT and GPL licenses.
 * http://timmywillison.com/licence/
 */

(function( window, document ) {
	"use strict";

	var _$ = window.$,
		_minimal = window.minimal,
		_queryAll = window.queryAll,
		_query = window.query,

		// Selector
		rcomma = /\s*,\s*/,
		rid = /^#([\w\-]+)$/,
		rtagclass = /^(?:([\w]+)|([\w]+)?\.([\w\-]+))$/,

		// Classes
		// IE doesn't match non-breaking spaces with \s
		rtrim = /\S/.test( '\xA0' ) ? /^[\s\xA0]+|[\s\xA0]+$/g : /^\s+|\s+$/g,
		rspaces = /\s+/,
		ptrim = String.prototype.trim,

		// Attributes
		rleveltwo = /(?:href|src|width|height)/i,

		// CSS
		rnotnumpx = /^-?\d+[^p\s\d]+$/i,
		ropacity = /opacity=([^)]*)/,
		ralpha = /alpha\([^)]*\)/i,

		// Core
		ArrayProto = Array.prototype,
		forEach = ArrayProto.forEach,
		slice = ArrayProto.slice,
		push = ArrayProto.push,
		pindexOf = ArrayProto.indexOf,
		hasOwn = Object.prototype.hasOwnProperty;

	/**
	 * Main constructor
	 */
	var minimal = function( selector, root ) {

		// Self-instantiate if not instantiated
		if ( !(this instanceof minimal) ) {
			return new minimal( selector, root );
		}

		var selection = queryAll( selector, root );

		this.length = selection.length;
		merge( this, selection );
	};

	var proto = minimal.prototype;
	proto.version = '0.3pre';
	var expando = 'minimal' + proto.version + Math.random() * 9e17;

	var toArray = minimal.toArray = function( list ) {
		var i = 0,
			len = list.length,
			ret = [];
		for ( ; i < len; i++ ) {
			ret[ i ] = list[ i ];
		}
		return ret;
	};

	// An implementaton of each based off underscore.js
	var each = minimal.each = minimal.forEach = function( obj, iterator, context ) {
		var key, len;
		if ( !obj ) {
			return;
		}

		if ( forEach && obj.forEach === forEach ) {
			obj.forEach( iterator, context );

		} else if ( obj.length === +obj.length ) {
			for ( key = 0, len = obj.length; key < len; key++ ) {
				if ( key in obj ) {
					iterator.call( context, obj[ key ], key, obj );
				}
			}

		} else {
			for ( key in obj ) {
				if ( hasOwn.call( obj, key ) ) {
					iterator.call( context, obj[ key ], key, obj );
				}
			}
		}

		return obj;
	};

	// Simplified merge & extend (merge expects numerical length, extend expects objects)
	var merge = minimal.merge = function( one, two ) {
		for ( var i = 0, len = two.length; i < len; i++ ) {
			one[ i ] = two[ i ];
		}
		return one;
	};
	var extend = minimal.extend = function( one, two ) {
		for ( var prop in two ) {
			one[ prop ] = two[ prop ];
		}
		return one;
	};


	/**
	 * A short simple selector engine
	 * Never use descendants (although setting context is allowed) and only use id, tag, tag.class, or .class
		- Since there should only one element with a given ID on a page, this does not support
		   rooted selections for id selectors e.g. queryAll('#child', '#parent'),
		   but it will do queryAll('div', '#parent')
	 * @param {String} selector The selector string in which to match elements against
	 * @param {Element|String|null} root Either the owner document for the selection, an id, or null
	 * @return {Array} Returns the matched elements in array form (not nodelist)
	 */
	var queryAll = function( selector, root ) {
		root = root && (typeof root === 'string' ? queryAll(root)[0] : root.nodeName ? root : root[0]) || document;

		if ( !selector || !root ) {
			return [];
		}

		if ( typeof selector !== 'string' ) {
			if ( selector.style ) {
				// An element that is not the window or document
				return [ selector ];
			}

			if ( selector.documentElement ) {
				// The document
				return [ selector.documentElement ];
			}

			return toArray( selector );
		}

		var match, node, ret, m, i, j;

		// ID
		if ( match = rid.exec(selector) ) {
			return ( node = root.getElementById( match[1] ) ) ? [ node ] : [];

		// Tag, Class, and Tag.Class
		} else if ( match = rtagclass.exec(selector) ) {

			// Tag
			if ( m = match[1] ) {
				return toArray( root.getElementsByTagName(m) );
			}

			m = match[3];

			// Class
			if ( !match[2] && root.getElementsByClassName ) {
				return toArray( root.getElementsByClassName(m) );
			}

			// Tag.Class
			if ( root.querySelectorAll ) {
				return toArray( root.querySelectorAll( selector ) );
			}

			// IE fallback
			match = root.getElementsByTagName( match[2] || '*' );
			ret = [];
			j = 0;
			m = ' ' + m + ' ';
			for ( ; node = match[ j ]; j++ ) {
				if ( ~(' ' + node.className + ' ').indexOf( m ) ) {
					ret.push( node );
				}
			}
			return ret;

		// Multiple selectors
		} else {
			ret = [];
			selector = selector.split( rcomma );

			// No split means selector not supported
			if ( selector.length < 2 ) {
				throw 'Invalid selector: ' + selector;
			}

			for ( i = 0; node = selector[ i ]; i++ ) {
				push.apply( ret, queryAll(node, root) );
			}
			return ret;
		}
	};

	// Retrieves the first of the matched set in a query
	var query = function( selector, root ) {
		return queryAll( selector, root )[0];
	};

	// Checks if an item is within an array
	var indexOf = minimal.indexOf = pindexOf ?
		function( array, searchElement, fromIndex ) {
			return pindexOf.call( array, searchElement, fromIndex );
		} :
		function( array, searchElement, fromIndex ) {
			var len = array.length,
				i = fromIndex ? fromIndex < 0 ? Math.max( 0, len + fromIndex ) : fromIndex : 0;

			for ( ; i < len; ++i ) {
				if ( array[ i ] === searchElement ) {
					return i;
				}
			}
			return -1;
		};

	// Cross-browser trim
	var trim = minimal.trim = ptrim ?
		function( str ) {
			return ptrim.call( str );
		} :
		function( str ) {
			return str.replace( rtrim, '' );
		};

	/**
	 * Window/Document dimensions
	 */
	minimal.getWinDimension = function( name ) {
		name = name.charAt(0).toUpperCase() + name.slice(1); // Capitialize
		var docElemProp = document.documentElement[ "client" + name ];
		return document.compatMode === "CSS1Compat" && docElemProp ||
			document.body[ "client" + name ] || docElemProp;
	};
	minimal.getDocDimension = function( name ) {
		name = name.charAt(0).toUpperCase() + name.slice(1); // Capitialize
		return Math.max(
			document.documentElement[ "client" + name ],
			document.body["scroll" + name], document.documentElement[ "scroll" + name ],
			document.body["offset" + name], document.documentElement[ "offset" + name ]
		);
	};



	// Add internal functions to the prototype
	each('each forEach merge toArray indexOf'.split(' '), function( val ) {
		proto[ val ] = function() {
			var args = [ this ];
			push.apply( args, arguments );
			return minimal[ val ].apply( this, args );
		};
	});


	/**
	 * Traversing
	 */
	extend(proto, {
		slice: function( start, end ) {
			return new minimal( slice.apply( toArray(this), arguments ) );
		},
		first: function() {
			return this.slice( 0, 1 );
		},
		eq: function( index ) {
			return ~(index = +index) ?
				this.slice( index, index + 1 ) :
				this.slice( index );
		},
		find: function( selector ) {
			var node, sel, j, el,
				i = 0, ret = [];
			for ( ; node = this[i]; i++ ) {
				sel = queryAll( selector, rid.test(selector) ? document : node );
				for ( j = 0; el = sel[ j ]; j++ ) {
					if ( !~indexOf(ret, el) ) {
						ret.push( el );
					}
				}
			}
			return new minimal( ret );
		},
		filter: function( fn ) {
			var node,
				ret = [],
				i = 0;
			for ( ; node = this[i]; i++ ) {
				if ( fn.call(node, node, i) ) {
					ret.push( node );
				}
			}
			return new minimal( ret );
		}
	});


	/**
	 * Responsible infection of the global namespace
	 * @param {Boolean} query - Restore window.query & window.queryAll to previous values
	 * @param {Boolean} deep - Restore window.minimal
	 * @return {Object} Returns minimal
	 */
	minimal.noConflict = function( query, deep ) {
		window.$ = _$;
		if ( query ) {
			window.queryAll = _queryAll;
			window.query = _query;
		}
		if ( deep ) {
			window.minimal = _minimal;
		}
		return minimal;
	};

	// Expose minimal
	window.$ = window.minimal = minimal;

	// Expose query
	window.queryAll = queryAll;
	window.query = query;

})( this, this.document );
