// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x;
let dx;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = 0;
  dx = 5;
  background(74, 65, 42)
}

function draw() {
  background(74, 65, 42);

  x += dx;

  if x > width - 50 || x < 0) {
    dx = dx * -1;
  }
  fill(50, 68, 172);
  rect(x, 0, 50, 150);
}
