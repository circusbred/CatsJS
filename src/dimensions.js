/*global Library */
/*jslint browser: true */
// TODO Library(el).offset();
// TODO Library(el).position();
// TODO Library(el).width();
// TODO Library(el).height();
/**
 * Window/Document dimensions
 */
// TODO legacy
Library.getWinDimension = function (name) {
	'use strict';

	name = name.charAt(0).toUpperCase() + name.slice(1); // Capitialize
	var docElemProp = document.documentElement["client" + name];
	return document.compatMode === "CSS1Compat" && (docElemProp || document.body["client" + name] || docElemProp);
};

Library.getDocDimension = function (name) {
	'use strict';

	name = name.charAt(0).toUpperCase() + name.slice(1); // Capitialize
	return Math.max(
		document.documentElement["client" + name],
		document.body["scroll" + name],
		document.documentElement["scroll" + name],
		document.body["offset" + name],
		document.documentElement["offset" + name]
	);
};
