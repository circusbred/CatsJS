/*global QUnit, module, test, equal, strictEqual, expect, ok, notEqual, deepEqual */
/*global theLibrary */
/*jslint browser:true */
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

	module("css", {
		setup: function () {
			document.getElementById('qunit-fixture').innerHTML = fixtureHTML;
		}
	});

	test("set/get", function () {
		expect(18);

		var $foo, $con, $img;

		$con = theLibrary('#container');
		equal($con.css('display'), 'block', 'Check for css property "display"');
		equal(theLibrary('#logo').css('display'), 'none', 'Display is none on logo');
		$foo = theLibrary('#foo');
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

		$img = theLibrary('img').first();
		equal($img.css('float'), 'none', 'Float starts as none when computed');
		equal($img.css('float', 'left').css('float'), 'left', 'Set float style');
		equal($img.css('float', '').css('float'), 'none', 'Reset float');

		strictEqual(theLibrary('#opacityTest').css('opacity'), '0.25', 'Test retrieving opacity on div element');
		$foo.css('opacity', 0.5);
		strictEqual($foo.css('opacity'), '0.5', 'Set and get opacity');
	});

	test('object', function () {
		var name, $div, prop,
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
			if (attrs.hasOwnProperty(name)) {
				prop = name;
				strictEqual($div.css(prop), attrs[name].toString(), "Was the property set?");
			}
		}

	});

	test("getWinDimension()", 2, function () {

		equal(typeof theLibrary.getWinDimension('width'), 'number', 'Window dimensions are retrievable');
		equal(typeof theLibrary.getWinDimension('height'), 'number', 'Window dimensions are retrievable');
	});

	test("getDocDimensions()", 2, function () {

		equal(typeof theLibrary.getDocDimension('width'), 'number', 'Window dimensions are retrievable');
		equal(typeof theLibrary.getDocDimension('height'), 'number', 'Window dimensions are retrievable');
	});
}());