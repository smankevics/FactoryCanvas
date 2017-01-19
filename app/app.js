'use strict';

const WIDTH = 800;
const HEIGHT = 600;

var PIXI = require('pixi.js');

var defines = require('./defines');
var FpsMeter = require('./components/view/FpsMeter');
var LoadingStage = require('./stages').LoadingStage;
var MainStage = require('./stages').MainStage;
var StageManager = require('./managers').StageManager;

var renderer = new PIXI.CanvasRenderer(WIDTH, HEIGHT, {backgroundColor: 0xffffff, antialias: true });
document.body.appendChild(renderer.view);

var application = new PIXI.Container();
application.interactive = true;

var stageManager = new StageManager(application);
var fpsMeter = new FpsMeter(WIDTH - 20, HEIGHT - 20);

//create loading stage
stageManager.addStage(new LoadingStage('loadingStage', WIDTH, HEIGHT));
stageManager.setStage('loadingStage');

//load resources
defines.loadResources(function() {
    //load other stages
    stageManager.addStage(new MainStage('mainStage', WIDTH, HEIGHT));
    stageManager.setStage('mainStage');

    //add components to application
    application.addChild(fpsMeter.container);
});

mainProcess();

function mainProcess() {
    requestAnimationFrame(mainProcess);

    fpsMeter.update();

    renderer.render(application);
}