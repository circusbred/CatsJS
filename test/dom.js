/*global module, test, theLibrary, equal*/
(function () {
	'use strict';

	var fixture;

	module('dom', {
		setup: function () {
			fixture = document.getElementById('qunit-fixture');
		}
	});

	test('library#html', function () {

		var $fixture = theLibrary(fixture),
			expected = '<p>cats</p>';

		$fixture.html(expected);
		equal(fixture.innerHTML, expected, 'should set innerHTML correctly');

		equal($fixture.html(), expected, 'should get innerHTML correctly');

	});


	test('library#remove', function () {

		var $paragraphs,
			$fixture = theLibrary(fixture),
			paragraphs = '<p>cats1</p>' +
							'<p>cats2</p>' +
							'<p>cats3</p>' +
							'<p>cats4</p>' +
							'<p>cats5</p>' +
							'<p>cats6</p>' +
							'<p>cats7</p>';

		$fixture.html(paragraphs);

		$paragraphs = $fixture.find('p');

		$paragraphs.remove();

		equal($fixture.find('p').length, 0, 'should remove each member of a collection');
	});


	test('library#append', function () {

		var index,
			$fixture = theLibrary(fixture),
			paragraphs = '<p>cats1</p>' +
							'<p>cats2</p>' +
							'<p>cats3</p>' +
							'<p>cats4</p>' +
							'<p>cats5</p>' +
							'<p>cats6</p>' +
							'<p>cats7</p>';

		$fixture.append(paragraphs);

		equal($fixture.find('p').length, 7, 'should append strings correctly');
		$fixture.html('');

		paragraphs = [];
		for (index = 0; index < 7; index += 1) {
			paragraphs[index] = document.createElement('p');
			paragraphs[index].innerHTML = 'cats' + index.toString();
		}

		$fixture.append(paragraphs);
		equal($fixture.find('p').length, 7, 'should append lists correctly');

	});

/*
	test('library#prepend', function () {

	});
*/
}());