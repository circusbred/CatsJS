/*global proto, trim, rspaces, isArray */

function hasClass(node, classes) {
	'use strict';

	var i,
		length = classes.length,
		ret = 0;

	for (i = 0; i < length; i += 1) {
		if (node.classList.contains(classes[i])) {
			ret += 1;
		}
	}

	return length === ret;
}

function addClass(node, classes) {
	'use strict';
	var i, length = classes.length;
	for (i = 0; i < length; i += 1) {
		node.classList.add(classes[i]);
	}
}

function removeClass(node, classes) {
	'use strict';

	var i, length = classes.length;
	for (i = 0; i < length; i += 1) {
		node.classList.remove(classes[i]);
	}
}

// If any of the elements have the class, return true
// @todo utilize `all` flag to only return true if all elements have the class
proto.hasClass = function (classes) {
	'use strict';

	if (!isArray(classes)) {
		classes = trim(classes);
		classes = classes.split(rspaces);
	}

	var length, i;
	for (i = 0, length = this.length; i < length; i += 1) {
		if (hasClass(this[i], classes)) {
			return true;
		}
	}
	return false;
};

proto.addClass = function (classes) {
	var i, length;
	if (!isArray(classes)) {
		classes = trim(classes);
		classes = classes.split(rspaces);
	}

	for (i = 0, length = this.length; i < length; i += 1) {
		addClass(this[i], classes);
	}
	return this;
};

proto.removeClass = function (classes) {
	var node, i, length;
	if (classes !== undefined) {
		if (!isArray(classes)) {
			classes = trim(classes);
			classes = classes.split(rspaces);
		}

		for (i = 0, length = this.length; i < length; i += 1) {
			node = this[i];
			removeClass(node, classes);
		}
	} else {

		for (i = 0, length = this.length; i < length; i += 1) {
			this[i].className = '';
		}

	}
	return this;
};
