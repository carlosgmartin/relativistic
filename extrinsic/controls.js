/* Zoom in and out using mouse wheel */
addEventListener('mousewheel', function(event) {
    zoom *= Math.exp(event.wheelDelta / 10000);
    event.preventDefault();
});

/* Common key codes */
var key_space = 32;
var key_w = 87;
var key_a = 65;
var key_s = 83;
var key_d = 68;
var key_q = 81;
var key_e = 69;

/* Detect key presses and releases */
var keys = {};
addEventListener('keydown', function (e) {
    keys[e.which] = true;
});
addEventListener('keyup', function (e) {
    keys[e.which] = false;
});

/* TODO: Add touch controls for zoom, rotation, and boosting */