// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let numberOfRects;
let rectWidth;
let x;
let time = 0;
let rects = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  numberOfRects = 10;
  rectWidth = width / numberOfRects;
  generateRectangles();
}

function draw() {
  background(255);
  fill(0);
  // time += 0.01;
  // x = noise(time) * width;
  // ellipse(x, height/2, 50, 50);
  displayRects();
}

function generateRectangles() {
  for (let i = 0; i < numberOfRects; i++) {
    let rectHeight = noise(time) * height;
    let someRect = {
      x: i * rectWidth,
      y: height - rectHeight,
      width: rectWidth,
      height: rectHeight,
    };

    rects.push(someRect);
  }
  time += 0.01;
}

function displayRects() {
  for (let i = 0; i < rects.length; i++) {
    rect(rects[i].x, rects[i].y, rects[i].width, rects[i].height);
  }
}
