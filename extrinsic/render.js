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
		var displacement = subtract(geodesics[i].position, frame.position);
		/* Find the intersection of the geodesic with our past light cone */
		var intersection = add(frame.position, get_null(displacement, geodesics[i].direction));
		var coordinates = get_coordinates(frame, intersection);

		context.beginPath();
		context.arc(coordinates[1], coordinates[2], 2 / zoom, 0, 2 * Math.PI);
		context.globalAlpha = Math.pow(Math.sin(intersection[0]), 2);
		context.fill();
		context.globalAlpha = 1;
	}

    context.fillStyle = 'white';
    context.beginPath();
    context.arc(0, 0, 2 / zoom, 0, 2 * Math.PI);
    context.fill();

	context.restore();
}
