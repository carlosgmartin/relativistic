// Handles rendering

"use strict";

var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var image = context.createImageData(canvas.width, canvas.height);

// Render loop
function render()
{
    // console.log('Rendering...');

    // If canvas is not fullscreen, resize it to fit the window
    if (true || document.webkitFullscreenElement != canvas) {
        if (canvas.width != window.innerWidth || canvas.height != window.innerHeight)
        {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            image = context.createImageData(canvas.width, canvas.height);
        }

    }

    // Render stationary background

    // Find inner product of time axis of observer with itself
    var tt = observer.t_axis[0] * observer.t_axis[0];
    tt -= observer.t_axis[1] * observer.t_axis[1];
    tt -= observer.t_axis[2] * observer.t_axis[2];
    var inverse_tt = 1 / tt;

    // Initialize position (point) and displacement (vector) for use in loop
    var position = [0, 0, 0];
    var displacement = [0, 0, 0];

    // Cache image width, height, and data
    var image_width = image.width;
    var image_height = image.height;
    var image_data = image.data;

    // Cache background image width, width, and data (if loaded)
    var background_image_width = background_image.width;
    var background_image_height = background_image.height;
    var background_image_data = background_image.data;

    // Cache observer position, t axis, x axis, and y axis
    var observer_position = observer.position;
    var observer_t_axis = observer.t_axis;
    var observer_x_axis = observer.x_axis;
    var observer_y_axis = observer.y_axis;

    // Cache Math sqrt and floor functions
    var sqrt = Math.sqrt;
    var floor = Math.floor;

    // Large render loop, inline and optimize as much as possible
    // Each iteration corresponds to a pixel on the screen
    var index = 0;
    for (var j = 0; j < image_height; ++j)
    {
        for (var i = 0; i < image_width; ++i)
        {
            // Find x and y coordinates of pixel
            var x = (i - image_width / 2) * zoom;
            var y = (j - image_height / 2) * zoom;

            // Find corresponding displacement on simulatenous hyperplane of observer
            displacement[0] = observer_x_axis[0] * x + observer_y_axis[0] * y;
            displacement[1] = observer_x_axis[1] * x + observer_y_axis[1] * y;
            displacement[2] = observer_x_axis[2] * x + observer_y_axis[2] * y;
            
            // Find inner product of displacement with itself
            var pp = displacement[0] * displacement[0];
            pp -= displacement[1] * displacement[1];
            pp -= displacement[2] * displacement[2];

            // Find inner product of displacement with time axis of observer
            var pt = displacement[0] * observer_t_axis[0];
            pt -= displacement[1] * observer_t_axis[1];
            pt -= displacement[2] * observer_t_axis[2];

            // Find affine parameter for geodesic
            var parameter = (-pt - sqrt(pt * pt - tt * pp)) * inverse_tt;

            // Find corresponding displacement on past light cone of observer
            displacement[0] += observer_t_axis[0] * parameter;
            displacement[1] += observer_t_axis[1] * parameter;
            displacement[2] += observer_t_axis[2] * parameter;
            
            // Find corresponding position in world coordinates
            position[0] = observer_position[0] + displacement[0];
            position[1] = observer_position[1] + displacement[1];
            position[2] = observer_position[2] + displacement[2];

            // Is this world position part of the background image?
            if (position[1] > 0 && position[1] < background_image_width &&
                position[2] > 0 && position[2] < background_image_height)
            {
                // Find corresponding pixel in background image
                var index2 = (floor(position[1]) + floor(position[2]) * background_image_width) * 4;

                // Copy pixel from background image
                image_data[index] = background_image_data[index2];
                image_data[index + 1] = background_image_data[index2 + 1];
                image_data[index + 2] = background_image_data[index2 + 2];
                image_data[index + 3] = background_image_data[index2 + 3];
            }
            else
            {   
                // Draw a black pixel
                image_data[index] = 0;
                image_data[index + 1] = 0;
                image_data[index + 2] = 0;
                image_data[index + 3] = 255;
            }
            index += 4;
        }
    }

    // Render pixels on canvas
    context.putImageData(image, 0, 0);

    // Render observer location on screen
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.beginPath();
    context.arc(image_width / 2, image_height / 2, 2, 0, 2 * Math.PI);
    context.fill();
    context.stroke();

    // Draw speed of observer relative to background frame
    var relative_gamma = inner(observer.t_axis, [1, 0, 0]);
    var relative_rapidity = Math.acosh(relative_gamma);
    var relative_speed = Math.tanh(relative_rapidity);
    context.fillStyle = 'white';
    context.font = '16px arial';
    context.fillText('Relative speed: ' + relative_speed.toFixed(4), 10, 30);
    // TODO: Spearate into x and y components

    // Find speed difference
    var difference = subtract(observer.t_axis, [1, 0, 0]);
    var speed_x = inner(observer.t_axis, observer.x_axis);

    // Render mouse drags
    if (mouse_down) {
        context.beginPath();
        context.moveTo(mouse_start_x, mouse_start_y);
        context.lineTo(mouse_end_x, mouse_end_y);
        context.stroke();

        context.lineWidth = 5;
        context.lineCap = 'round';
        context.strokeStyle = 'black';
        context.stroke();

        context.lineWidth = 2;
        context.strokeStyle = 'white';
        context.stroke();

        context.lineWidth = 1;
    }

    // Render geodesics
    
    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.scale(1 / zoom, 1 / zoom);
    context.fillStyle = 'red';
    for (var i = 0; i < positions.length; ++i)
    {
        // Find displacement between origin position of geodesic and position of observer
        var displacement = subtract(positions[i], observer.position);

        // Find inner product of displacement with geodesic direction vector
        var dd = inner(displacement, directions[i]);

        // Find geodesic parameter
        var parameter = (-inner(displacement, directions[i]) - Math.sqrt(dd * dd - inner(displacement, displacement) * inner(directions[i], directions[i]))) / inner(displacement, displacement);

        // Find intersection point of geodesic with past light cone of observer
        var position = add(positions[i], scale(directions[i], parameter));

        // Project intersection point onto simultaneous hyperplane of observer
        //position = boost(position, observer.t_axis, inner(observer.t_axis, observer.x_axis), )

        // function boost(vector, direction1, direction2, angle)

        context.globalAlpha = Math.sin(parameter) * Math.sin(parameter);
        context.beginPath();
        context.arc(position[1], position[2], 2/zoom, 0, 2 * Math.PI);
        context.fill();
    }
    context.globalAlpha = 1;
    context.restore();
}
