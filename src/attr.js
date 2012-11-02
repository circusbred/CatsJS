/*global proto, isString, isObject, hasOwn, push, addToProto */

// real browsers
var getAttribute = function (node, name) {
		'use strict';

		return node.getAttribute(name);
	},
	removeAttribute = function (node, name) {
		'use strict';

		node.removeAttribute(name);
	},
	setAttribute = function (node, name, value) {
		'use strict';

		value = value && value.toString ? value.toString() : value;
		node.setAttribute(name, value);
	};

function attr(node, name, value) {
	'use strict';

	var key;

	if (isString(name) && value === undefined) {
		return getAttribute(node, name);
	}

	if (isObject(name)) {
		// hasOwn = Object.prototype.hasOwnProperty, silly JSLint
		/*jslint forin: true */
		for (key in name) {
			if (hasOwn.call(name, key)) {
				setAttribute(node, key, name[key]);
			}
		}
		/*jslint forin: false */
		return;
	}

	if (isString(name) && value !== undefined) {
		return setAttribute(node, name, value);
	}
}

proto.attr = function (name, value) {
	'use strict';

	var node, args, i, length, nodeType,
		ret = null;

	if (name === undefined || this.length === 0) {
		return ret;
	}

	for (i = 0, length = this.length; i < length; i += 1) {
		node = this[i];

		if (!(!node || (nodeType = node.nodeType) === 3 || nodeType === 8 || nodeType === 2)) {

			args = [node];
			push.apply(args, arguments);
			ret = attr.apply(node, args);
		}

		if (value === undefined && !isObject(name)) {
			return ret;
		}
	}
	return this;
};

addToProto(removeAttribute, 'removeAttr');
