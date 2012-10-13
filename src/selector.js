

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