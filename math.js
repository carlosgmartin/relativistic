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
	rotate: function (vector, direction1, direction2, angle)
	{
		var component1 = math.inner(vector, direction1);
		var component2 = math.inner(vector, direction2);
		var vector1 = math.scale(direction1, component1);
		var vector2 = math.scale(direction2, component2);
		var vector_fixed = math.subtract(vector, math.add(vector1, vector2));
		var component1_rotated = component1 * math.cos(angle) - component2 * math.sin(angle);
		var component2_rotated = component1 * math.sin(angle) + component2 * math.cos(angle);
		var vector1_rotated = math.scale(direction1, component1_rotated);
		var vector2_rotated = math.scale(direction2, component2_rotated);
		var vector_rotated = math.add(vector1_rotated, vector2_rotated);
		return math.add(vector_rotated, vector_fixed);
	}
};

