var vectors = [];

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
vectors = vectors.concat(objects);



function render()
{
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
    zoom *= Math.exp(-event.wheelDelta / 10000);
    event.preventDefault();
});

var keys = {};
addEventListener('keydown', function(event) {
    keys[event.which] = true;
});
addEventListener('keyup', function(event) {
    keys[event.which] = false;
});

var rapidity = .01;
setInterval(function() {
    /* Move left */
    if (keys[65]) {
	    for (var i = 0; i < objects.length; ++i)
		{
			vectors[i].replace(math.boost(vectors[i], [1, 0, 0], [0, -1, 0], rapidity));
		}
    }
    /* Move right */
    if (keys[68]) {
	    for (var i = 0; i < objects.length; ++i)
		{
			vectors[i].replace(math.boost(vectors[i], [1, 0, 0], [0, 1, 0], rapidity));
		}
    }
    /* Move up */
    if (keys[83]) {
	    for (var i = 0; i < objects.length; ++i)
		{
			vectors[i].replace(math.boost(vectors[i], [1, 0, 0], [0, 0, 1], rapidity));
		}
    }
    /* Move down */
    if (keys[87]) {
	    for (var i = 0; i < objects.length; ++i)
		{
			vectors[i].replace(math.boost(vectors[i], [1, 0, 0], [0, 0, -1], rapidity));
		}
    }
    requestAnimationFrame(render);
}, 1000/60);

// Replace contents of current array with contents of a specified array
Array.prototype.replace = function (array)
{
	this.splice(0);
	Array.prototype.push.apply(this, array);
};