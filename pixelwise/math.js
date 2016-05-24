var math = {
	add: function (vector, vector2) {
		var result = [];
		for (var i = 0; i < vector.length; ++i) {
			result[i] = vector[i] + vector2[i];
		}
		return result;
	},
	scale: function (vector, scalar) {
		var result = [];
		for (var i = 0; i < vector.length; ++i) {
			result[i] = vector[i] * scalar;
		}
		return result;
	}
};