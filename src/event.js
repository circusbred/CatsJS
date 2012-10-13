
/**
 * Events
 */
var on, off, preventDefault, stopPropagation;
if ( document.addEventListener ) {
	on = function( node, type, fn ) {
		if ( node.addEventListener ) {
			node.addEventListener( type, fn, false );
		}
	};
	off = function( node, type, fn ) {
		if ( node.removeEventListener ) {
			node.removeEventListener( type, fn, false );
		}
	};

// IE
} else {
	preventDefault = function() { this.returnValue = false; };
	stopPropagation = function() { this.cancelBubble = true; };
	on = function( node, type, fn ) {
		var f;
		if ( node.attachEvent ) {
			f = fn[ expando ] || (fn[ expando ] = function( e ) {
				if ( typeof e.preventDefault !== 'function' ) {
					e.preventDefault = preventDefault;
					e.stopPropagation = stopPropagation;
				}
				fn.call( node, e );
			});
			node.attachEvent( 'on' + type, f );
		}
	};
	off = function( node, type, fn ) {
		if ( node.detachEvent ) {
			node.detachEvent( 'on' + type, fn[ expando ] || fn );
		}
	};
}
minimal.on = on;
minimal.off = off;

var fire;
if ( document.createEvent ) {
	fire = function( node, type ) {
		var event = document.createEvent('HTMLEvents');
		event.initEvent( type, true, true );
		node.dispatchEvent( event );
	};
} else {
	fire = function( node, type ) {
		var event = document.createEventObject();
		node.fireEvent( 'on' + type, event );
	};
}
minimal.fire = fire;

each('on off fire'.split(' '), function( val ) {
	proto[ val ] = function() {
		var node, args, i = 0;
		for ( ; node = this[i]; i++ ) {
			args = [ node ];
			push.apply( args, arguments );
			minimal[ val ].apply( node, args );
		}
		return this;
	};
});