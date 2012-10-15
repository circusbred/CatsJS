/*global QUnit, module, test, equal, strictEqual, theLibrary, expect, ok, cats, deepEqual */
/*jslint browser: true, vars:true */
(function () {
	'use strict';
	/**
	 * Returns an array of elements with the given IDs
	 * @example q("qunit-fixture", "foo", "bar")
	 * @return {Array} An array of selected elements
	 */

	function q() {
		var i, r = [];

		for (i = 0; i < arguments.length; i += 1) {
			r.push(document.getElementById(arguments[i]));
		}

		return r;
	}


	var fixtureHTML = '<div id="container">' +
		'	<p id="firstp"></p>' +
		'	<div id="foo">' +
		'		<p id="sndp">Everything inside the red border is inside a div with <code>id="foo"</code>.</p>' +
		'		<p lang="en" id="en">This is a normal link: <a id="yahoo" href="http://www.yahoo.com/" class="blogTest">Yahoo</a></p>' +
		'		<p id="sap">This link has <code><a href="#2" id="anchor2">class="blog"</a></code>: <a href="http://simon.incutio.com/" class="blog link" id="simon">Simon Willison\'s Weblog</a></p>' +
		'	</div>' +
		'	<div id="parent">' +
		'		<div id="child"></div>' +
		'	</div>' +
		'	<ul id="unorderedList">' +
		'		<li id="listOne" class="list"></li>' +
		'		<li id="listTwo" class="list"></li>' +
		'		<li id="listThree" class="list"></li>' +
		'		<li id="listFour"></li>' +
		'	</ul>' +
		'	<div id="listFiveDiv" class="list"></div>' +
		'	<input type="text" id="text1" maxlength="30">' +
		'	<p id="lastp" class="pFoo"></p>' +
		'	<a href="#" rel="nofollow" id="link1" title="test">test</a>' +
		'	<a onclick="something()" href="http://diveintomark.org/" class="blog" hreflang="en" id="mark">diveintomark</a>' +
		'	<img id="logo" src="http://jsfiddle.net/img/logo.png" width="10" height="12">' +
		'	<table id="table1">' +
		'		<tr><td>cell</td></tr>' +
		'		<tr><td>cell</td><td>cell</td></tr>' +
		'		<tr><td>cell</td><td>cell</td></tr>' +
		'	</table>' +
		'	<div id="opacityTest" style="opacity:0.25;filter:alpha(opacity=25)"></div>' +
		'	<form action="#" id="form1" class="classOnForm">' +
		'		<input type="radio" id="radio1">' +
		'		<input type="checkbox" id="check1">' +
		'		<input type="text" id="name" name="name" value="name" />' +
		'		<input type="text" id="action" name="action" value="action" />' +
		'		<input type="text" name="target" id="target">' +
		'		<input type="text" name="id">' +
		'		<textarea id="area1" value="foobar">text</textarea>' +
		'		<button id="button1" value="foobar">text</button>' +
		'	</form>' +
		'</div> <!-- /container -->';

	module("core", {
		setup: function () {
			document.getElementById('qunit-fixture').innerHTML = fixtureHTML;
		}
	});

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

			//TODO stupid
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