/*global expando, addEventData, each, indexOf, Library, addToProto */

/*global off: true, on: true, fire: true */

var preventDefault, stopPropagation, normalize;

if (!document.addEventListener) {


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

	Library.on = on;
	Library.off = off;
	addToProto(on, 'on');
	addToProto(off, 'off');
}


if (document.createEventObject) {


	fire = function (node, type) {
		'use strict';

		var event = document.createEventObject();
		node.fireEvent('on' + type, event);
	};

	Library.fire = fire;
	addToProto(fire, 'fire');

}