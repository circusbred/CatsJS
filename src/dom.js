/*global proto*/

/**
 * Remove an HTMLElement from the DOM
 *
 * @private
 * @param  {HTMLElement} node The element to be removed
 * @todo To prevent memory leaks in IE, do we need to be removing all bound events too?
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

	remove(this[0]);
};

/**
 * Appends a block of HTML to the current node
 *
 * @param  {String} html  The HTML to append
 * @return {Library}      The Library instance of the node
 */
proto.append = function (html) {
	'use strict';

	append(this[0], html);

	return this;
};

/**
 * Prepends a block of HTML to the current node
 *
 * @param  {String} html  The HTML to prepend
 * @return {Library}      The Library instance of the node
 */
proto.prepend = function (html) {
	'use strict';

	prepend(this[0], html);

	return this;
};
