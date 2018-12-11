//Aplaceia
//Initiated December 7, 2018
//Callan Fehr

let gameState = 0;
let layout = 0;

let grid;

let layout0;

let cols;
let rows;
let cellSize;

let windowSize = 600;

let groundList = [];
let wallList = [];
let objectList = [];
let doorList = [];
let npcList = [];

let hero;

let hasBaeren = false;
let hasMaria = false;
let hasCryce = false;

let naomiAssetU;
let naomiAssetL;
let naomiAssetD;
let naomiAssetR;
let baerenAssetU;
let baerenAssetL;
let baerenAssetD;
let baerenAssetR;
let mariaAssetU;
let mariaAssetL;
let mariaAssetD;
let mariaAssetR;
let cryceAssetU;
let cryceAssetL;
let cryceAssetD;
let cryceAssetR;

let fightAsset;
let magicAsset;
let defendAsset;
let fleeAsset;

let isRun = false;
let letGo = true;

class Player {
  constructor() {
    this.x = 100.5;
    this.y = 100.5;
    this.size = 24;
    this.wallUp = false;
    this.wallLeft = false;
    this.wallRight = false;
    this.wallDown = false;
    this.facing = "down";
    this.counter = 0;
    this.backup = 0;
    this.walkspeed;
  }
  display() {
    if (this.facing === "up") {
      fill(255, 255, 0);
    }
    else if (this.facing === "left") {
      fill(0, 255, 0);
    }
    else if (this.facing === "down") {
      fill(0, 0, 255);
    }
    else if (this.facing === "right") {
      fill(255, 0, 0);
    }
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

    if (grid[yu][xn] === "1") {
      this.wallUp = true;
    }
    else {
      this.wallUp = false;
    }
    if (grid[yn][xl] === "1") {
      this.wallLeft = true;
    }
    else {
      this.wallLeft = false;
    }
    if (grid[yd][xn] === "1") {
      this.wallDown = true;
    }
    else {
      this.wallDown = false;
    }
    if (grid[yn][xr] === "1") {
      this.wallRight = true;
    }
    else {
      this.wallRight = false;
    }
  }
  cooldown() {
    this.counter += 1;
  }
  toggleSpeed() {
    if (isRun === true) {
      this.walkspeed = -6;
    }
    if (isRun === false) {
      this.walkspeed = -20;
    }
  }
  move() {
    if (keyIsPressed && key === "w") {
      if (this.wallUp === false) {
        if (this.backup === 0 || this.backup - this.counter <= this.walkspeed) {
          this.y -= 25;
          this.backup = this.counter;
        }
      }
      this.facing = "up";
    }
    if (keyIsPressed && key === "a") {
      if (this.wallLeft === false) {
        if (this.backup === 0 || this.backup - this.counter <= this.walkspeed) {
          this.x -= 25;
          this.backup = this.counter;
        }
      }
      this.facing = "left";
    }
    if (keyIsPressed && key === "s") {
      if (this.wallDown === false) {
        if (this.backup === 0 || this.backup - this.counter <= this.walkspeed) {
          this.y += 25;
          this.backup = this.counter;
        }
      }
      this.facing = "down";
    }
    if (keyIsPressed && key === "d") {
      if (this.wallRight === false) {
        if (this.backup === 0 || this.backup - this.counter <= this.walkspeed) {
          this.x += 25;
          this.backup = this.counter;
        }
      }
      this.facing = "right";
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
  layout0 = loadStrings("assets/TestGrid.txt");
  fightAsset = loadImage("assets/Fight.png");
  magicAsset = loadImage("assets/Magic.png");
  defendAsset = loadImage("assets/Defend.png");
  fleeAsset = loadImage("assets/Flee.png");
}

function setup() {
  createCanvas(windowSize, windowSize);
  imageMode(CENTER);
  grid = layout0;
  rows = grid[0].length;
  cols = grid[0].length;

  cellSize = windowSize / rows;

  cleanupGrid();
  displayGrid();

  hero = new Player();
}

function draw() {
  toggleMap();
  bgManage();
  hero.display();
  hero.detectWalls();
  hero.cooldown();
  hero.toggleSpeed();
  hero.move();
  runToggle();
}

function cleanupGrid() {
  for (let i = 0; i < grid.length; i++) {
    grid[i] = grid[i].split("");
  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === "0") {
        let ground = new Ground(y * cellSize, x * cellSize);
        groundList.push(ground);
      }
      else if (grid[y][x] === "1") {
        let wall = new Wall(y * cellSize, x * cellSize);
        wallList.push(wall);
      }
      else if (grid[y][x] === "2") {
        let wall = new Wall(y * cellSize, x * cellSize);
        wallList.push(wall);
      }
    }
  }
}

function toggleMap() {
  if (layout === 0) {
    grid = layout0;
  }
}

function bgManage() {
  for (let i = 0; i < groundList.length - 1; i++) {
    if (gameState === 0) {
      groundList[i].display();
    }
  }
  for (let i = 0; i < wallList.length - 1; i++) {
    if (gameState === 0) {
      wallList[i].display();
    }
  }
}

function runToggle() {
  if (keyIsPressed && key === "e" && isRun === false && letGo === true) {
    isRun = true;
    letGo = false;
  }
  if (keyIsPressed && key === "e" && isRun === true && letGo === true) {
    isRun = false;
    letGo = false;
  }
  if (!keyIsPressed) {
    letGo = true;
  }
}
