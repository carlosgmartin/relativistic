var image = context.createImageData(canvas.width, canvas.height);

/* Large render loop, inline and optimize as much as possible */
/* Each iteration corresponds to a pixel on the screen */
function render_background()
{
    var image_data = image.data;

    /* Cache image width, height, and data */
    var image_width = image.width;
    var image_height = image.height;
    var image_data = image.data;

    /* Cache background image width, width, and data */
    var background_image_width = background_image.width;
    var background_image_height = background_image.height;
    var background_image_data = background_image.data;

    /* Cache Math sqrt and floor functions */
    var sqrt = Math.sqrt;
    var floor = Math.floor;

    /* Initialize position (point) and displacement (vector) for use in loop */
    var position = zero_vector;
    var displacement = zero_vector;

    /* Cache observer position, t axis, x axis, and y axis */
    var frame_position = frame.position;
    var frame_t = frame.orientation[0];
    var frame_x = frame.orientation[1];
    var frame_y = frame.orientation[2];
            
    /* Find inner product of time axis of observer with itself */
    var tt = frame_t[0] * frame_t[0];
    for (var k = 1; k < dimensions; ++k)
    {
        tt -= frame_t[k] * frame_t[k];
    }
    var inverse_tt = 1 / tt;

    var index = 0;
    for (var j = 0; j < image_height; ++j)
    {
        for (var i = 0; i < image_width; ++i)
        {
            /* Find x and y coordinates of this pixel */
            var x = (i - image_width / 2) * zoom;
            var y = (j - image_height / 2) * zoom;
    
            /* Find corresponding displacement on simulatenous hyperplane of observer */
            for (var k = 0; k < dimensions; ++k)
            {
                displacement[k] = frame_x[k] * x + frame_y[k] * y;
            }

            /* Find inner product of displacement with itself */
            var pp = displacement[0] * displacement[0];
            for (var k = 1; k < dimensions; ++k)
            {
                pp -= displacement[k] * displacement[k];
            }

            /* Find inner product of displacement with time axis of observer */
            var pt = displacement[0] * frame_t[0];
            for (var k = 1; k < dimensions; ++k)
            {
                pt -= displacement[k] * frame_t[k];
            }

            /* Find affine parameter for geodesic */
            var parameter = (-pt - sqrt(pt * pt - tt * pp)) * inverse_tt;

            /* Find corresponding displacement on past light cone of observer */
            for (var k = 0; k < dimensions; ++k)
            {
                displacement[k] += frame_t[k] * parameter;
            }

            /* Find corresponding position in world coordinates */
            for (var k = 0; k < dimensions; ++k)
            {
                position[k] = frame_position[k] + displacement[k];
            }

            /* Is this world position part of the background image? */
            if (position[1] > 0 && position[1] < background_image_width &&
                position[2] > 0 && position[2] < background_image_height)
            {
                /* Find corresponding pixel in background image */
                var index2 = (floor(position[1]) + floor(position[2]) * background_image_width) * 4;

                /* Copy pixel from background image */
                image_data[index] = background_image_data[index2];
                image_data[index + 1] = background_image_data[index2 + 1];
                image_data[index + 2] = background_image_data[index2 + 2];
                image_data[index + 3] = background_image_data[index2 + 3];
            }
            else
            {   
                /* Draw a black pixel */
                image_data[index] = 0;
                image_data[index + 1] = 0;
                image_data[index + 2] = 0;
                image_data[index + 3] = 255;
            }

            index += 4;
        }
    }

    /* Render pixels on canvas */
    context.putImageData(image, 0, 0);
}