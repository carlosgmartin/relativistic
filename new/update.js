// Handles initialization and updating

"use strict";

var fps = 60;
var rapidity = .02;
var timestep = 3;
var zoom = 1;

var observer = {
	position: [0, 0, 0],
	t_axis: [1, 0, 0],
	x_axis: [0, 1, 0],
	y_axis: [0, 0, 1],
	rapidity_x: 0,
	rapidity_y: 0
};

// Positions (points) and directions (vectors) of geodesics
var positions = [];
var directions = [];
for (var x = -10; x <= 10; x += 1) {
	for (var y = -10; y <= 10; y += 1) {
		positions.push([0, x, y]);
		directions.push([1, 0, 0]);
	}
}

// Update loop
function update()
{
	// Move observer forward through time
	observer.position = add(observer.position, scale(observer.t_axis, timestep));

	/*
	// Boost right
	if (keys[key_d]) {
		var direction1 = observer.t_axis;
		var direction2 = observer.x_axis;
		observer.t_axis = boost(observer.t_axis, direction1, direction2, rapidity);
		observer.x_axis = boost(observer.x_axis, direction1, direction2, rapidity);
		observer.y_axis = boost(observer.y_axis, direction1, direction2, rapidity);
	}
	if (keys[key_a]) {
		// Boost left
		var direction1 = observer.t_axis;
		var direction2 = observer.x_axis;
		observer.t_axis = boost(observer.t_axis, direction1, direction2, -rapidity);
		observer.x_axis = boost(observer.x_axis, direction1, direction2, -rapidity);
		observer.y_axis = boost(observer.y_axis, direction1, direction2, -rapidity);
	}
	if (keys[key_w]) {
		// Boost up
		var direction1 = observer.t_axis;
		var direction2 = observer.y_axis;
		observer.t_axis = boost(observer.t_axis, direction1, direction2, -rapidity);
		observer.x_axis = boost(observer.x_axis, direction1, direction2, -rapidity);
		observer.y_axis = boost(observer.y_axis, direction1, direction2, -rapidity);

	}
	if (keys[key_s]) {
		// Boost down
		var direction1 = observer.t_axis;
		var direction2 = observer.y_axis;
		observer.t_axis = boost(observer.t_axis, direction1, direction2, rapidity);
		observer.x_axis = boost(observer.x_axis, direction1, direction2, rapidity);
		observer.y_axis = boost(observer.y_axis, direction1, direction2, rapidity);
	}
	*/

	if (mouse_down) {
		observer.rapidity_x = (mouse_end_x - mouse_start_x) / 100000;
		observer.rapidity_y = (mouse_end_y - mouse_start_y) / 100000;
	}
	else {
		observer.rapidity_x = 0;
		observer.rapidity_y = 0;
	}

	var direction1 = observer.t_axis;
	var direction2 = add(scale(observer.x_axis, observer.rapidity_x), scale(observer.y_axis, observer.rapidity_y));
	var rapidity = Math.sqrt(-inner(direction2, direction2));
	if (rapidity > 0)
	{
		direction2 = scale(direction2, 1 / rapidity);
	}
	observer.t_axis = boost(observer.t_axis, direction1, direction2, rapidity);
	observer.x_axis = boost(observer.x_axis, direction1, direction2, rapidity);
	observer.y_axis = boost(observer.y_axis, direction1, direction2, rapidity);

	requestAnimationFrame(render);
}

setInterval(update, 1000 / fps);