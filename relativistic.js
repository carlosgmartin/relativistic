var canvas = document.createElement('canvas');
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);
var context = canvas.getContext('2d');

function render()
{
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);
}

render();