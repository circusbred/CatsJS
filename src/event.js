/*global Library, each, proto, addToProto, indexOf */
/**
 * Events
 */

// TODO event delegation?

var on, off, fire;

function addEventData(node, type, fn) {
	'use strict';

	node.data = node.data || {};
	node.data.events = node.data.events || {};
	node.data.events[type] = node.data.events[type] || [];
	node.data.events[type].push(fn);
}

function getBoundEvents(node) {
	'use strict';

	if (node && node.data && node.data.events) {
		return node.data.events;
	}

	return {};
}

var on = function (node, type, fn) {
		'use strict';

		if (node.addEventListener) {
			addEventData(node, type, fn);
			node.addEventListener(type, fn, false);
		}
	},
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
	},
	fire = function (node, type) {
		'use strict';

		var event = document.createEvent('HTMLEvents');
		event.initEvent(type, true, true);
		node.dispatchEvent(event);
	};

Library.on = on;
Library.off = off;
Library.fire = fire;
addToProto(on, 'on');
addToProto(off, 'off');
addToProto(fire, 'fire');

proto.events = function () {
	'use strict';

	if (this.length) {
		return getBoundEvents(this[0]);
	}

	return {};
};
