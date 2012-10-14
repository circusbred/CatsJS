/*jslint browser: true */
/*global queryAll, merge, version, library, global */

function Library(selector, root) {
	'use strict';

	// Self-instantiate if not instantiated
	if (!(this instanceof Library)) {
		return new Library(selector, root);
	}

	var selection = queryAll(selector, root);

	this.length = selection.length;
	merge(this, selection);
}

var proto = Library.prototype;
proto.version = version;

/**
 * Responsible infection of the global namespace
 * @return {Object} Returns Library
 */
Library.noConflict = function () {
	'use strict';
	window[library] = global;
	return Library;
};