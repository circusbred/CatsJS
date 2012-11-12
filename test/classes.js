/*global module, test, equal, theLibrary, ok, QUnit*/
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


	module("classes", {
		setup: function () {
			document.getElementById('qunit-fixture').innerHTML = fixtureHTML;
		}
	});

	test('addClass()', 7, function () {
		var div, i, pass;

		div = theLibrary('div');
		div.addClass('test');
		pass = true;
		for (i = 0; i < div.length; i += 1) {
			if (div[i].className.indexOf('test') === -1) {
				pass = false;
			}
		}
		ok(pass, 'Add Class');

		div = theLibrary(document.createElement('div'));

		div.addClass('test');
		equal(div.attr('class'), 'test', 'Make sure there\'s no extra whitespace.');

		div.attr('class', 'foo');
		div.addClass('bar baz');
		equal(div.attr('class'), 'foo bar baz', 'Make sure there isn\'t too much trimming.');

		div.removeClass();
		div.addClass('foo').addClass('foo');
		equal(div.attr('class'), 'foo', 'Do not add the same class twice in separate calls.');

		div.addClass('fo');
		equal(div.attr('class'), 'foo fo', 'Adding a similar class does not get interrupted.');
		div.removeClass().addClass('wrap2');
		ok(div.addClass('wrap').hasClass('wrap'), 'Can add similarly named classes');

		div.removeClass();
		div.addClass('bar bar');
		equal(div.attr('class'), 'bar', 'Do not add the same class twice in the same call.');
	});

	test('removeClass()', 5, function () {

		var div,
			$divs = theLibrary('div');

		$divs.addClass('test').removeClass('test');

		ok(!$divs.hasClass('test'), 'Remove Class');

		// TODO how is this not broken?
		QUnit.reset();
		$divs = theLibrary('div');

		$divs.addClass('test').addClass('foo').addClass('bar');
		$divs.removeClass('test').removeClass('bar').removeClass('foo');

		ok(!$divs.hasClass('test'), 'Remove multiple classes');
		ok(!$divs.hasClass('bar'), 'Remove multiple classes');
		ok(!$divs.hasClass('foo'), 'Remove multiple classes');

		QUnit.reset();

		div = document.createElement('div');

		div.className = ' test ';

		theLibrary(div).removeClass('test');
		equal(div.className, '', 'Make sure there is nothing left after everything is removed.');
	});


	test('addClass(), removeClass(), hasClass()', 13, function () {
		var elem = document.createElement('p'),
			$elem = theLibrary(elem);

		$elem.addClass('hi');
		equal(elem.className, 'hi', 'Check single added class');

		$elem.addClass('foo bar');
		equal(elem.className, 'hi foo bar', 'Check more added classes');

		$elem.removeClass();
		equal(elem.className, '', 'Remove all classes');

		$elem.addClass('hi foo bar');
		$elem.removeClass('foo');
		equal(elem.className, 'hi bar', 'Check removal of one class');

		ok($elem.hasClass('hi'), 'Check has1');
		ok($elem.hasClass('bar'), 'Check has2');

		elem.className = 'class1 cla.ss3 class4';
		ok($elem.hasClass('class1'), 'Check hasClass with dot');
		ok($elem.hasClass('cla.ss3'), 'Check hasClass with dot');
		ok($elem.hasClass('class4'), 'Check hasClass with dot');

		$elem.removeClass('class2');
		ok(!$elem.hasClass('class2'), 'Check the class has been properly removed');
		$elem.removeClass('cla');
		ok($elem.hasClass('cla.ss3'), 'Check the dotted class has not been removed');
		$elem.removeClass('cla.ss3');
		ok(!$elem.hasClass('cla.ss3'), 'Check the dotted class has been removed');
		$elem.removeClass('class4');
		ok(!$elem.hasClass('class4'), 'Check the class has been properly removed');
	});
}());