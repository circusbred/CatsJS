/*global support, trim */
/*global hasClass: true, addClass: true, removeClass: true */
/**
 * [safeClassName description]
 *
 * @requires trim
 * @param  {String} className [description]
 * @return {String}           [description]
 */
function safeClassName(className) {
	'use strict';

	return ' ' + trim(className) + ' ';
}

// IE9 and below
if (!support.classList) {

	hasClass = function (node, classStr) {
		'use strict';

		if (node && classStr) {
			return safeClassName(node.className).indexOf(safeClassName(classStr)) !== -1;
		}
		return false;
	};

	addClass = function (node, classes) {
		'use strict';

		var c, i,
			cls = safeClassName(node.className),
			len = classes.length;

		for (i = 0; i < len; i += 1) {
			c = classes[i];
			if (c && cls.indexOf(safeClassName(c)) < 0) {
				cls += c + ' ';
			}
		}
		node.className = trim(cls);
	};

	removeClass = function (node, classes) {
		'use strict';

		var cls, len, i;

		if (classes !== undefined) {
			cls = safeClassName(node.className);

			for (i = 0, len = classes.length; i < len; i += 1) {
				cls = cls.replace(safeClassName(classes[i]), ' ');
			}
			cls = trim(cls);
		} else {
			cls = '';
		}
		if (node.className !== cls) {
			node.className = cls;
		}
	};

}