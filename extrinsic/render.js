var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var zoom = 20;

function render()
{
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.save();
	context.translate(canvas.width / 2, canvas.height / 2);
	context.scale(zoom, zoom);

	context.fillStyle = 'red';
	for (var i = geodesics.length - 1; i >= 0; --i)
	{
		var displacement = get_null(subtract(geodesics[i].position, frame.position), geodesics[i].direction);
		/* Find the intersection of the geodesic with our past light cone */
		var position = add(frame.position, displacement);
		var coordinates = get_coordinates(frame, position);

		context.beginPath();
		context.arc(coordinates[1], coordinates[2], 2 / zoom, 0, 2 * Math.PI);
		/* Color according to time elapsed in background reference frame */
		context.globalAlpha = Math.pow(Math.sin(position[0] / 2), 2);
		context.fill();
		context.globalAlpha = 1;
	}

	/* Render observer on screen */
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(0, 0, 2 / zoom, 0, 2 * Math.PI);
    context.fill();

	context.restore();
}
