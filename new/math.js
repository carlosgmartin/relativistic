// Provides math helper functions

"use strict";

// Find inner product of two four-vectors
function inner(vector, vector2)
{
	var result = vector[0] * vector2[0];
	for (var component = 1; component < vector.length; ++component)
	{
		result -= vector[component] * vector2[component];
	}
	return result;
}

// Add two vectors
function add(vector, vector2)
{
	var result = [];
	for (var i = 0; i < vector.length; ++i) {
		result[i] = vector[i] + vector2[i];
	}
	return result;
}

// Subtract two vectors
function subtract(vector, vector2)
{
	var result = [];
	for (var i = 0; i < vector.length; ++i) {
		result[i] = vector[i] - vector2[i];
	}
	return result;
}

// Scale a vector
function scale(vector, scalar)
{
	var result = [];
	for (var i = 0; i < vector.length; ++i) {
		result[i] = vector[i] * scalar;
	}
	return result;
}

// Boost a vector by a rapidity in the spacelike direction (direction2)
function boost(vector, direction1, direction2, angle)
{
	var component1 = inner(vector, direction1);
	var component2 = -inner(vector, direction2);
	var vector1 = scale(direction1, component1);
	var vector2 = scale(direction2, component2);
	var vector_fixed = subtract(vector, add(vector1, vector2));
	var component1_rotated = component1 * Math.cosh(angle) + component2 * Math.sinh(angle);
	var component2_rotated = component1 * Math.sinh(angle) + component2 * Math.cosh(angle);
	var vector1_rotated = scale(direction1, component1_rotated);
	var vector2_rotated = scale(direction2, component2_rotated);
	var vector_rotated = add(vector1_rotated, vector2_rotated);
	return add(vector_rotated, vector_fixed);
}

// Rotate a vector by an angle in the plane spanned by two spacelike directions
function rotate(vector, direction1, direction2, angle)
{
	var component1 = -inner(vector, direction1);
	var component2 = -inner(vector, direction2);
	var vector1 = scale(direction1, component1);
	var vector2 = scale(direction2, component2);
	var vector_fixed = subtract(vector, add(vector1, vector2));
	var component1_rotated = component1 * Math.cos(angle) - component2 * Math.sin(angle);
	var component2_rotated = component1 * Math.sin(angle) + component2 * Math.cos(angle);
	var vector1_rotated = scale(direction1, component1_rotated);
	var vector2_rotated = scale(direction2, component2_rotated);
	var vector_rotated = add(vector1_rotated, vector2_rotated);
	return add(vector_rotated, vector_fixed);
}
