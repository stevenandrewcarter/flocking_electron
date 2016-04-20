var pjson = require('../package.json');
var Flock = require('./flock')
var animate = false;

console.log('Flocking with Electron. Version ' + pjson.version);

function draw(forward) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  flock.draw(ctx);
  if (animate) {
    window.requestAnimationFrame(draw);
  }
}

function play() {
  animate = true;
  draw();
}

function stop() {
  animate = false;
}

function nextFrame() {
  draw(true);
}

function previousFrame() {
  draw(false);
}

// Get the Canvas Variables
var canvas = document.getElementById('drawing_area');
var ctx = canvas.getContext('2d');
ctx.globalCompositeOperation = 'destination-over';
var flock = new Flock(canvas.width, canvas.height, 10);
// Check for the context (In case it is not supported)
if (canvas.getContext) {
  window.requestAnimationFrame(draw);
} else {
  document.write('No Canvas Support!');
}
document.getElementById("play").addEventListener("click", play, false);
document.getElementById("forward").addEventListener("click", nextFrame, false);
document.getElementById("backward").addEventListener("click", previousFrame, false);
document.getElementById("stop").addEventListener("click", stop, false);
