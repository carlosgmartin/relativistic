var math = {
	tau: 2 * Math.PI,
	cos: Math.cos,
	sin: Math.sin,
	cosh: Math.cosh,
	sinh: Math.sinh,
	add: function (vector1, vector2)
	{
		var result = [];
		for (var i = 0; i < vector1.length; ++i)
		{
			result[i] = vector1[i] + vector2[i];
		}
		return result;
	},
	subtract: function (vector1, vector2)
	{
		var result = [];
		for (var i = 0; i < vector1.length; ++i)
		{
			result[i] = vector1[i] - vector2[i];
		}
		return result;
	},
	scale: function (vector, scalar)
	{
		var result = [];
		for (var i = 0; i < vector.length; ++i)
		{
			result[i] = vector[i] * scalar;
		}
		return result;
	},
	inner: function (vector1, vector2)
	{
		var result = vector1[0] * vector2[0];
		for (var component = 1; component < vector1.length; ++component)
		{
			result -= vector1[component] * vector2[component];
		}
		return result;
	},
	project: function (vector1, vector2)
	{
		return scale(vector2, inner(vector1, vector2));
	}
};




