var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var zoom = 1;

function render()
{
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);

	/* Render stationary background image */
	render_background();

	context.save();
	context.translate(canvas.width / 2, canvas.height / 2);
	context.scale(1 / zoom, 1 / zoom);

	context.fillStyle = 'red';

	/* Cache variables */
	var vector = zero_vector;
	var frame_position = frame.position;
	var sqrt = Math.sqrt;
	var sin = Math.sin;
	for (var i = geodesics.length - 1; i >= 0; --i)
	{
		// var displacement = get_null(subtract(geodesics[i].position, frame.position), geodesics[i].direction);
		/* Find the intersection of the geodesic with our past light cone */
		// var position = add(frame.position, displacement);
		/* Find the proper time of this point on the geodesic */
		// var proper_time = norm(subtract(position, geodesics[i].position));
		/* Find the coordinates of the intersection in our reference frame */
		// var coordinates = get_coordinates(frame, position);

		for (var j = 0; j < dimensions; ++j)
		{
			vector[j] = geodesics[i].position[j] - frame_position[j];
		}
		// var displacement = get_null(vector, geodesics[i].direction);
		var aa = inner(vector, vector);
    	var ab = inner(vector, geodesics[i].direction);
    	var bb = inner(geodesics[i].direction, geodesics[i].direction);
    	var t = (-ab - Math.sqrt(ab * ab - aa * bb)) / bb; /* Past light cone */
    	for (var j = 0; j < dimensions; ++j)
    	{
    		vector[j] = frame_position[j] + vector[j] + geodesics[i].direction[j] * t;
    	}

    	var proper_time = (vector[0] - geodesics[i].position[0]) * (vector[0] - geodesics[i].position[0]);
    	for (var j = 1; j < dimensions; ++j)
    	{
    		proper_time -= (vector[j] - geodesics[i].position[j]) * (vector[j] - geodesics[i].position[j]);
    	}
    	proper_time = sqrt(proper_time);

    	for (var j = 0; j < dimensions; ++j)
    	{
    		vector[j] -= frame.position[j];
    	}

    	var coordinates = apply(invert(frame.orientation), vector);

		context.beginPath();
		context.arc(coordinates[1], coordinates[2], 2 * zoom, 0, 2 * Math.PI);
		/* Color according to time elapsed in background reference frame */
		var amplitude = sin(proper_time * .05);
		context.globalAlpha = amplitude * amplitude;
		context.fill();
		context.globalAlpha = 1;
	}

	/* Render observer on screen */
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(0, 0, 2 * zoom, 0, 2 * Math.PI);
    context.fill();

	context.restore();
}
