addEventListener('click', function (e) {
    if (!document.webkitFullscreenElement) {
        canvas.webkitRequestFullscreen();
    }
});