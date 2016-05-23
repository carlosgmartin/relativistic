var canvas = document.createElement('canvas');
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);
var context = canvas.getContext('2d');

var zoom = 20;

var objects = [];
for (var x = -10; x <= 10; x += .5)
{
	for (var y = -10; y <= 10; y += .5)
	{
		objects.push({
			start_position: [0, x, y],
			velocity: [1, 0, 0]
		})
	}
}
/*
objects = [];
objects.push({
	start_position: [0, 5, 0],
	velocity: [1, 0, 0]
})
*/


var vectors = [];
for (var i = 0; i < objects.length; ++i)
{
	vectors.push(objects[i].start_position);
	vectors.push(objects[i].velocity);
}




function render()
{
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);

    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.scale(zoom, zoom);

    context.fillStyle = 'red';
    for (var i = 0; i < objects.length; ++i)
    {
    	var position = find_intersection_position(objects[i]);
    	if (position == null) continue;
    	context.beginPath();
    	context.arc(position[1], position[2], 2/zoom, 0, math.tau);
    	context.fill();
	}

    context.fillStyle = 'white';
    context.beginPath();
    context.arc(0, 0, 2/zoom, 0, math.tau);
    context.fill();

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

var rapidity_change = .01;
var total_rapidity = 0;
setInterval(function() {
    /* Move left */
    if (keys[65]) {
    	total_rapidity -= rapidity_change;
    	//console.log(total_rapidity);
	    for (var i = 0; i < vectors.length; ++i)
		{
			vectors[i].replace(math.boost(vectors[i], [1, 0, 0], [0, -1, 0], rapidity_change));
		}
    }
    /* Move right */
    if (keys[68]) {
    	total_rapidity += rapidity_change;
    	//console.log(total_rapidity);
	    for (var i = 0; i < vectors.length; ++i)
		{
			vectors[i].replace(math.boost(vectors[i], [1, 0, 0], [0, 1, 0], rapidity_change));
		}
    }
    /* Move down */
    if (keys[83]) {
	    for (var i = 0; i < vectors.length; ++i)
		{
			vectors[i].replace(math.boost(vectors[i], [1, 0, 0], [0, 0, 1], rapidity_change));
		}
    }
    /* Move up */
    if (keys[87]) {
	    for (var i = 0; i < vectors.length; ++i)
		{
			vectors[i].replace(math.boost(vectors[i], [1, 0, 0], [0, 0, -1], rapidity_change));
		}
    }
    /* Q */
    if (keys[81]) {
	    for (var i = 0; i < vectors.length; ++i)
		{
			//vectors[i].replace(math.rotate(vectors[i], [1, 0, 0], [0, 0, 1], .005));
			vectors[i].replace(math.rotate(vectors[i], [0, 1, 0], [0, 0, 1], -.005));
		}
    }
    /* E */
    if (keys[69]) {
	    for (var i = 0; i < vectors.length; ++i)
		{
			//vectors[i].replace(math.rotate(vectors[i], [1, 0, 0], [0, 0, -1], .005));
			vectors[i].replace(math.rotate(vectors[i], [0, 1, 0], [0, 0, 1], .005));
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






function find_intersection(object)
{
	var observer = [0, 0, 0]; // in our case since the observer is at the origin
	var delta = math.subtract(observer, object.start_position);
	var parameter1 = (math.inner(object.velocity, delta) + math.sqrt(math.square(math.inner(object.velocity, delta)) - math.inner(object.velocity, object.velocity) * math.inner(delta, delta))) / math.inner(object.velocity, object.velocity);
	var parameter2 = (math.inner(object.velocity, delta) - math.sqrt(math.square(math.inner(object.velocity, delta)) - math.inner(object.velocity, object.velocity) * math.inner(delta, delta))) / math.inner(object.velocity, object.velocity);
	return parameter1;
}

function find_intersection_position(object)
{
	var parameter = find_intersection(object);
	return math.add(object.start_position, math.scale(object.velocity, parameter));
}





