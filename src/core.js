/*jslint browser: true */

var winMinimal = window.cats,

	// Selector
	rcomma = /\s*,\s*/,
	rid = /^#([\w\-]+)$/,
	rtagclass = /^(?:([\w]+)|([\w]+)?\.([\w\-]+))$/,

	// Classes
	// IE doesn't match non-breaking spaces with \s
	rtrim = /\S/.test('\xA0') ? /^[\s\xA0]+|[\s\xA0]+$/g : /^\s+|\s+$/g,
	rspaces = /\s+/,
	ptrim = String.prototype.trim,

	// Attributes
	rleveltwo = /(?:href|src|width|height)/i,

	// CSS
	rnotnumpx = /^-?\d+[^p\s\d]+$/i,
	ropacity = /opacity=([^)]*)/,
	ralpha = /alpha\([^)]*\)/i;

	// Array
	arrayProto = Array.prototype,
	slice = arrayProto.slice,
	push = arrayProto.push,
	pindexOf = arrayProto.indexOf,

	// Object
	objProto = Object.prototype,
	hasOwn = objProto.hasOwnProperty,
	toString = objProto.toString;

/**
 * Main constructor
 */

function minimal(selector, root) {

	// Self-instantiate if not instantiated
	if (!(this instanceof minimal)) {
		return new minimal(selector, root);
	}

	var selection = queryAll(selector, root);

	this.length = selection.length;
	merge(this, selection);
}



var proto = minimal.prototype;
proto.version = version;
var expando = 'minimal' + proto.version + Math.random() * 9e17;



/**
 * Responsible infection of the global namespace
 * @return {Object} Returns minimal
 */
minimal.noConflict = function () {
	window.cats = winCats;
	return minimal;
};