/*global support, proto, rspaces */
/*global isString, isObject, hasOwn, push, trim, addToProto */
/*jslint browser: true, sloppy: true */

/**
 * Classes
 * Some class manipulation is based off of Google's code for the html5 presentation (http://code.google.com/p/html5slides/)
 */

function hasClass(node, classStr) {
	if (node && classStr) {
		return (' ' + node.className + ' ').indexOf(' ' + trim(classStr) + ' ') !== -1;
	}
	return false;
}

function addClass(node, classStr) {
	classStr = classStr.split(rspaces);
	var c, i,
		cls = ' ' + trim(node.className) + ' ',
		len = classStr.length;

	for (i = 0; i < len; i += 1) {
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

		for (i = 0, len = classStr.length; i < len; i += 1) {
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
	if (hasClass(node, classStr)) {
		removeClass(node, classStr);
	} else {
		addClass(node, classStr);
	}
}

function replaceClass(node, oldClass, newClass) {
	if (hasClass(node, oldClass)) {
		removeClass(node, oldClass);
		addClass(node, newClass);
	} else {
		addClass(node, newClass);
	}
}
// If any of the elements have the class, return true
proto.hasClass = function (classStr) {
	var length, i;
	for (i = 0, length = this.length; i < length; i += 1) {
		if (hasClass(this[i], classStr)) {
			return true;
		}
	}
	return false;
};

addToProto(addClass, 'addClass');
addToProto(removeClass, 'removeClass');
addToProto(toggleClass, 'toggleClass');
addToProto(replaceClass, 'replaceClass');