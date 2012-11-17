/*global selectorEngine, library, global, readyPromise */

/**
 * The Library entry point/constructor
 *
 * When provided a function, will execute said function either on DOM ready, window load or if both have already occured, will execute "later".
 *
 * @param {String|Node|Function} selector The selector or function
 * @param {String|Node}          root     The context for the selector
 */
function Library(selector, root) {
	'use strict';

	if (typeof selector === 'function') {
		return readyPromise(selector);
	}

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