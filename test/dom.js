/*jslint browser:true*/
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

		fixture.innerHTML = '';
		equal($fixture.html(), '', 'should return an empty string when there is not innerHTML');

		$fixture = theLibrary('#cats-and-dogs-and-smurfs-and-things-not-real');
		equal($fixture.html(), '', 'should return an empty string on missing elements');

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

		equal($paragraphs.remove(), undefined, 'should not be chainable');

		equal($fixture.find('p').length, 0, 'should remove each member of a collection');
	});


	test('library#append', function () {

		var index,
			div = document.createElement('div'),
			$fixture = theLibrary(fixture),
			paragraphs = '<p>cats1</p>' +
							'<p>cats2</p>' +
							'<p>cats3</p>' +
							'<p>cats4</p>' +
							'<p>cats5</p>' +
							'<p>cats6</p>' +
							'<p>cats7</p>';

		div.className = 'cats';
		div.innerHTML = 'dogs';

		$fixture.append('<div>cats</div>');
		equal($fixture.find('div')[0].innerHTML, 'cats', 'should insert strings correctly');
		$fixture.html('');

		$fixture.append(div);

		equal($fixture.find('div')[0], div, 'should add nodes correctly');

		$fixture.append(paragraphs);

		equal($fixture.find('p').length, 7, 'should append strings correctly');

		$fixture.html('').append(div);

		paragraphs = [];
		for (index = 0; index < 7; index += 1) {
			paragraphs[index] = document.createElement('p');
			paragraphs[index].innerHTML = 'cats' + index.toString();
		}

		$fixture.append(paragraphs);

		// should have 7 paragraphs
		equal($fixture.find('p').length, 7, 'should append lists correctly');

		// should insert in correct order
		for (index = 0; index < 8; index += 1) {

			if (index === 0) {

				equal($fixture[0].childNodes[index], div, 'div should be the first');

			} else {

				equal($fixture[0].childNodes[index], paragraphs[index - 1], 'should maintain list order');

			}

		}

	});

	test('library#prepend', function () {
		var index,
			div = document.createElement('div'),
			$fixture = theLibrary(fixture),
			paragraphs = '<p>cats1</p>' +
							'<p>cats2</p>' +
							'<p>cats3</p>' +
							'<p>cats4</p>' +
							'<p>cats5</p>' +
							'<p>cats6</p>' +
							'<p>cats7</p>';

		div.className = 'cats';
		div.innerHTML = 'dogs';

		$fixture.prepend('<div>cats</div>');
		equal($fixture.find('div')[0].innerHTML, 'cats', 'should insert strings correctly');
		$fixture.html('');

		$fixture.prepend(div);

		equal($fixture.find('div')[0], div, 'should add nodes correctly');

		$fixture.prepend(paragraphs);

		equal($fixture.find('p').length, 7, 'should append strings correctly');
		$fixture.html('');

		paragraphs = [];
		// make a bunch of paragraphs
		for (index = 0; index < 7; index += 1) {
			paragraphs[index] = document.createElement('p');
			paragraphs[index].innerHTML = 'cats' + index.toString();
		}

		// add a child to the fixture
		$fixture.append(div);

		// add the paragraphs
		$fixture.prepend(paragraphs);

		// should have 7 paragraphs
		equal($fixture.find('p').length, 7, 'should append lists correctly');

		// last child should be the div
		equal($fixture[0].lastChild, div, 'div should be the last child');

		// should insert in correct order
		for (index = 0; index < 7; index += 1) {
			equal($fixture[0].childNodes[index], paragraphs[index], 'should maintain list order');
		}

	});

}());