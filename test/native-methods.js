/*jslint browser:true*/
/*global module, ok, test, theLibrary, equal, notEqual*/
(function () {
	'use strict';

	module('native methods', {
		setup: function () {
			document.getElementById('qunit-fixture').innerHTML = '<button id="test-button">test</button>';
		},
		teardown: function () {
			document.getElementById('qunit-fixture').innerHTML = '';
		}
	});

	test('Library#focus', function () {

		ok(theLibrary.prototype.focus);
		equal(typeof theLibrary.prototype.focus, 'function');
		equal(theLibrary.prototype.focus.length, 0);

		var previous = document.activeElement,
			$button = theLibrary('#test-button');

		$button.focus();

		notEqual(document.activeElement, previous);
		equal(document.activeElement, $button[0]);
	});

	test('Library#click', function () {

		ok(theLibrary.prototype.click);
		equal(typeof theLibrary.prototype.click, 'function');
		equal(theLibrary.prototype.click.length, 0);

		var CLICKED = false,
			$button = theLibrary('#test-button');

		function handler() {
			CLICKED = true;
		}

		$button.on('click', handler);

		$button.click();

		ok(CLICKED);
	});

}());
