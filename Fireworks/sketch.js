// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let colorList = ["red", "blue", "green", "cyan", "yellow", "magenta", "purple", "orange", "pink"];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(20, 30);
    this.dx = random(-3, 3);
    this.dy = random(-12, -10);
    this.ay = 1;
    this.transparency = 255;
    this.greyValue = random(30, 200);
    this.colorPicker = random(colorList);
    this.color = color(this.greyValue, this.greyValue, this.greyValue, this.transparency);
    // this.color = color(random(120, 255), random(10, 50), (1, 10), this.transparency);

    // if (this.colorPicker === "blue") {
    //   this.color = color(random(120, 255), random(10, 60), (1, 10), this.transparency);
    // }
    // if (this.colorPicker === "green") {
    //   this.color = color(random(1, 10), random(120, 255), (1, 10), this.transparency);
    // }
    // if (this.colorPicker === "cyan") {
    //   this.color = color(random(120, 255), random(10, 60), (1, 10), this.transparency);
    // }
    // if (this.colorPicker === "yellow") {
    //   this.color = color(random(120, 255), random(10, 60), (1, 10), this.transparency);
    // }
    // if (this.colorPicker === "magenta") {
    //   this.color = color(random(120, 255), random(10, 60), (1, 10), this.transparency);
    // }
    // if (this.colorPicker === "purple") {
    //   this.color = color(random(120, 255), random(10, 60), (1, 10), this.transparency);
    // }
    // if (this.colorPicker === "orange") {
    //   this.color = color(random(120, 255), random(10, 60), (1, 10), this.transparency);
    // }
    // if (this.colorPicker === "pink") {
    //   this.color = color(random(120, 255), random(10, 60), (1, 10), this.transparency);
    // }
  }
  display() {
    fill(this.color);
    stroke(this.color);
    rect(this.x, this.y, this.size, this.size);
  }
  update() {
    this.transparency -= 0.1;
    this.color.setAlpha(this.transparency);
    this.x += this.dx;
    this.y += this.dy;
    this.dy += this.ay;
  }
  bounce() {
    if (this.x >= windowWidth || this.x <= 0) {
      this.x =- this.x * 2;
    }
    if (this.y >= windowHeight || this.y <= 0) {
      this.y =- this.y * 2;
    }
  }
}

// let fwork;
let fireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // fwork = new Particle(width/2, height/2);
}

function draw() {
  background(0);
  // fwork.display();
  // fwork.update();
  for (let i = fireworks.length-1; i >= 0; i--) {
    if (fireworks[i].transparency <= 0) {
      fireworks.splice(i, 1);
    }
    else {
      fireworks[i].update();
      fireworks[i].display();
      // fireworks[i].bounce();
    }
  }
}

function mousePressed() {
  for (let i = 0; i < 100; i++) {
    let someParticle = new Particle(mouseX, mouseY);
    fireworks.push(someParticle);
  }
}
