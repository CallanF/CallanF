// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

function setup() {
  createCanvas(400, 400);
  background(255);
}

function draw() {
  if (mouseIsPressed && keyIsPressed && key === "r") {
  	rect((mouseX - 4.5), (mouseY - 3.5), 10, 10);
  }
  if (mouseIsPressed && keyIsPressed && key === "e") {
  	ellipse((mouseX - 1), (mouseY - 1), 10, 10);
  }
}

function keyTyped() {
  if (key === "w") {
    background(255);
  }
  else if (key === "b") {
    background(0);
  }
}
