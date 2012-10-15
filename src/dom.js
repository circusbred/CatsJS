/*global proto*/


/*
@todo not sure if element needs to be added to the DOM first for this to work?

var lol = document.createElement;
function removeWithNoLeaks(node) {
	lol.appendChild(node);
	lol.innerHTML = '';
}
 */

/**
 * Remove an HTMLElement from the DOM
 *
 * @private
 * @param  {HTMLElement} node The element to be removed
 * @todo To prevent memory leaks in IE, do we need to be removing all bound events too?
 *       - This is only a problem with events added via property or attribute
 *       - also @see http://javascript.crockford.com/memory/leak.html
 */
function remove(node) {
	'use strict';

	var parent = node.parentNode;

	parent.removeChild(node);
}

/**
 * Gets the innerHTML of an HTMLElement
 *
 * @private
 * @param  {HTMLElement} node THe HTMLElement
 * @return {String}           The innerHTML
 */
function getHTML(node) {
	'use strict';

	return node.innerHTML;
}

/**
 * Sets the innerHTML of an HTMLElement
 *
 * @private
 * @param {HTMLElement} node The HTMLElement
 * @param {String}      html The HTML to set
 */
function setHTML(node, html) {
	'use strict';

	node.innerHTML = html;
}

/**
 * Appends a block of HTML to a node
 *
 * @private
 * @param  {HTMLElement} node [description]
 * @param  {String}      html [description]
 */
function append(node, html) {
	'use strict';

	// TODO should move nodes -- to behave closer to native DOM .appendChild
	var nodeHTML = getHTML(node);

	setHTML(node, nodeHTML + html);
}

/**
 * Prepends a block of HTML to a node
 *
 * @private
 * @param  {HTMLElement} node [description]
 * @param  {String}      html [description]
 */
function prepend(node, html) {
	'use strict';

	// TODO should move nodes -- to behave closer to native DOM .appendChild
	var nodeHTML = getHTML(node);

	setHTML(node, html + nodeHTML);
}

/**
 * [html description]
 *
 * @param  {String}         html The optinal HTML to set - if ommitted, will return the node's innerHTML.
 * @return {String|Library}      Either the HTML the node contains or the instance of the node.
 */
proto.html = function (html) {
	'use strict';

	// TODO exceptions, this.length could be 0
	if (html === undefined) {
		return getHTML(this[0]);
	}

	setHTML(this[0], html);

	return this;
};


/**
 * Remove the Element
 */
proto.remove = function () {
	'use strict';
	var i,
		length = this.length;

	for (i = 0; i < length; i += 1) {
		remove(this[i]);
	}
};

/**
 * Appends a block of HTML to the current node
 *
 * @param  {String} html  The HTML to append
 * @return {Library}      The Library instance of the node
 */
// TODO support multiple arguments? useful if you want to $el.append.apply($el, arrayOfNodes)
proto.append = function (html) {
	'use strict';

	var i,
		length = this.length;

	for (i = 0; i < length; i += 1) {
		append(this[i], html);
	}
	return this;
};

/**
 * Prepends a block of HTML to the current node
 *
 * @param  {String} html  The HTML to prepend
 * @return {Library}      The Library instance of the node
 */
// TODO support multiple arguments? useful if you want to $el.prepend.apply($el, arrayOfNodes)
proto.prepend = function (html) {
	'use strict';

	var i,
		length = this.length;

	for (i = 0; i < length; i += 1) {
		prepend(this[i], html);
	}
	return this;
};
