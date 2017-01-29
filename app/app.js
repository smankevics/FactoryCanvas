'use strict';

var PIXI = require('pixi.js');
require('components/pixi-ui');

var defines = require('./defines');
var FpsMeter = require('./components/view/FpsMeter');
var LoadingStage = require('./stages').LoadingStage;
var MainStage = require('./stages').MainStage;
var MenuStage = require('./stages').MenuStage;
var StageManager = require('./managers').StageManager;
var state = require('managers/StateManager');

const MAX_WIDTH = 1366;
const MAX_HEIGHT = 768;

var width = window.innerWidth;
var height = window.innerHeight;
var scale = 1;

defineMargins();

function defineMargins() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    width = Number((w / scale).toFixed(0));
    height = Number((h / scale).toFixed(0));
    var scaleX = w / MAX_WIDTH;
    var scaleY = h / MAX_HEIGHT;
    scale = scaleX > scaleY ? scaleX : scaleY;
    scale = scale > 1 ? scale : 1;
    state.set('windowSize', [width, height]);
}

window.addEventListener('resize', function() {
    defineMargins();
    application.scale.set(scale, scale);
    renderer.resize(window.innerWidth, window.innerHeight);
}, true);

var renderer = new PIXI.CanvasRenderer(width, height, {backgroundColor: 0xffffff, antialias: true, autoResize: true});
renderer.view.style.position = 'absolute';
renderer.view.style.top = '0';
renderer.view.style.left = '0';
renderer.view.style.bottom = '0';
renderer.view.style.right = '0';
renderer.roundPixels = true;
document.body.appendChild(renderer.view);

var application = new PIXI.Container();
application.interactive = true;

var stageManager = new StageManager(application);
var fpsMeter = new FpsMeter(width, height);

//create loading stage
stageManager.addStage(new LoadingStage('loadingStage', width, height));
stageManager.setStage('loadingStage');

//load resources
defines.loadResources(function() {
    //load other stages
    stageManager.addStage(new MenuStage('menuStage', width, height, function() {
        stageManager.addStage(new MainStage('mainStage', width, height));
        stageManager.setStage('mainStage');
    }));
    stageManager.setStage('menuStage');

    //add components to application
    application.addChild(fpsMeter.container);
});

mainProcess();

function mainProcess() {
    requestAnimationFrame(mainProcess);

    fpsMeter.update();

    renderer.render(application);
}