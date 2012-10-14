/*jslint browser: true */
/*global toArray, rid, rtagclass, rcomma, push */
/**
 * A short simple selector engine
 * Never use descendants (although setting context is allowed) and only use id, tag, tag.class, or .class
	- Since there should only one element with a given ID on a page, this does not support
	   rooted selections for id selectors e.g. queryAll('#child', '#parent'),
	   but it will do queryAll('div', '#parent')
 * @param {String} selector The selector string in which to match elements against
 * @param {Element|String|null} root Either the owner document for the selection, an id, or null
 * @return {Array} Returns the matched elements in array form (not nodelist)
 */
function queryAll(selector, root) {
	'use strict';

	root = (root && (typeof root === 'string' ? queryAll(root)[0] : root.nodeName ? root : root[0])) || document;

	if (!selector || !root) {
		return [];
	}

	if (typeof selector !== 'string') {
		if (selector.style) {
			// An element that is not the window or document
			return [selector];
		}

		if (selector.documentElement) {
			// The document
			return [selector.documentElement];
		}

		return toArray(selector);
	}

	var match, node, ret, m, i, l;

	// ID
	match = rid.exec(selector);
	if (match) {
		node = root.getElementById(match[1]);
		return node ? [node] : [];

	}
	// Tag, Class, and Tag.Class
	match = rtagclass.exec(selector);
	if (match) {

		// Tag
		m = match[1];
		if (m) {
			return toArray(root.getElementsByTagName(m));
		}

		m = match[3];

		// Class
		if (!match[2] && root.getElementsByClassName) {
			return toArray(root.getElementsByClassName(m));
		}

		// Tag.Class
		if (root.querySelectorAll) {
			return toArray(root.querySelectorAll(selector));
		}

		// IE fallback
		match = root.getElementsByTagName(match[2] || '*');
		ret = [];
		m = ' ' + m + ' ';
		for (i = 0, l = match.length; i < l; i += 1) {
			node = match[i];
			if ((' ' + node.className + ' ').indexOf(m) !== -1) {
				ret.push(node);
			}
		}
		return ret;

		// Multiple selectors
	}

	ret = [];
	selector = selector.split(rcomma);

	// No split means selector not supported
	if (selector.length < 2) {
		throw 'Invalid selector: ' + selector;
	}

	for (i = 0, l = selector.length; i < l; i += 1) {
		push.apply(ret, queryAll(selector[i], root));
	}
	return ret;
}