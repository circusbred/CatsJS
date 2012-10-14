module("events");

test("on()", function() {
	expect(5);
	var $text = theLibrary('#text1');

	stop();
	var focus = function() {
		ok( true, 'focus fired for element: ' + this );
		deepEqual( $text[0], this, 'Context is the element' );
		start();
	};

	$text.on('focus', focus);
	$text[0].focus();

	document.location.hash = '';
	var click = function( e ) {
		equal( typeof e.preventDefault, 'function', 'Prevent default is present on the event object' );
		equal( typeof e.stopPropagation, 'function', 'stopPropogation is present on the event object' );
		e.preventDefault();
	};

	var $a = theLibrary('#anchor2');
	$a.on('click', click);
	$a.fire('click');
	equal( document.location.hash.replace('#', ''), '', 'Default action prevented' );
});

test("off()", function() {
	expect(3);
	var $a = theLibrary('#link1');
	var cnt = 0;
	var click = function( e ) {
		deepEqual( $a[0], this, 'Click context is the element' );
		cnt++;
	};
	$a.on('click', click);
	$a.fire('click').fire('click');
	$a.off('click', click);
	$a.fire('click');
	equal( cnt, 2, 'Click unbound correctly and only fired 2 times' );
});

test("fire()", function() {
	var $a = theLibrary('#link1');
	var cnt = 0;
	var click = function() {
		cnt++;
	};
	$a.on('click', click);

	$a.fire('click').fire('click').fire('click');
	equal( cnt, 3, 'Click fired three times' );
});
