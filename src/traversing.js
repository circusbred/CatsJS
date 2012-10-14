/*global proto, Library, slice, toArray, queryAll, rid, indexOf */
/*jslint browser: true */
proto.slice = function () {
	'use strict';

	return new Library(slice.apply(toArray(this), arguments));
};
proto.first = function () {
	'use strict';

	return this.slice(0, 1);
};
proto.eq = function (index) {
	'use strict';

	return (index = +index) !== -1 ? this.slice(index, index + 1) : this.slice(index);
};
proto.find = function (selector) {
	'use strict';

	var sel, j, el, i, l, l2,
		ret = [];
	for (i = 0, l = this.length; i < l; i += 1) {
		sel = queryAll(selector, rid.test(selector) ? document : this[i]);
		for (j = 0, l2 = sel.length; j < l2; j += 1) {
			el = sel[j];
			if (indexOf(ret, el) === -1) {
				ret.push(el);
			}
		}
	}
	return new Library(ret);
};
proto.filter = function (fn) {
	'use strict';

	var node, i, l, ret = [];
	for (i = 0, l = this.length; i < l; i += 1) {
		node = this[i];
		if (fn.call(node, node, i)) {
			ret.push(node);
		}
	}
	return new Library(ret);
};