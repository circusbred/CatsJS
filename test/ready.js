/*jslint browser:true*/
/*global module, test, theLibrary, stop, start, equal*/
(function () {
	'use strict';


	module('ready');

	test('library(function)', function () {

		stop();

		var interval,
			count = 0;

		function stuff() {
			count += 1;
		}

		theLibrary(stuff);

		interval = window.setInterval(function () {

			start();

			if (document.readyState === 'complete' || document.readyState === 'interactive') {

				equal(count, 1, 'functions passed to the library should only be fired once AFTER DOM ready');
				window.clearInterval(interval);

			} else {

				equal(count, 0, 'the function should not be executed yet');

			}

		}, 200);

	});

}());