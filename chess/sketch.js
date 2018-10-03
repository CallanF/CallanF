// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let v;
let h;

function setup() {
  createCanvas(400, 400);
  background(255);
}

function draw() {
  for (h = 0; h < 400; h += 100) {
    for (v = 0; v < 400; v += 100) {
      fill(0);
      rect(h, v, 50, 50);
    }
  }

  for (h = 50; h < 400; h += 100) {
    for (v = 50; v < 400; v += 100) {
      fill(0);
      rect(h, v, 50, 50);
    }
  }

//  fill(0, 0, 0, 0);
//  rect(200, 200, 400, 400);

}
