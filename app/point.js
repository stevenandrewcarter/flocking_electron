module.exports = function(x, y) {
  this.x = x;
  this.y = y;

  this.add = function(newPoint) {
    this.x += newPoint.x;
    this.y += newPoint.y;
  }

  this.limit = function(limit) {
    if (this.x > limit) {
      this.x = limit;
    }
    if (this.y > limit) {
      this.y = limit;
    }
  }

  this.divide = function(divisor) {
    this.x /= divisor;
    this.y /= divisor;
  }

  this.distance = function(target) {
    return Math.sqrt(((this.x - target.x) * (this.x - target.x)) + ((this.y - target.y) * (this.y - target.y)));
  }

  this.subtract = function(target) {
    this.x -= target.x;
    this.y -= target.y;
  }

  this.length = function() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }

  this.normalize = function() {
    this.x = this.x / this.length();
    this.y = this.y / this.length();
  }

  this.multiply = function(value) {
    this.x *= value;
    this.y *= value;
  }
}
