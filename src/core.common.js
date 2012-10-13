
/*jslint browser: true */
/*global push, toString, isArray, isObject */

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


function each(obj, iterator) {
	'use strict';

	var key, length;
	if (!obj) {
		return;
	}
	length = obj.length;

	if (isArray(obj) || isString(obj)) {
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
var indexOf = pindexOf ? function (array, searchElement, fromIndex) {
	'use strict';

	return pindexOf.call(array, searchElement, fromIndex);
} : function (array, searchElement, fromIndex) {
	'use strict';

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
var trim = ptrim ? function (str) {
	'use strict';

	return ptrim.call(str);
} : function (str) {
	'use strict';

	return str.replace(rtrim, '');
};



addToProto(each, 'each');
