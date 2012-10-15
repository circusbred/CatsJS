/*jslint browser: true */
/*global selectorEngine, version, library, global */

function Library(selector, root) {
	'use strict';

	// Self-instantiate if not instantiated
	if (!(this instanceof Library)) {
		return new Library(selector, root);
	}

	var i,
		selection = selectorEngine(selector, root),
		selectionLength = selection.length;

	this.length = selection.length;

	for (i = 0; i < selectionLength; i += 1) {
		this[i] = selection[i];
	}
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