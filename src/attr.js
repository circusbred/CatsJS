/*global support, proto, rleveltwo */
/*global isString, isObject, hasOwn, push */
/*jslint browser: true, sloppy: true */

var getAttribute, setAttribute, removeAttribute;
if (support.getSetAttribute) {
	getAttribute = function (node, name) {
		var nodeType;

		// Does not normalize to undefined or null
		// Both values are useful
		return node.getAttribute(name);
	};
	removeAttribute = function (node, name, value) {
		node.removeAttribute(name);
	};

	setAttribute = function (node, name, value) {
		var nodeType;

		value = value.toString ? value.toString() : value;
		node.setAttribute(name, value);

	};
} else {
	// IE6/7
	getAttribute = function (node, name) {
		var nodeType, ret;

		if (rleveltwo.test(name)) {
			return node.getAttribute(name, 2);
		}

		ret = node.getAttributeNode(name);
		return ret && (ret = ret.nodeValue) !== '' ? ret : null;
	};

	removeAttribute = function (node, name) {
		node.setAttribute(name, '');
		node.removeAttributeNode(node.getAttributeNode(name));
	};

	setAttribute = function (node, name, value) {
		var nodeType, attrNode;

		attrNode = node.getAttributeNode(name);
		if (!attrNode) {
			attrNode = document.createAttribute(name);
			node.setAttributeNode(attrNode);
		}
		attrNode.nodeValue = value.toString ? value.toString() : value;

	};
}

function attr(node, name, value) {
	var i, key, nodeType;

	if (isString(name) && value === undefined) {
		return getAttribute(node, name);
	}

	if (isObject(name)) {
		// hasOwn = Object.prototype.hasOwnProperty, silly JSLint
		/*jslint forin: true */
		for (key in name) {
			if (hasOwn.call(name, value)) {
				setAttribute(node, key, name[key]);
			}
		}
		/*jslint forin: false */
		return;
	}

	if (isString(name) && value) {
		value = value.toString ? value.toString() : value;
		return setAttribute(node, name, value);
	}
}

proto.attr = function (name, value) {
	var node, args, i, length, nodeType, ret;

	for (i = 0, length = this.length; i < length; i += 1) {
		node = this[i];

		if (!(!node || (nodeType = node.nodeType) === 3 || nodeType === 8 || nodeType === 2)) {

			args = [node];
			push.apply(args, arguments);
			ret = attr.apply(node, args);

			if (value === undefined) {
				return ret;
			}
		}
	}
	return this;
};
