// Handles user controls

"use strict";

// Zoom in and out using mouse wheel
addEventListener('mousewheel', function (e) {
    zoom *= Math.exp(event.wheelDelta / 1000);
    event.preventDefault();
});

// Key codes corresponding to different keys
var key_space = 32;
var key_w = 87;
var key_a = 65;
var key_s = 83;
var key_d = 68;

// Detect when keys are pressed
var keys = {};
addEventListener('keydown', function (e) {
    keys[e.which] = true;    
});
addEventListener('keyup', function (e) {
    keys[e.which] = false;
});

// Request to make canvas fullscreen
addEventListener('click', function() {
    // canvas.webkitRequestFullscreen();
});

// Define mouse properties
var mouse_down = false;
var mouse_start_x = 0;
var mouse_start_y = 0;
var mouse_end_x = 0;
var mouse_end_y = 0;

// Capture the start of a mouse drag
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

// Capture the movement of a mouse drag
addEventListener('mousemove', function (e) {
    mouse_end_x = e.offsetX;
    mouse_end_y = e.offsetY;
});
addEventListener('touchmove', function (e) {
    mouse_end_x = e.touches[0].clientX;
    mouse_end_y = e.touches[0].clientY;
});

// Capture the end of a mouse drag
addEventListener('mouseup', function (e) {
    mouse_down = false;
});
addEventListener('touchend', function (e) {
    mouse_down = false;
});