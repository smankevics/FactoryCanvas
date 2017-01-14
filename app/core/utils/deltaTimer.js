'use strict';

module.exports = function(render, fpsCap) {
    var interval = Math.round(1000 / fpsCap);
    var fps = fpsCap;
    var delay = 0;
    var timeout;
    var lastTime;
    var fpsInterval;

    this.start = start;
    this.stop = stop;

    function start() {
        timeout = setTimeout(loop, 0);
        fpsInterval = setInterval(updateFpsValue, 1000);
        lastTime = Date.now();
        return lastTime;
    }

    function stop() {
        clearTimeout(timeout);
        clearInterval(fpsInterval);
        return lastTime;
    }

    function updateFpsValue() {
      fps = Math.round(1000 / delay);
    }

    function loop() {
        var thisTime = Date.now();
        var deltaTime = thisTime - lastTime;
        delay = Math.max(interval - deltaTime, 0);
        timeout = setTimeout(loop, delay);
        lastTime = thisTime + delay;
        render(fps);
    }
}