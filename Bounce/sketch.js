// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let dvd;
let x, y;
let dx, dy;

function preload() {
  dvd = loadImage("assets/DVD.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = ((windowWidth/2) - 128)
  y = ((windowHeight/2) - 128)
  dx = random(3, 8);
  dy = random(3, 8);
}

function draw() {
  moveDVD();
  displayDVD();
}

function displayDVD() {
  background(10, 15, 20);
  image(dvd, x, y);
}

function moveDVD() {
  x += dx;
  y += dy;

  if ((x + 192) >= windowWidth) {
    dx = -dx
  }

  else if ((x + 64) <= 0) {
    dx = -dx
  }

  if ((y + 192) >= windowHeight) {
    dy = -dy
  }

  else if ((y + 64) <= 0) {
    dy = -dy
  }

}
