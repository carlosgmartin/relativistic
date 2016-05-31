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
        /*
        geodesics.push({
            position: [0, x, y, 0],
            direction: [1, .5, 0, 0]
        });
        */
    }
}

/* Defines our frame of reference */
var frame = {
    position: zero_vector,
    orientation: identity_matrix
};

/* Define rapidity for boosts */
var rapidity = .005;

/* Define angle for rotations */
var angle = .01;

/* Define timestep for time translations */
var timestep = .1;

/* Define frames per second for updates */
var fps = 60;

var smoothing = 50;
var elapsed_time = 1000 / fps;
var previous_time = new Date;
function update()
{
    var current_time = new Date;
    elapsed_time += (current_time - previous_time - elapsed_time) / smoothing;
    previous_time = current_time;
    var measured_fps = 1000 / elapsed_time;
    console.log(measured_fps.toFixed(0));

    /* Update position of the observer in spacetime according to its own time axis */
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

setInterval(update, 1000 / fps);