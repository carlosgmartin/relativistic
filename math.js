var math = {
	tau: 2 * Math.PI,
	cos: Math.cos,
	sin: Math.sin,
	cosh: Math.cosh,
	sinh: Math.sinh,
	sqrt: Math.sqrt,
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
	},
	square: function (x)
	{
		return x * x;
	},
	product: function(matrix, vector)
	{
		var result = [];
		for (var i = 0; i < matrix.length; ++i)
		{
			result[i] = 0;
			for (var j = 0; j < vector.length; ++j)
			{
				result[i] += matrix[i][j] * vector[j];
			}
		}
		return result;
	},
	boost: function (vector, direction1, direction2, angle)
	{
		var component1 = math.inner(vector, direction1);
		var component2 = -math.inner(vector, direction2); // minus sign fixes bug, covariant vs. contravariant?
		var vector1 = math.scale(direction1, component1);
		var vector2 = math.scale(direction2, component2);
		var vector_fixed = math.subtract(vector, math.add(vector1, vector2));
		var component1_rotated = component1 * math.cosh(angle) + component2 * math.sinh(angle);
		var component2_rotated = component1 * math.sinh(angle) + component2 * math.cosh(angle);
		var vector1_rotated = math.scale(direction1, component1_rotated);
		var vector2_rotated = math.scale(direction2, component2_rotated);
		var vector_rotated = math.add(vector1_rotated, vector2_rotated);
		return math.add(vector_rotated, vector_fixed);
	},
	boost_alternative: function (vector, timelike, spacelike, rapidity)
	{
		var direction = Math.atan2(spacelike[2], spacelike[1]);
		var beta = Math.tanh(rapidity);
		var beta_x = beta * Math.cos(direction);
		var beta_y = beta * Math.sin(direction);
		var beta_squared = beta_x * beta_x + beta_y * beta_y;
		if (beta_squared == 0)
		{
			return vector;
		}
		var gamma = 1 / Math.sqrt(1 - beta_squared);
		var boost_matrix = [
			[gamma, -gamma*beta_x, -gamma*beta_y],
			[-gamma*beta_x,1+(gamma-1)*beta_x*beta_x/beta_squared,(gamma-1)*beta_x*beta_y/beta_squared],
			[-gamma*beta_y,(gamma-1)*beta_y*beta_x/beta_squared,1+(gamma-1)*beta_y*beta_y/beta_squared]
		];
		return math.product(boost_matrix, vector);
	}
};

