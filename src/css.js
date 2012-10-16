/*global support, proto, trim */
/*global isString, isObject, hasOwn, push */
/*jslint browser: true, sloppy: true */

/*jslint regexp: true */
var getCSS, setCSS,
	cssHooks = {},
	cssProps = {
		// Normalize float
		'float': support.cssFloat ? 'cssFloat' : 'styleFloat'
	},

	rnotnumpx = /^-?\d+[^p\s\d]+$/i,
	ropacity = /opacity=([^)]*)/,
	ralpha = /alpha\([^)]*\)/i;

/*jslint regexp: false */


// IE uses filter for opacity
if (!support.opacity) {
	cssHooks.opacity = {
		get: function (node) {
			return ropacity.test(node.style.filter || "") ? (0.01 * parseFloat(RegExp.$1)).toString() : "";
		},
		set: function (node, value) {
			var style = node.style,
				filter = style.filter,
				opacity = 'alpha(opacity=' + (value * 100).toString() + ')';

			style.zoom = 1; // Force opacity in IE by setting the zoom level
			if (value >= 1 && trim(filter.replace(ralpha, '')) === '' && style.removeAttribute) {
				style.removeAttribute('filter');
			}

			style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity;
		}
	};
}

// TODO support ?
if (window.getComputedStyle) {
	getCSS = function (node, name) {
		name = cssProps[name] || name;
		var ret = cssHooks[name];

		if (ret && hasOwn.call(ret, 'get')) {
			return ret.get(node, name);
		}

		ret = window.getComputedStyle(node, null)[name];
		return !ret ? node.style[name] : ret;
	};
} else if (document.documentElement.currentStyle) {
	getCSS = function (node, name) {
		name = cssProps[name] || name;
		var left, rsLeft, style, ret = cssHooks[name];

		if (ret && hasOwn.call(ret, 'get')) {
			return ret.get(node, name);
		}

		// Credits to jQuery
		ret = node.currentStyle && node.currentStyle[name];

		// Uses the pixel converter by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
		if (rnotnumpx.test(ret)) {
			rsLeft = node.runtimeStyle && node.runtimeStyle[name];
			style = node.style;

			left = style.left;
			if (rsLeft) {
				node.runtimeStyle.left = node.currentStyle.left;
			}
			style.left = name === 'fontSize' ? '1em' : (ret || 0);
			ret = style.pixelLeft + 'px';

			// Revert the changed values
			style.left = left;
			if (rsLeft) {
				node.runtimeStyle.left = rsLeft;
			}
		}

		return ret === '' ? 'auto' : !ret ? node.style[name] : ret;

	};
}

setCSS = function (node, name, value) {
	name = cssProps[name] || name;
	var hook = cssHooks[name];
	if (hook && hasOwn.call(hook, 'set')) {
		hook.set(node, value);
	} else {
		node.style[name] = value;
	}
};

function css(node, name, value) {
	var key, display;

	if (isString(name) && value === undefined) {
		return getCSS(node, name);
	}

	if (isObject(name)) {
		// hasOwn = Object.prototype.hasOwnProperty, silly JSLint
		display = node.style.display || '';
		node.style.display = 'none';
		/*jslint forin: true */
		for (key in name) {
			if (hasOwn.call(name, key)) {
				setCSS(node, key, name[key]);
				if (key === 'display') {
					display = name[key];
				}
			}
		}
		node.style.display = display;
		/*jslint forin: false */
		return;
	}

	if (isString(name) && value !== undefined) {
		value = value && value.toString ? value.toString() : value;
		return setCSS(node, name, value);
	}
}

proto.css = function (name, value) {
	var node, args, i, length, nodeType, ret;

	for (i = 0, length = this.length; i < length; i += 1) {
		node = this[i];

		if (!(!node || (nodeType = node.nodeType) === 3 || nodeType === 8 || nodeType === 2)) {

			args = [node];
			push.apply(args, arguments);
			ret = css.apply(node, args);

			if (value === undefined && !isObject(name)) {
				return ret;
			}
		}
	}
	return this;
};