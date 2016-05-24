var canvas = document.createElement('canvas');
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);
var context = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var image_data = context.createImageData(width, height);
var data = image_data.data;
var zoom = 1;

var position = [0, 0, 0];
var t_axis = [1, 0, 0];
var x_axis = [0, 1, 0];
var y_axis = [0, 0, 1];

function render_pixel()
{
    var index = 0;
    for (var j = 0; j < height; ++j) {
        for (var i = 0; i < width; ++i) {
            var x = (i - width/2) / width * zoom;
            var y = (j - height/2) / height * zoom;

            var position = math.add(position, math.add(math.scale(x_axis, x), math.scale(y_axis, y)));

            data[index++] = 255;
            data[index++] = 0;
            data[index++] = 0;
            data[index++] = 255;
        }
    }
    context.putImageData(image_data, 0, 0);
}
render_pixel();







