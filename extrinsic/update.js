/* Defines positions and directions of geodesics */
var geodesics = [];
for (var x = -10; x <= 10; x += .5)
{
    for (var y = -10; y <= 10; y += .5)
    {
        geodesics.push({
            position: [0, x, y, 0],
            direction: [1, 0, 0, 0]
        });
    }
}

/* Defines our frame of reference */
var frame = {
    position: zero_vector,
    orientation: identity_matrix
};

/* Define rapidity for boosts */
var rapidity = .01;

/* Define angle for rotations */
var angle = .01;

/* Define timestep for time translations */
var timestep = .1;

function update()
{
    frame.position = add(frame.position, scale(frame.orientation[0], timestep));

    if (keys[key_w])
    {
        frame.orientation = compose(transform_02(-rapidity), frame.orientation);
    }
    if (keys[key_a])
    {
        frame.orientation = compose(transform_01(-rapidity), frame.orientation);
    }
    if (keys[key_s])
    {
        frame.orientation = compose(transform_02(rapidity), frame.orientation);
    }
    if (keys[key_d])
    {
        frame.orientation = compose(transform_01(rapidity), frame.orientation);
    }
    if (keys[key_q])
    {
        frame.orientation = compose(transform_12(angle), frame.orientation);
    }
    if (keys[key_e])
    {
        frame.orientation = compose(transform_12(-angle), frame.orientation);
    }

    requestAnimationFrame(render);
}

/* Define frames per second for updates */
var fps = 60;
setInterval(update, 1000 / fps);