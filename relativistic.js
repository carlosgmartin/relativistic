var canvas = document.createElement('canvas');
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);
var context = canvas.getContext('2d');

var zoom = 5;

var objects = [];
for (var x = -20; x <= 20; x += 4)
{
	for (var y = -20; y <= 20; y += 4)
	{
		objects.push([0, x, y]);
	}
}



function render()
{
	requestAnimationFrame(render);

	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);

    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.scale(zoom, -zoom);

    context.fillStyle = 'red';
    for (var i = 0; i < objects.length; ++i)
    {
    	context.beginPath();
    	context.arc(objects[i][1], objects[i][2], 1, 0, math.tau);
    	context.fill();
	}

    context.restore();
}
render();

/* Zoom in and out using mouse wheel */
addEventListener('mousewheel', function(event) {
    //zoom *= Math.exp(-event.wheelDelta / 10000);
    event.preventDefault();

    for (var i = 0; i < objects.length; ++i)
	{
		objects[i] = math.boost(objects[i], [1, 0, 0], [0, 1, 0], event.wheelDelta / 10000);
	}
});




