/*global QUnit, module, test, equal, strictEqual, theLibrary, expect, ok, deepEqual, start, stop */
/*jslint browser: true, vars:true */
(function () {
	'use strict';
	/**
	 * Returns an array of elements with the given IDs
	 * @example q("qunit-fixture", "foo", "bar")
	 * @return {Array} An array of selected elements
	 */

	var queryAll = window.minimal;

	function q() {
		var i, r = [];

		for (i = 0; i < arguments.length; i += 1) {
			r.push(document.getElementById(arguments[i]));
		}

		return r;
	}

	/**
	 * Asserts that a select matches the given IDs
	 * Runs two tests for both queryAll and query
	 * @param {String} a - description of test
	 * @param {String} b - queryAll selector
	 * @param {Array} c - list of ids for the elements that should be retrieved
	 * @example t("Check for foo", "#foo", ["foo"]);
	 */
	function t(a, b, c) {
		var i = q.apply(q, b);
		deepEqual(queryAll(a), i, c + " (" + a + ")");
		deepEqual(queryAll(a)[0], i[0], c + " with query (" + a + ")");
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

	module("queryAll", {
		setup: function () {
			document.getElementById('qunit-fixture').innerHTML = fixtureHTML;
		}
	});

	test("ID", function () {
		expect(6);
		t('#foo', ['foo'], 'Checks for a single element');
		t('#child', ['child'], '#child is found');
		t('#foo, #child, #parent', ['foo', 'child', 'parent'], 'Checks IDs split by commas');
	});

	test("TAGS", function () {
		expect(3);
		t('ul', ['unorderedList'], 'Tag selection');
		equal(queryAll('div').length, document.getElementsByTagName('div').length, 'Retrieve all divs');
	});

	test("CLASS", function () {
		expect(6);
		t('.list', ['listOne', 'listTwo', 'listThree', 'listFiveDiv'], 'Checks class selector');
		t('li.list', ['listOne', 'listTwo', 'listThree'], 'Checks tag.class selector');
		t('div.list', ['listFiveDiv'], 'Checks tag.class selector');
	});

	test("Element", function () {
		expect(4);
		t(document.getElementById('foo'), ['foo'], 'Passing an element leaves it');
		t(document.getElementsByTagName('ul'), ['unorderedList'], 'Passing elements leave them');
	});

	test("Rooted Selections", function () {
		expect(2);
		equal(queryAll('div', '#parent')[0].id, 'child', '#parent passed as root for child div');
		var ul = q('unorderedList')[0];
		equal(queryAll('.list', ul).length, q('listOne', 'listTwo', 'listThree').length, 'Select elements with given class only within ul root');
	});

	test("Invalid", function () {
		expect(5);

		try {
			queryAll('#parent #child');
		} catch (e) {
			ok(true, e);
		}

		try {
			queryAll('div ul');
		} catch (e2) {
			ok(true, e2);
		}

		try {
			queryAll('ul li.list');
		} catch (e3) {
			ok(true, e3);
		}

		try {
			queryAll('#child:last-child');
		} catch (e4) {
			ok(true, e4);
		}

		try {
			queryAll('input[type="text"]');
		} catch (e5) {
			ok(true, e5);
		}
	});
}());