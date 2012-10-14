/*global QUnit, module, test, equal, strictEqual, theLibrary, expect, document, ok */
/*jslint vars:true */
(function () {
	'use strict';

	module("css");


	test("set/get", function () {
		expect(18);

		var $con = theLibrary('#container');
		equal($con.css('display'), 'block', 'Check for css property "display"');
		equal(theLibrary('#logo').css('display'), 'none', 'Display is none on logo');
		var $foo = theLibrary('#foo');
		equal($foo.css('display'), 'block', 'Assert #foo is displayed');
		equal($foo.css('display', 'none').css('display'), 'none', 'Assert #foo is hidden');
		equal($foo.css('display', '').css('display'), 'block', 'Reset display');

		equal(parseInt($con.css('fontSize'), 10), 16, 'Verify fontSize px set.');
		equal(parseInt($con.css('fontSize'), 10), 16, 'Verify fontSize px set.');
		$foo.attr('class', 'em');
		equal($foo.attr('class'), 'em', 'Verfiy em class set');
		equal($foo.css('fontSize'), '32px', 'Verify fontSize em set');

		$foo.css('width', '100px');
		equal($foo.css('width'), '100px', 'Set and get width');
		equal($con.find('input').css('height', '13px').css('height'), '13px', 'Set and Get height on inputs');
		$foo.css('height', '100%');
		equal($foo[0].style.height, '100%', 'Set height to 100%');

		equal(typeof $foo.css('width'), 'string', 'Make sure that a string width is returned.');

		var $img = theLibrary('img').first();
		equal($img.css('float'), 'none', 'Float starts as none when computed');
		equal($img.css('float', 'left').css('float'), 'left', 'Set float style');
		equal($img.css('float', '').css('float'), 'none', 'Reset float');

		strictEqual(theLibrary('#opacityTest').css('opacity'), '0.25', 'Test retrieving opacity on div element');
		$foo.css('opacity', 0.5);
		strictEqual($foo.css('opacity'), '0.5', 'Set and get opacity');
	});

	test('object', function () {
		var name, $div,
			div = document.createElement('div'),
			attrs = {
				'display': 'inline',
				'float': 'left',
				'font-color': 'red',
				'background-color': 'orange',
				'opacity': 1
			};

		$div = theLibrary(div).css(attrs);

		for (name in attrs) {
			strictEqual($div.css(name), attrs[name].toString(), "Was the attribute set?");
		}

	});

	test("getWinDimension()", function () {
		expect(2);
		equal(typeof theLibrary.getWinDimension('width'), 'number', 'Window dimensions are retrievable');
		equal(typeof theLibrary.getWinDimension('height'), 'number', 'Window dimensions are retrievable');
	});

	test("getDocDimensions()", function () {
		expect(2);
		equal(typeof theLibrary.getDocDimension('width'), 'number', 'Window dimensions are retrievable');
		equal(typeof theLibrary.getDocDimension('height'), 'number', 'Window dimensions are retrievable');
	});
}());