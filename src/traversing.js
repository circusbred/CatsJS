/**
 * Traversing
 */
proto.slice = function (start, end) {
	'use strict';

	return new minimal(slice.apply(toArray(this), arguments));
};
proto.first = function () {
	'use strict';

	return this.slice(0, 1);
};
proto.eq = function (index) {
	'use strict';

	return ~ (index = +index) ? this.slice(index, index + 1) : this.slice(index);
};
proto.find = function (selector) {
	'use strict';

	var node, sel, j, el, i = 0,
		ret = [];
	for (; node = this[i]; i++) {
		sel = queryAll(selector, rid.test(selector) ? document : node);
		for (j = 0; el = sel[j]; j++) {
			if (!~indexOf(ret, el)) {
				ret.push(el);
			}
		}
	}
	return new minimal(ret);
};
proto.filter = function (fn) {
	'use strict';

	var node, ret = [],
		i = 0;
	for (; node = this[i]; i++) {
		if (fn.call(node, node, i)) {
			ret.push(node);
		}
	}
	return new minimal(ret);
};