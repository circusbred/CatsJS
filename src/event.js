/*global expando, Library, each, proto, addToProto, push, indexOf */
/*jslint browser: true */
/**
 * Events
 */
// TODO event delegation?
var on, off, preventDefault, stopPropagation, normalize;

function addEventData(node, type, fn) {
	'use strict';

	node.data = node.data || {};
	node.data.events = node.data.events || {};
	node.data.events[type] = node.data.events[type] || [];
	node.data.events[type].push(fn);
}

if (document.addEventListener) {
	on = function (node, type, fn) {
		'use strict';

		if (node.addEventListener) {
			addEventData(node, type, fn);
			node.addEventListener(type, fn, false);
		}
	};
	off = function (node, type, fn) {
		'use strict';

		if (node.removeEventListener) {
			if (fn === undefined) {
				each(node.data.events[type], function (fn) {
					off(node, type, fn);
				});
			} else {
				var index = indexOf(node.data.events[type], fn);

				if (index !== -1) {

					node.data.events[type].splice(index, 1);

					node.removeEventListener(type, fn, false);
				}
			}
		}
	};

} else { // IE

	preventDefault = function () {
		'use strict';

		this.returnValue = false;
	};

	stopPropagation = function () {
		'use strict';

		this.cancelBubble = true;
	};

	/**
	 * Normalizes the event object by adding:
	 *
	 * * offset[X/Y]
	 * * relatedTarget
	 * * which
	 * * preventDefault
	 * * stopPropagation
	 * * target
	 *
	 * @param  {Event} e The event to be normalized
	 * @return {Event}   The normalized event
	 */
	normalize = function (e) {
		'use strict';

		if (!e) {
			e = window.event;
		}

		if (e.layerX) {
			e.offsetX = e.layerX;
			e.offsetY = e.layerY;
		}

		if (!e.relatedTarget) {
			if (e.type === 'mouseover') {
				e.relatedTarget = e.fromElement;
			} else if (e.type === 'mouseout') {
				e.relatedTarget = e.toElement;
			}
		}

		e.which = e.keyCode || e.charCode;

		e.target = e.target || e.srcElement;

		if (typeof e.preventDefault !== 'function') {
			e.preventDefault = preventDefault;
			e.stopPropagation = stopPropagation;
		}

		return e;
	};

	on = function (node, type, fn) {
		'use strict';

		var f;
		if (node.attachEvent) {
			if (fn[expando]) {
				f = fn[expando];
			} else {

				f = fn[expando] = function (e) {
					fn.call(node, normalize(e));
				};

			}

			addEventData(node, type, fn);
			node.attachEvent('on' + type, f);
		}
	};

	off = function (node, type, fn) {
		'use strict';

		if (node.detachEvent) {
			if (fn === undefined) {
				each(node.data.events[type], function (fn) {
					off(node, type, fn);
				});
			} else {
				var index = indexOf(node.data.events[type], fn);

				if (index !== -1) {

					node.data.events[type].splice(index, 1);

					node.detachEvent('on' + type, fn[expando] || fn);
				}
			}
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

function getBoundEvents(node) {
	'use strict';

	if (node && node.data && node.data.events) {
		return node.data.events;
	}

	return {};
}

proto.events = function () {
	'use strict';

	// TODO exception, this.length could be 0
	return getBoundEvents(this[0]);
};
