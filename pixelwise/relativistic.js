var canvas = document.createElement('canvas');
canvas.width = 300;
canvas.height = 300;
document.body.appendChild(canvas);
var context = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var image_data = context.createImageData(width, height);
var data = image_data.data;
var zoom = 1;

var observer = {
	position: [0, 0, 0],
	t_axis: [1, 0, 0],
	x_axis: [0, 1, 0],
	y_axis: [0, 0, 1]
};

function render()
{
    var index = 0;
    for (var j = 0; j < height; ++j) {
        for (var i = 0; i < width; ++i) {
            var x = (i - width/2) / zoom;
            var y = (j - height/2) / zoom;

            var position = math.add(observer.position, math.add(math.scale(observer.x_axis, x), math.scale(observer.y_axis, y)));
            var r = Math.sqrt(position[1] * position[1] + position[2] * position[2]);

            data[index++] = 255 * Math.sin(r / 10) * Math.sin(r / 10);
            data[index++] = 0;
            data[index++] = 0;
            data[index++] = 255;
        }
    }
    context.putImageData(image_data, 0, 0);
    window.scrollTo(
        document.documentElement.scrollWidth/2 - window.innerWidth/2, 
        document.documentElement.scrollHeight/2 - window.innerHeight/2
    );
}

addEventListener('mousewheel', function(event) {
    zoom *= Math.exp(-event.wheelDelta / 1000);
    event.preventDefault();
});

var keys = {};
addEventListener('keydown', function(event) {
    keys[event.which] = true;    
});
addEventListener('keyup', function(event) {
    keys[event.which] = false;
});
var key_w = 87;
var key_a = 65;
var key_s = 83;
var key_d = 68;

var rapidity = .01;
function update() {
	if (keys[key_d]) {
		var direction = [0, 1, 0];
		observer.t_axis = math.boost(observer.t_axis, [1, 0, 0], direction, rapidity);
		observer.x_axis = math.boost(observer.x_axis, [1, 0, 0], direction, rapidity);
		observer.y_axis = math.boost(observer.y_axis, [1, 0, 0], direction, rapidity);
	}
	if (keys[key_a]) {
		var direction = [0, -1, 0];
		observer.t_axis = math.boost(observer.t_axis, [1, 0, 0], direction, rapidity);
		observer.x_axis = math.boost(observer.x_axis, [1, 0, 0], direction, rapidity);
		observer.y_axis = math.boost(observer.y_axis, [1, 0, 0], direction, rapidity);
	}

	requestAnimationFrame(render);
	console.log('ok');
}
var fps = 60;
setInterval(update, 1000 / fps);









/*
function add(vector, vector2) {
	var result = [];
	for (var i = 0; i < vector.length; ++i) {
		result[i] = vector[i] + vector2[i];
	}
	return result;
}

function subtract (vector1, vector2) {
	var result = [];
	for (var i = 0; i < vector1.length; ++i)
	{
		result[i] = vector1[i] - vector2[i];
	}
	return result;
}

function scale(vector, scalar) {
	var result = [];
	for (var i = 0; i < vector.length; ++i) {
		result[i] = vector[i] * scalar;
	}
	return result;
}

function inner(vector1, vector2) {
	var result = vector1[0] * vector2[0];
	for (var component = 1; component < vector1.length; ++component)
	{
		result -= vector1[component] * vector2[component];
	}
	return result;
}

function boost(vector, direction1, direction2, angle)
{
	var component1 = -math.inner(vector, direction1);
	var component2 = math.inner(vector, direction2);
	var vector1 = math.scale(direction1, component1);
	var vector2 = math.scale(direction2, component2);
	var vector_fixed = math.subtract(vector, math.add(vector1, vector2));
	var component1_rotated = component1 * Math.cosh(angle) + component2 * Math.sinh(angle);
	var component2_rotated = component1 * Math.sinh(angle) + component2 * Math.cosh(angle);
	var vector1_rotated = scale(direction1, component1_rotated);
	var vector2_rotated = scale(direction2, component2_rotated);
	var vector_rotated = add(vector1_rotated, vector2_rotated);
	return add(vector_rotated, vector_fixed);
}

function rotate(vector, direction1, direction2, angle) {
	var component1 = inner(vector, direction1);
	var component2 = inner(vector, direction2);
	var vector1 = scale(direction1, component1);
	var vector2 = scale(direction2, component2);
	var vector_fixed = subtract(vector, math.add(vector1, vector2));
	var component1_rotated = component1 * Math.cos(angle) - component2 * Math.sin(angle);
	var component2_rotated = component1 * Math.sin(angle) + component2 * Math.cos(angle);
	var vector1_rotated = scale(direction1, component1_rotated);
	var vector2_rotated = scale(direction2, component2_rotated);
	var vector_rotated = add(vector1_rotated, vector2_rotated);
	return add(vector_rotated, vector_fixed);
}
*/