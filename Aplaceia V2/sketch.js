//Aplaceia
//Initiated December 7, 2018
//Callan Fehr

let gameState;
let textState = 0;
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

let textBoxAsset;
let textLetGo;

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
    this.wallDown = false;
    this.wallRight = false;
    this.objUp = false;
    this.objLeft = false;
    this.objDown = false;
    this.objRight = false;
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

    if (grid[yu][xn] === "1" || grid[yu][xn] === "2") {
      this.wallUp = true;
    }
    else {
      this.wallUp = false;
    }
    if (grid[yn][xl] === "1" || grid[yn][xl] === "2") {
      this.wallLeft = true;
    }
    else {
      this.wallLeft = false;
    }
    if (grid[yd][xn] === "1" || grid[yd][xn] === "2") {
      this.wallDown = true;
    }
    else {
      this.wallDown = false;
    }
    if (grid[yn][xr] === "1" || grid[yn][xr] === "2") {
      this.wallRight = true;
    }
    else {
      this.wallRight = false;
    }
    if (grid[yu][xn] === "2") {
      this.objUp = true;
    }
    else {
      this.objUp = false;
    }
    if (grid[yn][xl] === "2") {
      this.objLeft = true;
    }
    else {
      this.objLeft = false;
    }
    if (grid[yd][xn] === "2") {
      this.objDown = true;
    }
    else {
      this.objDown = false;
    }
    if (grid[yn][xr] === "2") {
      this.objRight = true;
    }
    else {
      this.objRight = false;
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
class Objt {
  constructor(x, y) {
    this.x = x + 12;
    this.y = y + 12;
  }
  display() {
    fill(240, 0, 0);
    noStroke();
    rect(this.x, this.y, cellSize, cellSize);
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
  textBoxAsset = loadImage("assets/Textbox.png");
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

  gameState = 0;
  textState = 0;
}

function draw() {
  if (gameState === 0) {
    bgManage();
  }
  hero.display();
  hero.detectWalls();
  hero.cooldown();
  hero.toggleSpeed();
  hero.move();
  detectMapChange();
  detectText();
  regulateText();
  runToggle();
}

function cleanupGrid() {
  for (let i = 0; i < 2; i++) {
    layout = i;
    toggleMap();
    for (let j = 0; j < grid.length; j++) {
      grid[j] = grid[j].split("");
    }
  }
  layout = 0;
  toggleMap();
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
        let obj = new Objt(x * cellSize, y * cellSize);
        objectList.push(obj);
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
    if (gameState === 0 || gameState === -1) {
      groundList[i].display();
    }
  }
  for (let i = 0; i < wallList.length - 1; i++) {
    if (gameState === 0 || gameState === -1) {
      wallList[i].display();
    }
  }
  for (let i = 0; i < objectList.length - 1; i++) {
    if (gameState === 0 || gameState === -1) {
      objectList[i].display();
    }
  }
}

function detectMapChange() {
  if (layout === 0) {
    if (hero.x === 588 && hero.y === 492) {
      gameState = -3;
      transition(36, 492, 1);
    }
  }
  if (layout === 1) {
    if (hero.x === 12 && hero.y === 492) {
      gameState = -3;
      transition(564, 492, 0);
    }
  }
}

function detectText() {
  if (gameState === 0) {
    if (keyIsPressed && key === "o") {
      textLetGo = false;
      if (hero.objUp === true && hero.facing === "up" || hero.objLeft === true && hero.facing === "left" || hero.objDown === true && hero.facing === "down" || hero.objRight === true && hero.facing === "right") {
        if (layout === 1) {
          gameState = -1;
          activateText(0);
          textState += 1;
        }
      }
    }
    else if (!keyIsPressed || keyIsPressed && key !== "o") {
      textLetGo = true;
    }
  }
}

function  regulateText() {
  if (gameState === -1) {
    if (keyIsPressed && key === "o") {
      if (textLetGo === true) {
        textState += 1;
      }
    }
  }
  else {
    textState = 0;
  }
}

function activateText(id) {
  if (id === 0) {
    if (textState === 1) {
      displayText("This is a blessed mess of the best text test.");
    }
    else {
      gameState = 0;
    }
  }
}

function displayText(assignedText) {
  image(textBoxAsset, 0, 350);
  textSize(32);
  text(assignedText, 300, 425);
}

function transition(newx, newy, layoutTo) {
  deleteLists();
  layout = layoutTo;
  toggleMap();
  displayGrid();
  hero.x = newx;
  hero.y = newy;
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
  //THIS IS HOW YOU SOLVE THE PROBLEM DO NOT FORGET TO LOOK AT THIS
  //You have to figure out if it's just doing it for a slight amount of time
  //console.log(gameState);
}

function deleteLists() {
  groundList = [];
  wallList = [];
  objectList = [];
}
