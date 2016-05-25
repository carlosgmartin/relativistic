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
document.body.appendChild(canvas);
var context = canvas.getContext('2d');

function render() {
    requestAnimationFrame(render);

    if (!document.webkitFullscreenElement) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    context.fillStyle = 'red';
    context.beginPath();
    context.arc(canvas.width/2, canvas.height/2, 10, 0, 2 * Math.PI);
    context.fill();

    if (mouse_down) {
        context.lineWidth = 10;
        context.lineCap = 'round';
        context.globalAlpha = .25;
        context.strokeStyle = 'white';
        context.beginPath();
        context.moveTo(mouse_start_x, mouse_start_y);
        context.lineTo(mouse_end_x, mouse_end_y);
        context.stroke();
    }
}
requestAnimationFrame(render);

var mouse_down = false;
var mouse_start_x = 0;
var mouse_start_y = 0;
var mouse_end_x = 0;
var mouse_end_y = 0;

addEventListener('mousedown', function (e) {
    mouse_down = true;
    mouse_start_x = e.offsetX;
    mouse_start_y = e.offsetY;
});
addEventListener('touchstart', function (e) {
    mouse_down = true;
    mouse_start_x = e.touches[0].clientX;
    mouse_start_y = e.touches[0].clientY;
});

addEventListener('mousemove', function (e) {
    mouse_end_x = e.offsetX;
    mouse_end_y = e.offsetY;
});
addEventListener('touchmove', function (e) {
    mouse_end_x = e.touches[0].clientX;
    mouse_end_y = e.touches[0].clientY;
});

addEventListener('mouseup', function (e) {
    mouse_down = false;
});
addEventListener('touchend', function (e) {
    mouse_down = false;
});

addEventListener('click', function (e) {
    if (!document.webkitFullscreenElement) {
        //canvas.webkitRequestFullscreen();
    }
});