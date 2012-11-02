/*global proto, isString, isObject, hasOwn, push */

var cssProps = {
		'float': 'cssFloat'
	},
	getCSS = function (node, name) {
		'use strict';
		name = cssProps[name] || name;

		// TODO is this really what we want?
		return window.getComputedStyle(node, null)[name] || node.style[name];

	},
	setCSS = function (node, name, value) {
		'use strict';
		name = cssProps[name] || name;

		node.style[name] = value;
	};

function css(node, name, value) {
	'use strict';

	var key, display;

	if (isString(name) && value === undefined) {
		return getCSS(node, name);
	}

	if (isObject(name)) {
		// hasOwn = Object.prototype.hasOwnProperty, silly JSLint
		display = node.style.display || '';
		node.style.display = 'none';
		/*jslint forin: true */
		for (key in name) {
			if (hasOwn.call(name, key)) {
				setCSS(node, key, name[key]);
				if (key === 'display') {
					display = name[key];
				}
			}
		}
		node.style.display = display;
		/*jslint forin: false */
		return;
	}

	if (isString(name) && value !== undefined) {
		value = value && value.toString ? value.toString() : value;
		return setCSS(node, name, value);
	}
}

proto.css = function (name, value) {
	'use strict';

	var node, args, i, length, nodeType, ret;

	for (i = 0, length = this.length; i < length; i += 1) {
		node = this[i];

		if (!(!node || (nodeType = node.nodeType) === 3 || nodeType === 8 || nodeType === 2)) {

			args = [node];
			push.apply(args, arguments);
			ret = css.apply(node, args);

			if (value === undefined && !isObject(name)) {
				return ret;
			}
		}
	}
	return this;
};