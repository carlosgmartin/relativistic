/* Adds 2 vectors */
function add(vector, vector2)
{
	var result = [];
	for (var i = vector.length - 1; i >= 0; --i)
	{
		result[i] = vector[i] + vector2[i];
	}
	return result;
}

/* Subtracts 2 vectors */
function subtract(vector, vector2)
{
	var result = [];
	for (var i = vector.length - 1; i >= 0; --i)
	{
		result[i] = vector[i] - vector2[i];
	}
	return result;
}

/* Scales a vector */
function scale(vector, scalar)
{
	var result = [];
	for (var i = vector.length - 1; i >= 0; --i)
	{
		result[i] = vector[i] * scalar;
	}
	return result;
}

/* Find the inner product of 2 vectors */
function inner(vector, vector2)
{
	var result = vector[0] * vector2[0];
	for (var i = vector.length - 1; i >= 1; --i)
	{
		result -= vector[i] * vector2[i];
	}
	return result;
}

/* Composes 2 Lorentz transforms */
function compose(transform, transform2)
{
    var result = [];
    for (var i3 = transform.length - 1; i3 >= 0; --i3)
    {
        result[i3] = 0;
        for (var i1 = transform.length - 1; i1 >= 0; --i1)
        {
            result[i3][i1] = 0;
            for (var i2 = transform.length - 1; i2 >= 0; --i2)
            {
                result[i3][i1] = transform[i3][i2] * transform2[i2][i1];
            }
        }
    }
    return result;
}

/* Applies a Lorentz transform to a vector */
function apply(transform, vector)
{
    var result = [];
    for (var i2 = vector.length - 1; i2 >= 0; --i2)
    {
        result[i2] = 0;
        for (var i1 = vector.length - 1; i1 >= 0; --i1)
        {
            result[i2] = transform[i2][i1] * vector[i1];
        }
    }
    return result;
}

/* Find the components of a vector in a reference frame */
function get_components(frame, vector)
{
	return apply(frame.orientation, vector);
}

/* Find coordinates of a point in a reference frame */
function get_coordinates(frame, point)
{
	return get_components(frame, subtract(point, frame.position));
}

/* Find solution to |a + bt| = 0 */
function get_null(a, b)
{
    var aa = inner(a, a);
    var ab = inner(a, b);
    var bb = inner(b, b);
    var t1 = (-ab + sqrt(ab * ab - aa * bb)) / bb;
    var t2 = (-ab - sqrt(ab * ab - aa * bb)) / bb;
    return sum(a, scale(b, t1));
}