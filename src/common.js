/*global Library, library, version, pIndexOf, qwery */
// Selector

// WTB exports directive
/*jshint unused: false */

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

// Checks if an item is within an array
var indexOf = Library.indexOf = function (array, searchElement, fromIndex) {
	'use strict';
	return pindexOf.call(array, searchElement, fromIndex);
};

Library.prototype.indexOf = function () {
	'use strict';
	var args = [this];
	push.apply(args, arguments);
	return indexOf.apply(this, args);
};

var trim = Library.trim = function (str) {
	'use strict';
	return ptrim.call(str);
};

Library.prototype.trim = function () {
	'use strict';
	var args = [this];
	push.apply(args, arguments);
	return trim.apply(this, args);
};
