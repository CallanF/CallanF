//Aplaceia
//Initiated December 7, 2018
//Callan Fehr

let gameState = 0;
let layout = 0;

let grid;

let layout0;
let layout00;

let cols;
let rows;
let cellSize;
//cellSize === 24;

let windowSize = 600;

let groundList = [];
let wallList = [];
let objectList = [];

let hero;
let defblack;

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
    // this.x = 108;
    // this.y = 108;
    this.x = 540;
    this.y = 492;
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
    let yu = floor((this.y - 24) / cellSize);
    let xl = floor((this.x - 24) / cellSize);
    let yd = floor((this.y + 24) / cellSize);
    let xr = floor((this.x + 24) / cellSize);

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
    if (gameState === 0) {
      if (keyIsPressed && key === "w") {
        if (this.wallUp === false) {
          if (this.backup === 0 || this.backup - this.counter <= this.walkspeed) {
            this.y -= 24;
            this.backup = this.counter;
          }
        }
        this.facing = "up";
      }
      if (keyIsPressed && key === "a") {
        if (this.wallLeft === false) {
          if (this.backup === 0 || this.backup - this.counter <= this.walkspeed) {
            this.x -= 24;
            this.backup = this.counter;
          }
        }
        this.facing = "left";
      }
      if (keyIsPressed && key === "s") {
        if (this.wallDown === false) {
          if (this.backup === 0 || this.backup - this.counter <= this.walkspeed) {
            this.y += 24;
            this.backup = this.counter;
          }
        }
        this.facing = "down";
      }
      if (keyIsPressed && key === "d") {
        if (this.wallRight === false) {
          if (this.backup === 0 || this.backup - this.counter <= this.walkspeed) {
            this.x += 24;
            this.backup = this.counter;
          }
        }
        this.facing = "right";
      }
    }
  }
}
class Ground {
  constructor(x, y) {
    this.x = x + 12;
    this.y = y + 12;
  }
  display() {
    fill(255);
    noStroke();
    rect(this.x, this.y, cellSize, cellSize);
  }
}
class Wall {
  constructor(x, y) {
    this.x = x + 12;
    this.y = y + 12;
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
class Blackout {
  constructor() {
    this.pos = 300;
    this.size = 600;
    this.alpha = 0;
  }
  display() {
    fill(0, 0, 0, this.alpha);
    noStroke();
    rect(this.pos, this.pos, this.size, this.size);
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

function preload() {
  layout0 = loadStrings("assets/TestGrid.txt");
  layout00 = loadStrings("assets/TestGrid2.txt");
  fightAsset = loadImage("assets/Fight.png");
  magicAsset = loadImage("assets/Magic.png");
  defendAsset = loadImage("assets/Defend.png");
  fleeAsset = loadImage("assets/Flee.png");
}

function setup() {
  createCanvas(windowSize, windowSize);
  background(128);
  rectMode(CENTER);
  imageMode(CENTER);
  grid = layout0;
  rows = grid[0].length;
  cols = grid[0].length;

  cellSize = windowSize / rows;

  cleanupGrid();
  displayGrid();

  hero = new Player();
  defblack = new Blackout();
}

function draw() {
  if (gameState === 0) {
    bgManage();
  }
  toggleMap();
  hero.display();
  hero.detectWalls();
  hero.cooldown();
  hero.toggleSpeed();
  hero.move();
  defblack.display();
  detectMapChange();
  runToggle();
}

function cleanupGrid() {
  for (let i = 0; i < grid.length; i++) {
    // console.log(grid.length, grid[i], typeof(grid[i]), i);
    grid[i] = grid[i].split("");
  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === "0") {
        let ground = new Ground(x * cellSize, y * cellSize);
        groundList.push(ground);
      }
      else if (grid[y][x] === "1") {
        let wall = new Wall(x * cellSize, y * cellSize);
        wallList.push(wall);
      }
      else if (grid[y][x] === "2") {
        let wall = new Wall(x * cellSize, y * cellSize);
        wallList.push(wall);
      }
    }
  }
}

function toggleMap() {
  if (layout === 0) {
    grid = layout0;
  }
  else if (layout === 1) {
    grid = layout00;
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

function detectMapChange() {
  if (layout === 0) {
    if (hero.x === 588 && hero.y === 492) {
      gameState = -1;
      transition(36, 492, 1);
    }
  }
  if (layout === 1) {
    if (hero.x === 12 && hero.y === 492) {
      gameState = -1;
      transition(564, 492, 0);
    }
  }
}

function transition(newx, newy, layoutTo) {
  for (let i = 0; i < 255; i++) {
    defblack.alpha += 1;
  }

  layout = layoutTo;
  deleteLists();
  displayGrid();
  hero.x = newx;
  hero.y = newy;
  for (let i = 0; i < 255; i++) {
    defblack.alpha -= 1;
  }
  gameState = 0;
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

function deleteLists() {
  // for (let i = grid.length - 1; i > 0; i--) {
  //   grid[i].pop();
  // }
  for (let i = groundList.length - 1; i > 0; i--) {
    groundList.pop(i);
  }
  for (let i = wallList.length - 1; i > 0; i--) {
    wallList.pop(i);
  }
  for (let i = objectList.length - 1; i > 0; i--) {
    objectList.pop(i);
  }
}
