//Aplaceia
//Initiated December 7, 2018
//Callan Fehr

let gameState;

let testGrid;

let cols;
let rows;
let cellSize;

let windowSize = 600;

let groundList = [];
let wallList = [];
let npcList = [];

let hero;

class Player {
  constructor() {
    this.x = 100.5;
    this.y = 100.5;
    this.size = 24;
    this.wallUp = false;
    this.wallLeft = false;
    this.wallRight = false;
    this.wallDown = false;
  }
  display() {
    fill(255, 0, 255);
    noStroke();
    rect(this.x, this.y, this.size, this.size);
  }
  detectWalls() {
    let xn = floor(this.x / cellSize);
    let yn = floor(this.y / cellSize);
    let yu = floor((this.y - 25.5) / cellSize);
    let xl = floor((this.x - 25.5) / cellSize);
    let yd = floor((this.y + 25.5) / cellSize);
    let xr = floor((this.x + 25.5) / cellSize);

    if (testGrid[yu][xn] === "1") {
      this.wallUp = true;
    }
    else {
      this.wallUp = false;
    }
    if (testGrid[yn][xl] === "1") {
      this.wallLeft = true;
    }
    else {
      this.wallLeft = false;
    }
    if (testGrid[yd][xn] === "1") {
      this.wallDown = true;
    }
    else {
      this.wallDown = false;
    }
    if (testGrid[yn][xr] === "1") {
      this.wallRight = true;
    }
    else {
      this.wallRight = false;
    }
  }
  move() {
    if (keyIsPressed && key === "w") {
      if (this.wallUp === false) {
        this.y -= 25;
      }
    }
    if (keyIsPressed && key === "a") {
      if (this.wallLeft === false) {
        this.x -= 25;
      }
    }
    if (keyIsPressed && key === "s") {
      if (this.wallDown === false) {
        this.y += 25;
      }
    }
    if (keyIsPressed && key === "d") {
      if (this.wallRight === false) {
        this.x += 25;
      }
    }
  }
}

class NPC {
  constructor() {

  }
}
class Ground {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  display() {
    fill(255);
    noStroke();
    rect(this.x, this.y, cellSize, cellSize);
  }
}
class Wall {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  display() {
    fill(0);
    noStroke();
    rect(this.x, this.y, cellSize, cellSize);
  }
}
class Interactable {
  constructor() {

  }
}
class PartyMember {
  constructor(h, m, o, d, a, e, l, id) {
    this.health = h;
    this.magic = m;
    this.offence = o;
    this.defence = d;
    this.agility = a;
    this.evade = e;
    this.luck = l;
  }
}
class Enemy {
  constructor() {

  }
}
class SpecialMove {
  constructor() {

  }
}
class Item {
  constructor() {

  }
}

function preload() {
  testGrid = loadStrings("assets/TestGrid.txt");
}

function setup() {
  createCanvas(windowSize, windowSize);
  imageMode(CENTER);
  rows = testGrid[0].length;
  cols = testGrid[0].length;

  cellSize = windowSize / rows;

  cleanupGrid();

  hero = new Player();
}

function draw() {
  displayGrid();
  bgManage();
  hero.display();
  hero.detectWalls();
  hero.move();
}

function cleanupGrid() {
  for (let i = 0; i < testGrid.length; i++) {
    testGrid[i] = testGrid[i].split("");
  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (testGrid[y][x] === "0") {
        let ground = new Ground(y * cellSize, x * cellSize);
        groundList.push(ground);
      }
      else if (testGrid[y][x] === "1") {
        let wall = new Wall(y * cellSize, x * cellSize);
        wallList.push(wall);
      }
    }
  }
}

function bgManage() {
  for (let i = 0; i < groundList.length - 1; i++) {
    groundList[i].display();
  }
  for (let i = 0; i < wallList.length - 1; i++) {
    wallList[i].display();
  }
}
