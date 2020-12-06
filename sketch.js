(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||     window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas, context;
var particleStep = 50;
var radius = 50;
var particles = [];

function init() {
  canvas = document.querySelector( 'canvas' );
  context = canvas.getContext( '2d' );
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  for( var j = 0; j < window.innerHeight; j += particleStep ) {
    for( var i = 0; i < window.innerWidth; i+= particleStep ) {
      particles.push( new particle( i, j, 50, i  + j) );
    }    
  }

  draw();
}

function draw() {
  
  var i;
  canvas.width = canvas.width;
  
  for( i = 0; i < particles.length; i++ ) {
   particles[i].update();
   particles[i].draw(); 
  }
  
  requestAnimationFrame( draw );
}

function particle( x, y, radius, angle ) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.angle = angle;
  
  this.draw = function() {
    context.strokeStyle = '#999';
    context.beginPath();
    context.arc( this.x, this.y, this.radius, 0, 2*Math.PI );
    context.stroke();
    context.closePath();
    
    var dotAngle = this.angle * Math.PI * 2;
    var circleX = Math.cos(this.angle) * this.radius + this.x;
    var circleY = Math.sin(this.angle) * this.radius + this.y;
    context.beginPath();
    context.arc( circleX, circleY, 5, 0, 2*Math.PI );
    context.fill();
    
    context.restore();
  }
  
  this.update = function() {
    this.angle += 0.1;
    console.log( this.angle);
  }
}

setTimeout( init, 10 );
