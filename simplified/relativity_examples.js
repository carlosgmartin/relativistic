var cos = Math.cos;
var sin = Math.sin;
var cosh = Math.cosh;
var sinh = Math.sinh;

var zero_vector = [0, 0, 0, 0];

var identity_matrix = [[1, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [0, 0, 0, 1]];

/* Sum of vectors */
function vector_sum(vector1, vector2)
{
    var result = [];
    for (var i = vector1.length - 1; i >= 0; --i)
    {
        result[i] = vector1[i] + vector2[i];
    }
    return result;
}

/* Inner product of vectors */
function vector_inner(vector1, vector2)
{
    var result = vector1[0] * vector2[0];
    for (var i = vector1.length - 1; i >= 1; --i)
    {
        result -= vector1[i] * vector2[i];
    }
    return result;
}

/* Vector equality */
function vector_equals(vector1, vector2)
{
    if (vector1.length !== vector2.length)
    {
        return false;
    }
    for (var i = vector1.length - 1; i >= 0; --i)
    {
        if (vector1[i] !== vector2[i])
        {
            return false;
        }
    }
    return true;
}

/* Matrix equality */
function matrix_equals(matrix1, matrix2)
{
    if (matrix1.length !== matrix2.length)
    {
        return false;
    }
    for (var i = matrix1.length - 1; i >= 0; --i)
    {
        if (matrix1[i].length !== matrix2[i].length)
        {
            return false;
        }
        for (var j = matrix1[i].length - 1; j >= 0; --j)
        {
            if (matrix1[i][j] !== matrix2[i][j])
            {
                return false;
            }
        }
    }
    return true;
}

/* Matrix-matrix multiplication */
function matrix_product(matrix1, matrix2)
{
    var result = [];
    for (var i = matrix1.length - 1; i >= 0; --i)
    {
        result[i] = [];
        for (var j = matrix2[0].length - 1; j >= 0; --j)
        {
            result[i][j] = 0;
            for (var k = matrix1[0].length - 1; k >= 0; --k)
            {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }
    return result;
}
function matrix_product_test()
{
    var matrix1 = [[1, 3, 5, 7],
                   [2, 4, 6, 8]];
    var matrix2 = [[1, 8, 9 ],
                   [2, 7, 10],
                   [3, 6, 11],
                   [4, 5, 12]];
    var matrix3 = [[50, 94 , 178],
                   [60, 120, 220]];
    return matrix_equals(matrix_product(matrix1, matrix2), matrix3);
}

/* Matrix-vector multiplication */
function vector_product(matrix, vector)
{
    var result = [];
    for (var i = matrix.length - 1; i >= 0; --i)
    {
        result[i] = 0;
        for (var j = matrix[i].length - 1; j >= 0; --j)
        {
            result[i] += matrix[i][j] * vector[j];
        }
    }
    return result;
}
function vector_product_test()
{
    return vector_product([[4,5,6],[7,8,9]],[1,2,3]) === [32, 50];
}

/* Boost in the x direction */
function transformation_01(theta)
{
    var x = cosh(theta);
    var y = sinh(theta);
    return [[x, y, 0, 0],
            [y, x, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]];
}

/* Boost in the y direction */
function transformation_02(theta)
{
    var x = cosh(theta);
    var y = sinh(theta);
    return [[x, 0, y, 0],
            [0, 1, 0, 0],
            [y, 0, x, 0],
            [0, 0, 0, 1]];
}

/* Boost in the z direction */
function transformation_03(theta)
{
    var x = cosh(theta);
    var y = sinh(theta);
    return [[x, 0, 0, y],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [y, 0, 0, x]];
}

/* Rotation in the x-y plane */
function transformation_12(theta)
{
    var x = cos(theta);
    var y = sin(theta);
    return [[1, 0, 0 , 0 ],
            [0, x, -y, 0 ],
            [0, y,  x,  0],
            [0, 0, 0 , 1]];
}

/* Rotation in the x-z plane */
function transformation_13(theta)
{
    var x = cos(theta);
    var y = sin(theta);
    return [[1, 0, 0, 0 ],
            [0, x, 0, -y],
            [0, 0, 1, 0 ],
            [0, y, 0,  x]];
}

/* Rotation in the y-z plane */
function transformation_23(theta)
{
    var x = cos(theta);
    var y = sin(theta);
    return [[1, 0, 0, 0 ],
            [0, 1, 0, 0 ],
            [0, 0, x, -y],
            [0, 0, y,  x]];
}

/* Find coordinates of a vector in a reference frame */
function vector_coordinates(frame, vector)
{
    return vector_sum(frame.translation, vector_product(frame.transformation, vector));
}
function vector_coordinates_test()
{
    var frame = {
        translation: zero_vector,
        transformation: identity_matrix
    };
    var vector = [1, 2, 3, 4];
    return vector_equals(vector_coordinates(frame, vector), [1, 2, 3, 4]);
}









/* Find the sum of 2 tensors */
function sum(tensor1, tensor2)
{
    var result = [];
    for (var i = tensor1.length - 1; i >= 0; --i)
    {
        result[i] = [];
        for (var j = tensor1[i].length - 1; j >= 0; --j)
        {
            result[i][j] = tensor1[i][j] + tensor2[i][j];
        }
    }
    return result;
}








/* Find solution to |a + bt| = 0 */
function find_null(a, b)
{
    var aa = inner(a, a);
    var ab = inner(a, b);
    var bb = inner(b, b);
    var t1 = (-ab + sqrt(ab * ab - aa * bb)) / bb;
    var t2 = (-ab - sqrt(ab * ab - aa * bb)) / bb;
    return sum(a, scale(b, t1));
}

/* Find components of a tensor in a reference frame */
function find_components(frame, tensor)
{
    return product(tensor, frame.orientation);
}

/* Find coordinates of a point in a reference frame */
function find_coordinates(frame, point)
{
    return find_components(frame, difference(point, frame.position));
}





/* Compose 2 Lorentz transformations */
function compose(transformation1, transformation2)
{

}

/* Transform a vector according to a Lorentz transformation */
function transform(vector, transformation)
{

}








frame.transformation = compose(frame.transformation, transformation_03);









function apply(transformation, vector)
{
    var result = [];
    for (var i = 0; i < dimensions; ++i)
    {
        result[i] = 0;
        for (var )
    }
}









/* Compose 2 Lorentz transforms */
function compose(transform1, transform2)
{
    var result = [];
    for (var i3 = 0; i3 < dimensions; ++i3)
    {
        result[i3] = 0;
        for (var i1 = 0; i1 < dimensions; ++i1)
        {
            result[i3][i1] = 0;
            for (var i2 = 0; i2 < dimensions; ++i2)
            {
                result[i3][i1] = transform1[i3][i2] * transform2[i2][i1];
            }
        }
    }
    return result;
}

/* Apply a Lorentz transformation to a vector */
function apply(transformation, vector)
{
    var result = [];
    for (var after = 0; after < dimensions; ++after)
    {
        result[after] = 0;
        for (var before = 0; before < dimensions; ++before)
        {
            result[after] = transformation[after][before] * vector[before];
        }
    }
    return result;
}

function apply2(transformation, vector)
{

}






function apply(transformation, tensor)
{
    var result = [];
    for (var i1 = 0; i1 < dimensions; ++i1)
    {
        result[i1] = [];
        for (var i2 = 0; i2 < dimensions; ++i2)
        {
            result[i1][i2] = [];
            for (var i3 = 0; i3 < dimensions; ++i3)
            {
                result[i1][i2][i3] = 0;
                
            }
        }
    }
}











/* Composition of 2 Lorentz transformations */
function compose(transform1, transform2) {}

/* Application of a Lorentz transformation to a vector */
function apply(transform, vector) {}

/* Inner product of 2 vectors */
function inner(vector1, vector2) {}

/* Sum of 2 vectors */
function sum(vector1, vector2) {}

/* Scale a vector */
function scale(vector, scalar) {}

























