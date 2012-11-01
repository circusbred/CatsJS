/*global support, trim, hasOwn */
/*global setCSS: true, getCSS: true */

// moved all this stuff here, not needed by real browsers
/*jslint regexp: true */
var rnotnumpx = /^-?\d+[^p\s\d]+$/i,
	ropacity = /opacity=([^)]*)/,
	ralpha = /alpha\([^)]*\)/i,

	cssHooks = {},
	cssProps = {
		'float': support.cssFloat ? 'cssFloat' : 'styleFloat'
	};
/*jslint regexp: false */

// IE uses filter for opacity
if (!support.opacity) {
	cssHooks.opacity = {
		get: function (node) {
			'use strict';

			return ropacity.test(node.style.filter || "") ? (0.01 * parseFloat(RegExp.$1)).toString() : "";
		},
		set: function (node, value) {
			'use strict';

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

setCSS = function (node, name, value) {
	'use strict';

	name = cssProps[name] || name;
	var hook = cssHooks[name];
	if (hook && hasOwn.call(hook, 'set')) {
		hook.set(node, value);
	} else {
		node.style[name] = value;
	}
};

if (document.documentElement.currentStyle) {
	getCSS = function (node, name) {
		'use strict';

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