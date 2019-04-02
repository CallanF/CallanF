// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let startingPoints = [{x: 450, y: 50}, {x: 50, y: 750}, {x: 850, y: 750}];
//y = x - 50

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  sierpinski(startingPoints, 5);
}

function sierpinski(points, depth) {
  let theColors = ["yellow", "white", "yellow", "white", "yellow", "white", "yellow", "white"];
  fill(theColors[depth]);
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);
  if (depth > 0) {
    sierpinski([points[0],
      midPoint(points[0], points[1]),
      midPoint(points[0], points[2])],
    depth - 1);
    sierpinski([points[1],
      midPoint(points[1], points[0]),
      midPoint(points[1], points[2])],
    depth - 1);
    sierpinski([points[2],
      midPoint(points[2], points[0]),
      midPoint(points[2], points[1])],
    depth - 1);
  }
}

function midPoint(point1, point2) {
  let x = (point1.x + point2.x) / 2;
  let y = (point1.y + point2.y) / 2;
  return {x: x, y: y};
}
