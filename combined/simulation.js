"use strict";

/*
var image = new Image();
image.src = 'einstein small.jpg';
var canvas = document.createElement('canvas');
image.onload = function () {
    canvas.width = image.width;
    canvas.height = image.height;
    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    document.body.appendChild(canvas);
    //context.getImageData(0, 0, canvas.width, canvas.height);
}
*/

var canvas = document.createElement('canvas');
canvas.width = 1000;
canvas.height = 1000;
var context = canvas.getContext('2d');
context.fillRect(0, 0, canvas.width, canvas.height);
document.body.appendChild(canvas);

addEventListener('keydown', function() {
    canvas.webkitRequestFullscreen();
});