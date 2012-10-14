/*global QUnit, module, test, equal, strictEqual, theLibrary, expect, ok, cats, deepEqual, q */
/*jslint browser: true, vars:true */
(function () {
	'use strict';

	module("core");

	test("noConflict()", 1, function () {

		var $$ = window.cats;
		cats.noConflict(true);
		equal(window.cats, undefined, 'noConflict deep removes theLibrary from window');

		window.cats = $$;
	});

	test("Constructor", 10, function () {

		// Constructor behavior
		equal(theLibrary().length, 0, 'theLibrary() === theLibrary([])');
		equal(theLibrary([]).length, 0, 'theLibrary([])');
		equal(theLibrary(undefined).length, 0, 'theLibrary(undefined) === theLibrary([])');
		equal(theLibrary(null).length, 0, 'theLibrary(null) === theLibrary([])');
		equal(theLibrary('').length, 0, 'theLibrary("") === theLibrary([])');

		ok(theLibrary('#foo') instanceof theLibrary, 'Self instantiated');
		equal(theLibrary('div.list').length, 1, 'Length property');
		equal(theLibrary('.list').length, 4, 'Multiple objects');
		equal(theLibrary(document.getElementById('foo')).length, 1, 'Minimal takes elements');
		equal(theLibrary(document).length, 1, 'Minimal object of a document');

	});

	test("theLibrary.trim()", 4, function () {

		var nbsp = String.fromCharCode(160);

		equal(theLibrary.trim('hello  '), 'hello', 'trailing space');
		equal(theLibrary.trim('  hello'), 'hello', 'leading space');
		equal(theLibrary.trim('  hello   '), 'hello', 'space on both sides');
		equal(theLibrary.trim('  ' + nbsp + 'hello  ' + nbsp + ' '), 'hello', '&nbsp;');

	});

	test("toArray()", 8, function () {
		deepEqual(theLibrary('p', '#container').toArray(), q('firstp', 'sndp', 'en', 'sap', 'lastp'), 'Convert theLibrary object to an Array');
		ok(theLibrary.toArray(document.getElementsByTagName('div')) instanceof Array, 'Convert nodelist to array');

		equal(theLibrary.toArray(theLibrary('head'))[0].nodeName.toUpperCase(), 'HEAD', 'Pass toArray a theLibrary object');

		equal(theLibrary.toArray(document.getElementsByTagName('ul')).slice(0, 1)[0].id, 'unorderedList', 'Pass toArray a nodelist');

		equal((function () {
			return theLibrary.toArray(arguments);
		}(1, 2)).join(''), '12', 'Pass toArray an arguments array');

		equal(theLibrary.toArray([1, 2, 3]).join(''), '123', 'Pass toArray a real array');

		equal(theLibrary.toArray({
			length: 2,
			0: 'a',
			1: 'b'
		}).join(''), 'ab', 'Pass toArray an array like map (with length)');

		ok(!!theLibrary.toArray(document.documentElement.childNodes).slice(0, 1)[0].nodeName, 'Pass toArray a childNodes array');
	});

	test("indexOf()", 35, function () {


		var selections = {
			p: q('firstp', 'en', 'sap', 'lastp'),
			li: q('listOne', 'listTwo'),
			div: q('container', 'parent', 'child', 'foo'),
			a: q('mark', 'link1', 'simon'),
			empty: []
		},
			tests = {
				p: {
					elem: theLibrary('#en')[0],
					index: 1
				},
				li: {
					elem: theLibrary('#listTwo')[0],
					index: 1
				},
				div: {
					elem: theLibrary('#child')[0],
					index: 2
				},
				a: {
					elem: theLibrary('#simon')[0],
					index: 2
				}
			},
			falseTests = {
				p: theLibrary('#listOne')[0],
				li: theLibrary('#foo')[0],
				empty: ''
			};

		theLibrary.each(tests, function (obj, key) {
			equal(theLibrary.indexOf(selections[key], obj.elem), obj.index, obj.elem + ' is in the array of selections of its tag');
			equal(theLibrary(selections[key]).indexOf(obj.elem), obj.index, obj.elem + ' is in the array of selections of its tag');

			// Third arg
			equal(!!~theLibrary.indexOf(selections[key], obj.elem, 5), false, obj.elem + ' is NOT in the array of selections given a starting index greater than its position');
			equal(!!~theLibrary.indexOf(selections[key], obj.elem, 1), true, obj.elem + ' is in the array of selections given a starting index less than or equal to its position');
			equal(!!~theLibrary.indexOf(selections[key], obj.elem, -3), true, obj.elem + ' is in the array of selections given with a negative fromIndex');

			equal(!!~theLibrary(selections[key]).indexOf(obj.elem, 5), false, obj.elem + ' is NOT in the array of selections given a starting index greater than its position');
			equal(!!~theLibrary(selections[key]).indexOf(obj.elem, 1), true, obj.elem + ' is in the array of selections given a starting index less than or equal to its position');
			equal(!!~theLibrary(selections[key]).indexOf(obj.elem, -3), true, obj.elem + ' is in the array of selections given with a negative fromIndex');
		});

		theLibrary.each(falseTests, function (elem, key) {
			equal(!!~theLibrary.indexOf(selections[key], elem), false, 'elem is NOT in the array of selections');
		});

	});

	test('theLibrary.each', 11, function () {

		theLibrary.each([0, 1, 2], function (n, i) {
			equal(i, n, 'Check array iteration');
		});

		theLibrary.each([5, 6, 7], function (n, i) {
			equal(n - 5, i, 'Check array iteration');
		});

		theLibrary.each({
			name: 'name',
			lang: 'lang'
		}, function (n, i) {
			equal(n, i, 'Check object iteration');
		});

		var total = 0;
		theLibrary.each([1, 2, 3], function (v) {
			total += v;
		});
		equal(total, 6, 'Looping over an array');
		total = 0;
		theLibrary.each({
			'a': 1,
			'b': 2,
			'c': 3
		}, function (v) {
			total += v;
		});
		equal(total, 6, 'Looping over an object');

		var stylesheet_count = 0;
		theLibrary.each(document.styleSheets, function (i) {
			stylesheet_count += 1;
		});
		equal(stylesheet_count, document.styleSheets.length, 'should not throw an error in IE while looping over document.styleSheets and return proper amount');
	});

}());