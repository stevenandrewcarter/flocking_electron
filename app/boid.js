var Vector = require('./vector.js')

module.exports = function(x, y, size) {
  this.location = new Vector(x, y);
  var angle =  Math.random() * Math.PI * 2;
  this.velocity = new Vector(Math.cos(angle), Math.sin(angle));
  this.acceleration = new Vector(0, 0);
  this.maxForce = 0.03;
  this.maxSpeed = 2;
  this.size = size;

  this.compute = function(boids) {
    var seperation = this.calculateSeparation(boids);
    var alignment = this.calculateAlignment(boids);
    var cohension = this.calculateCohension(boids);
    seperation.multiply(1.5);
    alignment.multiply(1.0);
    cohension.multiply(1.0);
    this.applyForce(seperation);
    this.applyForce(alignment);
    this.applyForce(cohension);
  }

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.location.add(this.velocity);
    this.acceleration.multiply(0);
  }

  this.seek = function(target) {
    var desired = new Vector(target.x, target.y);
    desired.subtract(this.location);
    desired.normalize();
    desired.multiply(this.maxSpeed);

    var steer = new Vector(desired.x, desired.y);
    steer.subtract(this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }

  this.wrapBorders = function(width, height) {
    if (this.location.x < -this.size) this.location.x = width + this.size;
    if (this.location.y < -this.size) this.location.y = height + this.size;
    if (this.location.x > width+this.size) this.location.x = -this.size;
    if (this.location.y > height+this.size) this.location.y = -this.size;
  }

  this.calculateSeparation = function(boids) {
    var desiredSeparation = 25.0;
    var steer = new Vector(0, 0);
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
      var distance = this.location.distance(boids[i].location);
      if (distance > 0 && distance < desiredSeparation) {
        var differenace = new Vector(this.location.x, this.location.y);
        differenace.subtract(boids[i].location);
        differenace.normalize();
        differenace.divide(distance);
        steer.add(differenace);
        count++;
      }
    }
    if (steer.length() > 0) {
      steer.normalize();
      steer.multiply(this.maxSpeed);
      steer.subtract(this.velocity);
      steer.limit(this.maxForce);
    }
    return steer;
  }

  this.calculateAlignment = function(boids) {
    var neighbourDistance = 50;
    var sum = new Vector(0, 0);
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
      var distance = this.location.distance(boids[i].location);
      if (distance > 0 && distance < neighbourDistance) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.divide(count);
      sum.normalize();
      sum.multiply(this.maxSpeed);
      var steer = new Vector(sum.x, sum.y);
      steer.subtract(this.velocity);
      steer.limit(this.maxForce);
      return steer;
    }
    return new Vector(0, 0);
  }

  this.calculateCohension = function(boids) {
    var neighbourDistance = 50;
    var sum = new Vector(0, 0);
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
      var distance = this.location.distance(boids[i].location);
      if (distance > 0 && distance < neighbourDistance) {
        sum.add(boids[i].location);
        count++;
      }
    }
    if (count > 0) {
      sum.divide(count);
      return this.seek(sum);
    }
    return new Vector(0, 0);
  }

  this.draw = function(ctx, width, height, boids) {
    this.compute(boids);
    this.update();
    this.wrapBorders(width, height)
    // Draw the boid
    var theta = Math.atan2(this.velocity.y, this.velocity.x) + (90 * Math.PI / 180);
    ctx.save();
    ctx.translate(this.location.x, this.location.y);
    ctx.rotate(theta);
    ctx.beginPath();
    ctx.moveTo(this.size, -this.size * 2);
    ctx.lineTo(-this.size, this.size * 2);
    ctx.lineTo(this.size, this.size * 2);
    ctx.fill();
    ctx.restore();
  }
}
