
// TODO minimal(el).offset();
// TODO minimal(el).position();
// TODO minimal(el).width();
// TODO minimal(el).height();

/**
 * Window/Document dimensions
 */
minimal.getWinDimension = function( name ) {
	name = name.charAt(0).toUpperCase() + name.slice(1); // Capitialize
	var docElemProp = document.documentElement[ "client" + name ];
	return document.compatMode === "CSS1Compat" && docElemProp ||
		document.body[ "client" + name ] || docElemProp;
};
minimal.getDocDimension = function( name ) {
	name = name.charAt(0).toUpperCase() + name.slice(1); // Capitialize
	return Math.max(
		document.documentElement[ "client" + name ],
		document.body["scroll" + name], document.documentElement[ "scroll" + name ],
		document.body["offset" + name], document.documentElement[ "offset" + name ]
	);
};
