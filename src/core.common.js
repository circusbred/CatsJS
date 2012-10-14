/*jslint browser: true */
/*global Library, library, version, pIndexOf, qwery */
// Selector

/*jslint regexp: true */

var arrayProto = Array.prototype,
	stringProto = String.prototype,
	objProto = Object.prototype,
	proto = Library.prototype,

	ptrim = stringProto.trim,

	slice = arrayProto.slice,
	push = arrayProto.push,
	pindexOf = arrayProto.indexOf,

	hasOwn = objProto.hasOwnProperty,
	toString = objProto.toString,

	// IE doesn't match non-breaking spaces with \s
	rtrim = /\S/.test('\xA0') ? /^[\s\xA0]+|[\s\xA0]+$/g : /^\s+|\s+$/g,
	rspaces = /\s+/,
	ptrim = String.prototype.trim,

	// Attributes
	rleveltwo = /(?:href|src|width|height)/i,

	rnotnumpx = /^-?\d+[^p\s\d]+$/i,
	ropacity = /opacity=([^)]*)/,
	ralpha = /alpha\([^)]*\)/i,

	expando = 'Library' + (version || 'test') + Math.random() * 0x0deadbeef;

proto.version = version;
/*jslint regexp: false */

function addToProto(fn, name, returnFirst) {
	'use strict';

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

function isArray(obj) {
	'use strict';

	return toString.call(obj) === '[object Array]';
}

function isObject(obj) {
	'use strict';

	return toString.call(obj) === '[object Object]';
}

function isString(obj) {
	'use strict';

	return toString.call(obj) === '[object String]';
}


function toArray(list) {
	'use strict';

	var i, length, array = [];

	for (i = 0, length = list.length; i < length; i += 1) {
		array[i] = list[i];
	}
	return array;

}
Library.toArray = toArray;
Library.prototype.toArray = function () {
	'use strict';

	return toArray(this);
};


function each(obj, iterator) {
	'use strict';

	var key, length;
	if (!obj || !iterator) {
		return;
	}
	length = obj.length;

	if (obj.length === +obj.length) {
		for (key = 0; key < length; key += 1) {
			iterator(obj[key], key, obj);
		}
		return obj;
	}

	if (isObject(obj)) {
		for (key in obj) {
			if (obj.hasOwnProperty(key)) {
				iterator(obj[key], key, obj);
			}
		}
		return obj;
	}

	return obj;
}

Library.each = each;
Library.prototype.each = function () {
	'use strict';
	var args = [this];
	push.apply(args, arguments);
	return each.apply(this, args);
};


// Simplified merge & extend (merge expects numerical length, extend expects objects)


function merge(one, two) {
	'use strict';

	var i, length;
	for (i = 0, length = two.length; i < length; i += 1) {
		one[i] = two[i];
	}
	return one;
}


// Checks if an item is within an array
var indexOf = Library.indexOf = (function () {
	'use strict';
	if (pindexOf) {
		return function (array, searchElement, fromIndex) {

			return pindexOf.call(array, searchElement, fromIndex);
		};
	}

	return function (array, searchElement, fromIndex) {

		var i,
			length = array.length;

		for (i = fromIndex ? fromIndex < 0 ? Math.max(0, length + fromIndex) : fromIndex : 0; i < length; i += 1) {
			if (array[i] === searchElement) {
				return i;
			}
		}
		return -1;
	};
}());
Library.prototype.indexOf = function () {
	'use strict';
	var args = [this];
	push.apply(args, arguments);
	return Library.indexOf.apply(this, args);
};

var trim = Library.trim = (function () {
	'use strict';

	if (ptrim) {
		return function (str) {
			return ptrim.call(str);
		};
	}
	return function (str) {
		return str.replace(rtrim, '');
	};
}());

Library.prototype.trim = function () {
	'use strict';
	var args = [this];
	push.apply(args, arguments);
	return Library.trim.apply(this, args);
};
