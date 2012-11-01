/*global support, rleveltwo, addToProto */
/*global getAttribute: true, setAttribute: true, removeAttribute: true */
/*jslint browser: true */

// IE6/7
if (!support.getSetAttribute) {

	getAttribute = function (node, name) {
		'use strict';

		var ret;

		if (rleveltwo.test(name)) {
			return node.getAttribute(name, 2);
		}

		ret = node.getAttributeNode(name);
		return ret && (ret = ret.nodeValue) !== '' ? ret : null;
	};

	removeAttribute = function (node, name) {
		'use strict';

		node.setAttribute(name, '');
		node.removeAttributeNode(node.getAttributeNode(name));
	};

	setAttribute = function (node, name, value) {
		'use strict';

		var attrNode;

		attrNode = node.getAttributeNode(name);
		if (!attrNode) {
			attrNode = document.createAttribute(name);
			node.setAttributeNode(attrNode);
		}
		attrNode.nodeValue = value && value.toString ? value.toString() : value;

	};

	addToProto(removeAttribute, 'removeAttr');
}