// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Walker {
  constructor(setColour) {
    this.x = width/2;
    this.y = height/2;
    this.colour = setColour;
    this.speed = 3;
  }
  display() {
    stroke(this.colour);
    fill(this.colour);
    ellipse(this.x, this.y, 2, 2);
  }
  move() {
    let choice = random(100);
    if (choice < 25) {
      //up
      this.y -= this.speed;
    }
    else if (choice < 50) {
      //down
      this.y += this.speed;
    }
    else if (choice < 75) {
      //left
      this.x -= this.speed;
    }
    else {
      //right
      this.x += this.speed;
    }
  }
  // speedControl() {
  //   this.speed = random(100);
  // }
}

let me;
let you;
let them;

function setup() {
  createCanvas(windowWidth, windowHeight);
  me = new Walker("red");
  you = new Walker("blue");
  them = new Walker("green");
}

function draw() {
  me.display();
  me.move();

  you.display();
  you.move();

  them.display();
  them.move();
}
