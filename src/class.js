/*global support, proto, rspaces */
/*global isString, isObject, hasOwn, push, trim */
/*jslint browser: true, sloppy: true */

/**
 * Classes
 * Some class manipulation is based off of Google's code for the html5 presentation (http://code.google.com/p/html5slides/)
 */

function addClass(node, classStr) {
	classStr = classStr.split(rspaces);
	var c, cls = ' ' + node.className + ' ',
		i = 0,
		len = classStr.length;
	for (i; i < len; ++i) {
		c = classStr[i];
		if (c && cls.indexOf(' ' + c + ' ') < 0) {
			cls += c + ' ';
		}
	}
	node.className = trim(cls);
}

function removeClass(node, classStr) {
	var cls, len, i;

	if (classStr !== undefined) {
		classStr = classStr.split(rspaces);
		cls = ' ' + node.className + ' ';
		i = 0;
		len = classStr.length;
		for (i; i < len; ++i) {
			cls = cls.replace(' ' + classStr[i] + ' ', ' ');
		}
		cls = trim(cls);
	} else {
		cls = '';
	}
	if (node.className !== cls) {
		node.className = cls;
	}
}

function toggleClass(node, classStr) {
	var cls = ' ' + node.className + ' ';
	if (cls.indexOf(' ' + trim(classStr) + ' ') !== -1) {
		removeClass(node, classStr);
	} else {
		addClass(node, classStr);
	}
}

function hasClass(node, classStr) {
	return node && classStr && !! ~ (' ' + node.className + ' ').indexOf(' ' + classStr + ' ');
}

// If any of the elements have the class, return true
proto.hasClass = function (classStr) {
	var node, length, i;
	for (i = 0, length = this.length; i < length; i++) {
		if (hasClass(this[i], classStr)) {
			return true;
		}
	}
	return false;
};

proto.addClass = function () {
	var node, args, i, length;
	for (i = 0, length = this.length; i < length; i += 1) {
		node = this[i];
		args = [node];
		push.apply(args, arguments);
		addClass.apply(node, args);
	}
	return this;
};

proto.removeClass = function () {
	var node, args, i, length;
	for (i = 0, length = this.length; i < length; i += 1) {
		node = this[i];
		args = [node];
		push.apply(args, arguments);
		removeClass.apply(node, args);
	}
	return this;
};

proto.toggleClass = function () {
	var node, args, i, length;
	for (i = 0, length = this.length; i < length; i += 1) {
		node = this[i];
		args = [node];
		push.apply(args, arguments);
		toggleClass.apply(node, args);
	}
	return this;
};