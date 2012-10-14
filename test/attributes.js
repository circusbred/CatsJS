/*global QUnit, module, test, equal, strictEqual, theLibrary, expect, document, ok */
/*jslint vars:true */
(function () {
	'use strict';

	module("attributes");

	test("attr([string])", function () {
		expect(30);

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

		QUnit.reset();
		equal(theLibrary('#form1').attr('class'), 'classOnForm', 'Retrieve the class attribute on a form.');

		equal(theLibrary('#mark').attr('onclick'), 'something()', 'Retrieve ^on attribute without anonymous function wrapper.');

		equal(theLibrary().attr("doesntexist"), null, "Make sure null is returned when no element is there.");

		strictEqual(theLibrary('#firstp').attr('nonexisting'), null, 'attr works correctly for non existing attributes');
	});


	test("attr()", function () {
		expect(17);

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

		for (i = 0; i < elems.length; i += 1) {
			$elem = theLibrary(elems[i]);
			$elem.attr('nonexisting', 'foo');
			strictEqual($elem.attr('nonexisting'), null, 'attr works correctly on comment and text nodes');
		}


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

	test("removeAttr()", function () {
		expect(5);
		equal(theLibrary('#mark').removeAttr('class')[0].className, '', 'remove class');
		equal(theLibrary('#form1').removeAttr('id').attr('id'), null, 'Remove id');

		theLibrary('#foo, #table1, #text1').each(function (node, key, list) {
			var $node = theLibrary(node).removeAttr('id');
			equal($node.attr('id'), null, 'Remove id');
		});
	});

}());