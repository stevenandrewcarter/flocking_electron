var pjson = require('../package.json');
var Flock = require('./flock')

console.log('Flocking with Electron. Version ' + pjson.version);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  flock.draw(ctx);
  window.requestAnimationFrame(draw);
}

// Get the Canvas Variables
var canvas = document.getElementById('drawing_area');
var ctx = canvas.getContext('2d');
ctx.globalCompositeOperation = 'destination-over';
var flock = new Flock(canvas.width, canvas.height, 50);
// Check for the context (In case it is not supported)
if (canvas.getContext) {
  window.requestAnimationFrame(draw);
} else {
  document.write('No Canvas Support!');
}
