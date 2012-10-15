/*global QUnit, module, test, equal, strictEqual, theLibrary, expect, ok, deepEqual, start, stop */
/*jslint browser: true, vars:true */
(function () {
	'use strict';

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


	module("events", {
		setup: function () {
			document.getElementById('qunit-fixture').innerHTML = fixtureHTML;
		}
	});

	test("on()", function () {
		expect(5);
		var $text = theLibrary('#text1');

		stop();
		var focus = function () {
				ok(true, 'focus fired for element: ' + this);
				deepEqual($text[0], this, 'Context is the element');
				start();
			};

		$text.on('focus', focus);
		$text[0].focus();

		document.location.hash = '';
		var click = function (e) {
				equal(typeof e.preventDefault, 'function', 'Prevent default is present on the event object');
				equal(typeof e.stopPropagation, 'function', 'stopPropogation is present on the event object');
				e.preventDefault();
			};

		var $a = theLibrary('#anchor2');
		$a.on('click', click);
		$a.fire('click');
		equal(document.location.hash.replace('#', ''), '', 'Default action prevented');
	});

	test("off()", function () {
		expect(3);
		var $a = theLibrary('#link1');
		var cnt = 0;
		var click = function (e) {
				deepEqual($a[0], this, 'Click context is the element');
				cnt += 1;
			};
		$a.on('click', click);
		$a.fire('click').fire('click');
		$a.off('click', click);
		$a.fire('click');
		equal(cnt, 2, 'Click unbound correctly and only fired 2 times');
	});

	test("fire()", function () {
		var $a = theLibrary('#link1');
		var cnt = 0;
		var click = function () {
				cnt += 1;
			};
		$a.on('click', click);

		$a.fire('click').fire('click').fire('click');
		equal(cnt, 3, 'Click fired three times');
	});
}());