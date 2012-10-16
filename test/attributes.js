/*global QUnit, module, test, equal, strictEqual, theLibrary, expect, document, ok */
/*jslint vars:true */
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

	module("attributes", {
		setup: function () {
			document.getElementById('qunit-fixture').innerHTML = fixtureHTML;
		}
	});

	test("attr() - get", 26, function () {

		equal(theLibrary('#text1').attr('type'), 'text', 'Check for type attribute');
		equal(theLibrary('#radio1').attr('type'), 'radio', 'Check for type attribute');
		equal(theLibrary('#check1').attr('type'), 'checkbox', 'Check for type attribute');
		equal(theLibrary('#link1').attr('rel'), 'nofollow', 'Check for rel attribute');
		equal(theLibrary('#link1').attr('title'), 'test', 'Check for title attribute');
		equal(theLibrary('#mark').attr('hreflang'), 'en', 'Check for hreflang attribute');
		equal(theLibrary('#en').attr('lang'), 'en', 'Check for lang attribute');
		equal(theLibrary('#simon').attr('class'), 'blog link', 'Check for class attribute');
		equal(theLibrary('#name').attr('name'), 'name', 'Check for name attribute');
		equal(theLibrary('#action').attr('name'), 'action', 'Check for name attribute');
		equal(theLibrary('#form1').attr('action'), '#', 'Check for action attribute');

		equal(theLibrary('#text1').attr('value', 't').attr('value'), 't', 'Check setting the value attribute');
		equal(theLibrary(document.createElement('div')).attr('value', 't').attr('value'), 't', 'Check setting custom attr named "value" on a div');

		// Crazy form stuff with input names equal to form attributes
		equal(theLibrary("#form1").attr('blah', 'blah').attr('blah'), 'blah', 'Set non-existant attribute on a form');
		equal(theLibrary('#foo').attr('height'), null, 'Non existent height attribute should return null');
		equal(theLibrary('#form1').attr('action', 'newformaction').attr('action'), 'newformaction', 'Check that action attribute was changed');
		equal(theLibrary('#form1').attr('target'), null, 'Retrieving target does not equal the input with name=target');
		equal(theLibrary('#form1').attr('target', 'newTarget').attr('target'), 'newTarget', 'Set target successfully on a form');
		equal(theLibrary('#form1').removeAttr('id').attr('id'), null, 'Retrieving id does not equal the input with name=id after id is removed');
		equal(theLibrary('#form1').attr('name'), null, 'Retrieving name does not retrieve input with name=name');

		equal(theLibrary('#text1').attr('maxlength'), '30', 'Check for maxlength attribute');

		var body = document.body,
			$body = theLibrary(body);
		strictEqual($body.attr('foo'), null, 'Make sure that a non existent attribute returns null');

		equal(theLibrary('#logo').attr('width'), '10', 'Retrieve width attribute an an element with display:none.');
		equal(theLibrary('#logo').attr('height'), '12', 'Retrieve height attribute an an element with display:none.');

		// Value should retrieve value attribute on buttons
		equal(theLibrary('#button1').attr('value'), 'foobar', 'Value retrieval on a button does not return innerHTML');

		equal(theLibrary('#table1').attr('test:attrib', 'foobar').attr('test:attrib'), 'foobar', 'Setting an attribute on a table with a colon does not throw an error.');

	});

	// TODO Used to call QUnit.reset(); which is stupid, moved to separate test
	test("attr() - get continued", 4, function () {

		equal(theLibrary('#form1').attr('class'), 'classOnForm', 'Retrieve the class attribute on a form.');

		equal(theLibrary('#mark').attr('onclick'), 'something()', 'Retrieve ^on attribute without anonymous function wrapper.');

		equal(theLibrary().attr("doesntexist"), null, "Make sure null is returned when no element is there.");

		strictEqual(theLibrary('#firstp').attr('nonexisting'), null, 'attr works correctly for non existing attributes');
	});

	test("attr() - object", 9, function () {
		var name, $div,
			div = document.createElement('div'),
			attrs = {
				'data-cats': 'yes',
				'aria-label': 'Hello',
				'custom': 'cats',
				'id': 'foo',
				'target': 'stuff',
				'name': 'cookies',
				'data-integer': 1,
				'data-true': true,
				'data-false': false
			};

		theLibrary(div).attr(attrs);

		for (name in attrs) {
			if (attrs.hasOwnProperty(name)) {
				strictEqual(div.getAttribute(name, 2), attrs[name].toString(), "Was the attribute set?");
			}
		}
	});


	test("attr() - set", 14, function () {

		var i, $elem,
			div = theLibrary('div').attr('foo', 'bar'),
			attributeNode = document.createAttribute('irrelevant'),
			commentNode = document.createComment('some comment'),
			textNode = document.createTextNode('some text'),
			fail = false,
			elems = [commentNode, textNode, attributeNode];

		for (i = 0; i < div.length; i += 1) {
			if (div[i].getAttribute('foo') !== 'bar') {
				fail = i;
				break;
			}
		}

		equal(fail, false, 'Set Attribute, the #' + fail + ' element didn\'t get the attribute "foo"');

		ok(theLibrary('#foo').attr('width', null), 'Try to set an attribute to nothing');

		theLibrary('#name').attr('name', 'something');
		equal(theLibrary('#name').attr('name'), 'something', 'Set name attribute');

		theLibrary('#name').attr('maxlength', '5');
		equal(document.getElementById('name').maxLength, 5, 'Set maxlength attribute');
		theLibrary('#name').attr('maxLength', '10');
		equal(document.getElementById('name').maxLength, 10, 'Set maxlength attribute');

		equal(theLibrary('#text1').attr('aria-disabled', false).attr('aria-disabled'), 'false', 'Set aria attribute to string');

		theLibrary('#foo').attr('contenteditable', true);
		equal(theLibrary('#foo').attr('contenteditable'), 'true', 'Enumerated attributes are set properly');


		var table = theLibrary('#table1'), td = theLibrary('td', table).first();
		td.attr('rowspan', '2');
		equal(td[0].rowSpan, 2, 'Check rowspan is correctly set');
		td.attr('colspan', '2');
		equal(td[0].colSpan, 2, 'Check colspan is correctly set');
		table.attr('cellspacing', '2');
		equal(table[0].cellSpacing, '2', 'Check cellspacing is correctly set');

		equal(theLibrary('#area1').attr('value'), 'foobar', 'Value attribute retrieves the attributes, not the property.');


		theLibrary('#name').attr('someAttr', '0');
		equal(theLibrary('#name').attr('someAttr'), '0', 'Set attribute to a string of "0"');
		theLibrary('#name').attr('someAttr', 0);
		equal(theLibrary('#name').attr('someAttr'), '0', 'Set attribute to the number 0');
		theLibrary('#name').attr('someAttr', 1);
		equal(theLibrary('#name').attr('someAttr'), '1', 'Set attribute to the number 1');
	});

	test("removeAttr()", 5, function () {
		equal(theLibrary('#mark').removeAttr('class')[0].className, '', 'remove class');
		equal(theLibrary('#form1').removeAttr('id').attr('id'), null, 'Remove id');

		theLibrary('#foo, #table1, #text1').each(function (node, key, list) {
			var $node = theLibrary(node).removeAttr('id');
			equal($node.attr('id'), null, 'Remove id');
		});
	});

}());