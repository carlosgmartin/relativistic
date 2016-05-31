/* Boost in the x direction */
function transform_01(theta)
{
    var x = Math.cosh(theta);
    var y = Math.sinh(theta);
    return [[x, y, 0, 0],
            [y, x, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]];
}

/* Boost in the y direction */
function transform_02(theta)
{
    var x = Math.cosh(theta);
    var y = Math.sinh(theta);
    return [[x, 0, y, 0],
            [0, 1, 0, 0],
            [y, 0, x, 0],
            [0, 0, 0, 1]];
}

/* Boost in the z direction */
function transform_03(theta)
{
    var x = Math.cosh(theta);
    var y = Math.sinh(theta);
    return [[x, 0, 0, y],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [y, 0, 0, x]];
}

/* Rotation in the x-y plane */
function transform_12(theta)
{
    var x = Math.cos(theta);
    var y = Math.sin(theta);
    return [[1, 0, 0 , 0 ],
            [0, x, -y, 0 ],
            [0, y,  x, 0 ],
            [0, 0, 0 , 1]];
}

/* Rotation in the x-z plane */
function transform_13(theta)
{
    var x = Math.cos(theta);
    var y = Math.sin(theta);
    return [[1, 0, 0,  0],
            [0, x, 0, -y],
            [0, 0, 1,  0],
            [0, y, 0,  x]];
}

/* Rotation in the y-z plane */
function transform_23(theta)
{
    var x = Math.cos(theta);
    var y = Math.sin(theta);
    return [[1, 0, 0,  0],
            [0, 1, 0,  0],
            [0, 0, x, -y],
            [0, 0, y,  x]];
}