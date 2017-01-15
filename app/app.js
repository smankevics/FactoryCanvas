'use strict';

var PIXI = require('pixi.js');

var defines = require('./Defines');

var resourceItem = require('./components/resourceItem');
var Store = require('./Store');

var renderer = new PIXI.autoDetectRenderer(800, 600, {backgroundColor: 0xffffff, antialias: true });
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
stage.interactive = true;

var resources = defines.resources();

var i = 0;

for(i; i < 4; i++) {
    var res = new resourceItem(resources[i], 20, 20 + 40*i);
    stage.addChild(res.container);
}

animate();

function animate() {
    requestAnimationFrame(animate);

    renderer.render(stage);
}