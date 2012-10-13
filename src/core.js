var _minimal = window.minimal,

	// Selector
	rcomma = /\s*,\s*/,
	rid = /^#([\w\-]+)$/,
	rtagclass = /^(?:([\w]+)|([\w]+)?\.([\w\-]+))$/,

	// Classes
	// IE doesn't match non-breaking spaces with \s
	rtrim = /\S/.test('\xA0') ? /^[\s\xA0]+|[\s\xA0]+$/g : /^\s+|\s+$/g,
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

function minimal(selector, root) {

	// Self-instantiate if not instantiated
	if (!(this instanceof minimal)) {
		return new minimal(selector, root);
	}

	var selection = queryAll(selector, root);

	this.length = selection.length;
	merge(this, selection);
};


function addToProto(fn, name, returnFirst) {
	proto[name] = function () {
		var node, args, i, length, ret;
		for (i = 0, length = this.length; i < length; i += 1) {
			node = this[i];
			args = [node];
			push.apply(args, arguments);
			ret = fn.apply(node, args);
			if (returnFirst) {
				return ret;
			}
		}
		return this;

	};
}

var proto = minimal.prototype;
proto.version = '0.3pre';
var expando = 'minimal' + proto.version + Math.random() * 9e17;

var toArray = minimal.toArray = function (list) {
		var i = 0,
			len = list.length,
			ret = [];
		for (; i < len; i++) {
			ret[i] = list[i];
		}
		return ret;
	};


// Simplified merge & extend (merge expects numerical length, extend expects objects)
var merge = minimal.merge = function (one, two) {
		for (var i = 0, len = two.length; i < len; i++) {
			one[i] = two[i];
		}
		return one;
	};
var extend = minimal.extend = function (one, two) {
		for (var prop in two) {
			one[prop] = two[prop];
		}
		return one;
	};


// Checks if an item is within an array
var indexOf = minimal.indexOf = pindexOf ?
function (array, searchElement, fromIndex) {
	return pindexOf.call(array, searchElement, fromIndex);
} : function (array, searchElement, fromIndex) {
	var len = array.length,
		i = fromIndex ? fromIndex < 0 ? Math.max(0, len + fromIndex) : fromIndex : 0;

	for (; i < len; ++i) {
		if (array[i] === searchElement) {
			return i;
		}
	}
	return -1;
};

// Cross-browser trim
var trim = minimal.trim = ptrim ?
function (str) {
	return ptrim.call(str);
} : function (str) {
	return str.replace(rtrim, '');
};



// Add internal functions to the prototype
each('merge toArray indexOf'.split(' '), function (val) {
	proto[val] = function () {
		var args = [this];
		push.apply(args, arguments);
		return minimal[val].apply(this, args);
	};
});


/**
 * Responsible infection of the global namespace
 * @return {Object} Returns minimal
 */
minimal.noConflict = function () {
	window.minimal = _minimal;
	return minimal;
};