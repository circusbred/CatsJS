/*global pindexOf, Library, ptrim, rtrim */
/*global indexOf: true, trim: true */


if (!pindexOf) {
	// Checks if an item is within an array
	indexOf = Library.indexOf = function (array, searchElement, fromIndex) {

		var i,
			length = array.length;

		for (i = fromIndex ? fromIndex < 0 ? Math.max(0, length + fromIndex) : fromIndex : 0; i < length; i += 1) {
			if (array[i] === searchElement) {
				return i;
			}
		}
		return -1;
	};
}

if (!ptrim) {
	trim = Library.trim = function (str) {
		return str.replace(rtrim, '');
	};

}