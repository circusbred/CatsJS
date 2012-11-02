/*global proto, rspaces, trim, addToProto */

/**
 * @todo lots of documentation
 */

/**
 * Classes
 * Some class manipulation is based off of Google's code for the html5 presentation (http://code.google.com/p/html5slides/)
 */


/**
 * [safeClassName description]
 *
 * @requires trim
 * @param  {String} className [description]
 * @return {String}           [description]
 */
function safeClassName(className) {
	'use strict';

	return ' ' + trim(className) + ' ';
}


function hasClass(node, classStr) {
	'use strict';

	if (node && classStr) {
		return safeClassName(node.className).indexOf(safeClassName(trim(classStr))) !== -1;
	}
	return false;
}

// @todo don't ever duplicate classes -- not just per run
function addClass(node, classStr) {
	'use strict';

	classStr = classStr.split(rspaces);
	var c, i,
		cls = safeClassName(node.className),
		len = classStr.length;

	for (i = 0; i < len; i += 1) {
		c = classStr[i];
		if (c && cls.indexOf(safeClassName(c)) < 0) {
			cls += c + ' ';
		}
	}
	node.className = trim(cls);
}

function removeClass(node, classStr) {
	'use strict';

	var cls, len, i;

	if (classStr !== undefined) {
		classStr = classStr.split(rspaces);
		cls = safeClassName(node.className);

		for (i = 0, len = classStr.length; i < len; i += 1) {
			cls = cls.replace(safeClassName(classStr[i]), ' ');
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
	'use strict';

	if (hasClass(node, classStr)) {
		removeClass(node, classStr);
	} else {
		addClass(node, classStr);
	}
}

function replaceClass(node, oldClass, newClass) {
	'use strict';

	if (hasClass(node, oldClass)) {
		removeClass(node, oldClass);
		addClass(node, newClass);
	} else {
		addClass(node, newClass);
	}
}
// If any of the elements have the class, return true
// @todo utilize `all` flag to only return true if all elements have the class
proto.hasClass = function (classStr) {
	'use strict';

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
