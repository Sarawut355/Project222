// How to load in modules
const Scene = require('Scene');
const Patches = require('Patches');

// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require('Diagnostics');

var Gameplay;
var Gameover;


Promise.all([
    Scene.root.findFirst('Number',{recursive:true})
   ]).then(function(results){
    const textHolder = results[0];
    Patches.outputs.getScalar('Score').then(scoreValue =>{
        textHolder.text = scoreValue.toString()
    });
   });

   Patches.outputs.getPulse('Gameover').then(event => {
    Gameover = event.subscribe(function () {
        Patches.inputs.setBoolean('Start', false);
        Patches.inputs.setBoolean('Reset', true);
     });
    });

Patches.outputs.getPulse('Gameplay').then(event => {
    Gameplay = event.subscribe(function () {
        Patches.inputs.setBoolean('Start', true);
    Patches.inputs.setBoolean('Reset', false);
     });
    });

Patches.inputs.setBoolean('Start', true);
Patches.inputs.setBoolean('Reset', false);