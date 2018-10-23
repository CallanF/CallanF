// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//let ball;
let ballArray = [];
let colourArray = [(255, 255, 255), (255, 0, 0), (0, 255, 0), (0, 0, 255), (255, 255, 0), (0, 255, 255), (255, 0, 255), (0, 0, 0)];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  for (let i = 0; i < ballArray.length; i++) {

    //Move balls
    ballArray[i].x += ballArray[i].dx;
    ballArray[i].y += ballArray[i]. dy;

    if (ballArray[i].x > width - ballArray[i].radius || ballArray[i].x > width + ballArray[i].radius) {
      ballArray[i].dx *= -1;
    }
    if (ballArray[i].y > height - ballArray[i].radius || ballArray[i].y > height + ballArray[i].radius) {
      ballArray[i].dy *= -1;
    }
    if (ballArray[i].x < 0 - ballArray[i].radius || ballArray[i].x < 0 + ballArray[i].radius) {
      ballArray[i].dx *= -1;
    }
    if (ballArray[i].y < 0 - ballArray[i].radius || ballArray[i].y < 0 + ballArray[i].radius) {
      ballArray[i].dy *= -1;
    }

    //Display balls
    fill (random(0, 255), random(0, 255), random(0, 255));
    ellipse(ballArray[i].x, ballArray[i].y, random(40, 50), random(40, 50));
  }
}

function mousePressed() {
  let ball = {
    x: mouseX,
    y: mouseY,
    radius: random(10, 50),
    dx: random(-5, 5),
    dy: random(-5, 5)
    //dx: 20,
    //dy: 20
  };
  ballArray.push(ball);
}

// //Display balls
// fill (random(0, 255), random(0, 255), random(0, 255));
// ellipse(ballArray[i].x, ballArray[i].y, ballArray[i].radius * 2, ballArray[i].radius * 2);
