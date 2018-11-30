//Super Yeet Boi
//Callan F.
//Initiated November, 2018

let state;

let grid;
let rows;
let cols;
let cellSize;

let windowSize = 600;

let chadStanding;
let chadRunning;
let chadJumping;
let chadYeeting;

let chad;
let terrains = [];

class Chad {
  constructor() {
    this.x = 300;
    this.y = 300;
    this.dx = 0;
    this.dy = 0;
    this.touchingGround = true;
    this.touchingWallL = false;
    this.touchingWallR = false;
    this.touchingCeiling = false;
    this.maxFall = 6;
  }
  display() {
    image(chadStanding, this.x, this.y);
  }
  move() {
    if (keyIsPressed) {
      if (key === "a" && this.touchingWallL === false) {
        this.touchingWallR = false;
        this.dx = -5;
      }
      else if ((key === "a" || key === "s") && this.touchingWallL === true) {
        this.dx = 0;
      }
      if (key === "d" && this.touchingWallR === false) {
        this.touchingWallL = false;
        this.dx = 5;
      }
      else if ((key === "d" || key === "s") && this.touchingWallR === true) {
        this.dx = 0;
      }
    }
    else if (!keyIsPressed) {
      this.dx = 0;
    }
    this.x += this.dx;
    this.y += this.dy;
  }

  jump() {

  }
  fall() {

  }

}

class Terrain {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.ox = this.x;
    this.y = this.y;
    this.type = type;
    if (this.type === 0) {
      this.dx = 0;
      this.dy = 0;
    }
    else if (this.type === 1) {
      this.dx = 0;
      this.dy = -5;
      if (dist(this.x, this.y, this.ox, this.oy) > 3) {
        this.dy *= -1;
      }
    }
    else if (this.type === 2) {
      this.dx = -5;
      this.dy = 0;
      if (dist(this.x, this.y, this.ox, this.oy) > 3) {
        this.dx *= -1;
      }
    }
  }
  display() {
    noStroke();
    if (this.type === 0) {
      fill(255);
    }
    else if (this.type === 1) {
      fill(0);
    }
    rect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
  }
}

function preload() {
  grid = loadStrings("assets/Grid1.txt");
  chadStanding = loadImage("assets/Idle Animation.gif");
  chadRunning = loadImage("assets/Running Animation.gif");
  chadJumping = loadImage("assets/Jumping Animation.gif");
  chadYeeting = loadImage("assets/Yeeting Animation.gif");
}

function setup() {
  createCanvas(windowSize, windowSize);
  imageMode(CENTER);
  rows = grid[0].length;
  cols = grid[0].length;

  cellSize = windowSize / rows;

  chad = new Chad();

  cleanupGrid();
}

function draw() {
  background(128);
  chad.display();
  chad.move();

}

function cleanupGrid() {
  for (let i = 0; i < grid.length; i++) {
    grid[i] = grid[i].split("");
  }
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === "0") {
        let ter = new Terrain(grid[y], grid[y][x], 0);
        terrains.push(ter);
      }
      else if (grid[y][x] === "1") {
        let ter = new Terrain(grid[y], grid[y][x], 1);
        terrains.push(ter);
      }
    }
  }
}
