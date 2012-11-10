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

	module("traversing", {
		setup: function () {
			document.getElementById('qunit-fixture').innerHTML = fixtureHTML;
		}
	});

	test("slice()", function () {
		expect(2);
		deepEqual(theLibrary('.list').slice(1, 3).toArray(), q('listTwo', 'listThree'), 'Slice correctly slices selection');
		deepEqual(theLibrary('.list').slice(-1).toArray(), q('listFiveDiv'), 'Negative index retrieves last element');
	});

	test("first()", function () {
		expect(1);
		deepEqual(theLibrary('.list').first().toArray(), q('listOne'), 'First correctly retrieves the first');
	});

	test("eq()", function () {
		expect(2);
		deepEqual(theLibrary('.list').eq(2).toArray(), q('listThree'), 'EQ correctly retreives zero-indexed element');
		deepEqual(theLibrary('.list').eq(-1).toArray(), q('listFiveDiv'), 'EQ correctly retreives zero-indexed element with -1');
	});

	test("find()", function () {
		expect(7);

		var $list = theLibrary('#unorderedList');
		deepEqual($list.find('.list').toArray(), q('listOne', 'listTwo', 'listThree'), 'Find the list items within one ul');
		deepEqual($list.find('li').toArray(), q('listOne', 'listTwo', 'listThree', 'listFour'), 'Find all lis within the ul');
		deepEqual($list.find('#listOne').toArray(), q('listOne'), 'Finding with ID is ok');
		deepEqual($list.find('notthere').toArray(), [], 'No elements found');
		deepEqual($list.find(undefined).toArray(), [], 'Passing undefined');
		equal(theLibrary('#table1').find('tr').length, 3, 'trs within a table');

		deepEqual(theLibrary('#container, #foo').find('p').toArray(), q('firstp', 'sndp', 'en', 'sap', 'lastp'), 'Find all p\'s within container and foo. Remove dups.');
	});

	test("filter()", function () {
		expect(11);

		var $list = theLibrary('.list'),
			$filtered = $list.filter(function (node, i) {
				deepEqual(this, node, 'Context is set to the node and node is passed as the first argument');
				equal(typeof i, 'number', 'index is passed as second argument');
				return this.id === 'listFiveDiv';
			});
		deepEqual($filtered.toArray(), q('listFiveDiv'), '.list elements properly filtered to contain only the #listFiveDiv');

		$filtered = $list.filter(function (node, i) {
			return node.id !== 'listFiveDiv' && i !== 1;
		});

		deepEqual($filtered.toArray(), q('listOne', 'listThree'), '.list elements filtered to contain 1, 3, and 4');

		$filtered = theLibrary('input', '#container').filter(function () {
			return this.type === 'checkbox';
		});
		deepEqual($filtered.toArray(), q('check1'), 'Filter inputs by type to get the checkbox');
	});


}());