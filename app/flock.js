var Boid = require('./boid.js')

module.exports = function(width, height, size) {
  this.boids =  new Array(size);
  this.width = width;
  this.height = height;
  for (var i = 0; i < size; i++) {
    this.boids[i] = new Boid(Math.random() * width, Math.random() * height, 5);
  }

  this.draw = function(ctx) {
    for (var i = 0; i < size; i++) {
      this.boids[i].draw(ctx, this.width, this.height, this.boids);
    }
  }
}
