var canvas = document.createElement('canvas');
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);
var context = canvas.getContext('2d');

var zoom = 10;

function render()
{
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);

    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.scale(zoom, -zoom);

    context.fillStyle = 'red';
    context.beginPath();
    context.arc(0, 0, 1, 0, 2 * Math.PI);
    context.fill();

    context.restore();
}

render();