// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// function setup() {
//   createCanvas(400, 400);
//   angleMode(DEGREES);
// }
//
// function draw() {
//   background(240);
//   fill(240);
//   ellipse(0, 0, 200, 200);
//   clockLines();
//   translate(width/2, height/2);
// }
//
// function clockLines() {
//   for (let i = 0; i < 360; i += 6) {
//     rotate(i);
//     rect(0, 50, 2, 5);
//   }
// }

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(255);
  displayFace();
}

function displayFace() {
  //Main clock face
  translate(width/2, height/2);
  strokeWeight(4);
  fill(255);
  ellipse(0, 0, 350, 350);

  //Dot in the middle
  fill(0);
  ellipse(0, 0, 5, 5);

  //Minute tick marks
  for (let i = 0; i < 60; i ++) {
    strokeWeight(1);
    line(150, 0, 165, 0);
    rotate(360/60);
  }

  //Hour tick marks
  for (let i = 0; i < 12; i ++) {
    strokeWeight(3);
    line(0, 150, 0, 165);
    rotate(360/12);

  }
}
