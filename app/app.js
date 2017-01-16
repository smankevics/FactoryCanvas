'use strict';

const WIDTH = 800;
const HEIGHT = 600;

var PIXI = require('pixi.js');

var MainStage = require('./stages').MainStage;
var StageManager = require('./managers').StageManager;

var renderer = new PIXI.autoDetectRenderer(WIDTH, HEIGHT, {backgroundColor: 0xffffff, antialias: true });
document.body.appendChild(renderer.view);

var appcication = new PIXI.Container();
appcication.interactive = true;

var stageManager = new StageManager(appcication);

//create stages
stageManager.addStage(new MainStage('mainStage', WIDTH, HEIGHT));
stageManager.setStage('mainStage');

mainProcess();

function mainProcess() {
    requestAnimationFrame(mainProcess);

    renderer.render(appcication);
}