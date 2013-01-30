/*jslint browser:true*/
/*jshint undef:true*/

// boolean for keeping track if we've already fired the `ready` functino
var READY_FIRED = false;

// list of promised functions
var promised = [];

// jshint is fucking stupid.  until https://github.com/jshint/jshint/pull/726 is merged, we have to do this...
// @circusbred: still think JSHint > JSLint?
var readyPromise = null;

/**
 * Execute all functions which have been promised execution
 */
function ready() {
	'use strict';

	var index,
		length = promised.length;

	READY_FIRED = true;

	for (index = 0; index < length; index += 1) {
		promised[index]();
	}
}

/**
 * Add a function to the list of promises
 *
 * @param  {Function} fn The function
 */
readyPromise = function (fn) {
	'use strict';

	// if DOM is already ready
	if (document.readyState === 'complete') {
		// execute the `ready` method "later"
		window.setTimeout(fn, 0);
		return;
	}

	// add to the list of promises
	promised.push(fn);
};

/**
 * Callback for
 * @return {[type]} [description]
 */
function contentLoaded() {
	'use strict';

	// was the "ready" function already fired?
	if (READY_FIRED === true) {
		return;
	}

	// standard
	if (document.addEventListener) {

		// remove the unncessary event listeners
		document.removeEventListener('DOMContentLoaded', contentLoaded);
		window.removeEventListener('load', contentLoaded);

		// if we haven't already fired the functions, do so
		if (!READY_FIRED) {
			ready();
		}

	// IE
	} else if (document.readyState === 'complete') {

		// remove unncessary event listeners
		document.detachEvent('onreadystatechange', contentLoaded);
		window.detachEvent('onload', contentLoaded);

		// call ready if necessary
		if (!READY_FIRED) {
			ready();
		}

	}

}

// is DOM already ready?
if (document.readyState === 'complete') {

	// execute this later
	window.setTimeout(ready, 0);

// standard browsers
} else if (document.addEventListener) {

	document.addEventListener('DOMContentLoaded', contentLoaded, false);
	window.addEventListener('load', contentLoaded, false);

// IE
} else {

	document.attachEvent('onreadystatechange', contentLoaded);
	window.attachEvent('onload', contentLoaded);

}

