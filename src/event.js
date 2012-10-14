/*global expando, Library, each, proto, addToProto, push */
/*jslint browser: true */
/**
 * Events
 */
var on, off, preventDefault, stopPropagation;
if (document.addEventListener) {
	on = function (node, type, fn) {
		'use strict';
		if (node.addEventListener) {
			node.addEventListener(type, fn, false);
		}
	};
	off = function (node, type, fn) {
		'use strict';
		if (node.removeEventListener) {
			node.removeEventListener(type, fn, false);
		}
	};

	// IE
} else {
	preventDefault = function () {
		'use strict';
		this.returnValue = false;
	};
	stopPropagation = function () {
		'use strict';
		this.cancelBubble = true;
	};
	on = function (node, type, fn) {
		'use strict';
		var f;
		if (node.attachEvent) {
			if (fn[expando]) {
				f = fn[expando];
			} else {

				f = fn[expando] = function (e) {
					if (typeof e.preventDefault !== 'function') {
						e.preventDefault = preventDefault;
						e.stopPropagation = stopPropagation;
					}
					fn.call(node, e);
				};

			}
			node.attachEvent('on' + type, f);
		}
	};
	off = function (node, type, fn) {
		'use strict';
		if (node.detachEvent) {
			node.detachEvent('on' + type, fn[expando] || fn);
		}
	};
}
Library.on = on;
Library.off = off;

var fire;
if (document.createEvent) {
	fire = function (node, type) {
		'use strict';
		var event = document.createEvent('HTMLEvents');
		event.initEvent(type, true, true);
		node.dispatchEvent(event);
	};
} else {
	fire = function (node, type) {
		'use strict';
		var event = document.createEventObject();
		node.fireEvent('on' + type, event);
	};
}
Library.fire = fire;
each(['on', 'off', 'fire'], function (val) {
	'use strict';
	proto[val] = function () {
		var node, args, i, l;
		for (i = 0, l = this.length; i < l; i += 1) {
			node = this[i];
			args = [ node ];
			push.apply(args, arguments);
			Library[val].apply(node, args);
		}
		return this;
	};
});