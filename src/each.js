var toString = Object.prototype.toString;

function isArray(obj) {
	return toString.call(obj) === '[object Array]';
}

function isObject(obj) {
	return toString.call(obj) === '[object Object]';
}

function isString(obj) {
	return toString.call(obj) === '[object String]';
}

function each(obj, iterator) {
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