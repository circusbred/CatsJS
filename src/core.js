/*jslint browser: true */
/*global selectorEngine, merge, version, library, global */

function Library(selector, root) {
	'use strict';

	// Self-instantiate if not instantiated
	if (!(this instanceof Library)) {
		return new Library(selector, root);
	}

	var selection = selectorEngine(selector, root);

	this.length = selection.length;
	merge(this, selection);
}

/**
 * Responsible infection of the global namespace
 * @return {Object} Returns Library
 */
Library.noConflict = function () {
	'use strict';
	window[library] = global;
	return Library;
};