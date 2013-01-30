/*global each, proto*/

var methods = [
	'focus',
	'click'
];

each(methods, function (method) {
	'use strict';

	proto[method] = function () {
		this[0][method]();
	};
});
