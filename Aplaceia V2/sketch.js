//Aplaceia
//Initiated December 7, 2018
//Callan Fehr

let gameState;
let textState = 0;
let layout = 0;
let scriptState = 1;
let gameCounter = 0;
let backup = 0;

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
let pitch;

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
let textLetGo = true;
let isText;
let textList = [];
let breakCount;

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

class Blackout {
  constructor() {
    this.location = windowSize / 2;
    this.size = windowSize;
    this.alphaNum = 255;
  }
  display() {
    fill(0, 0, 0, this.alphaNum);
    rect(this.location, this.location, windowSize, windowSize);
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
  readyGrid();

  hero = new Player();
  pitch = new Blackout();

  gameState = -2;
  textState = 0;
}

function draw() {
  counterUp();
  scriptManage();
  if (gameState === 0) {
    bgManage();
    hero.display();
    hero.detectWalls();
    hero.cooldown();
    hero.toggleSpeed();
    hero.move();
  }
  detectMapChange();
  runToggle();
}

function counterUp() {
  gameCounter += 1;
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

function scriptManage() {
  if (scriptState === 1) {
    gameState = -2;
    pitch.display();
    if (gameCounter >= 100) {
      activateText(0, "...My head still hurts...|Oof.", 1);
    }
  }
  else if (scriptState === 2) {
    pitch.display();
    for (let i = 0; i < 255; i++) {
      backup = gameCounter;
      if (gameCounter - backup === 2) {
        pitch.alphaNum -= 1;
      }
    }
  }
}

function readyGrid() {
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

function keyPressed() {
  if (key === "o") {
    if (gameState === -1) {
      if (textLetGo === true) {
        textState += 1;
      }
    }
    if (gameState === 0) {
      if (hero.objUp === true && hero.facing === "up" || hero.objLeft === true && hero.facing === "left" || hero.objDown === true && hero.facing === "down" || hero.objRight === true && hero.facing === "right") {
        if (layout === 1) {
          if (textLetGo === true) {
            textState = 1;
            textLetGo = false;
            activateText(0, "This text is a blessed mess of the best text test.");
          }
        }
      }
    }
    textLetGo = false;
  }
}

function keyReleased() {
  if (key === "o") {
    textLetGo = true;
  }
}

function activateText(speaker, textID, promptID) {
  gameState = -1;
  textList = [];
  breakCount = 0;
  divideText(textID);
  if (breakCount === 0) {
    if (textState <= breakCount) {
      if (speaker === 0) {
        image(textBoxAsset, 300, 500, 550, 150);
        fill(255);
        textSize(24);
        text(textID, 250, 500, 410, 115);
      }
      else {
        image(textBoxAsset, 300, 500, 550, 150);
        fill(255);
        textSize(24);
        text(textID, 400, 500, 410, 115);
      }
    }
    else {
      if (promptID === 1) {
        scriptState = 2;
      }
    }
  }
  else {
    if (textState <= breakCount) {
      if (speaker === 0) {
        let newText = split(textID, "|");
        image(textBoxAsset, 300, 500, 550, 150);
        fill(255);
        textSize(24);
        text(newText[textState], 250, 500, 410, 115);
      }
      else {
        let newText = split(textID, "|");
        image(textBoxAsset, 300, 500, 550, 150);
        fill(255);
        textSize(24);
        text(newText[textState], 400, 500, 410, 115);
      }
    }
    else {
      if (promptID === 1) {
        scriptState = 2;
      }
      else {
        gameState = 0;
      }
    }
  }
}

// if (keyIsPressed && key === "o") {
//   if (textLetGo === true) {
//     textState += 1;
//     textLetGo = false;
//   }
// }

function divideText(textID) {
  for (let i = 0; i < textID.length; i++) {
    if (textID[i] === "|") {
      breakCount += 1;
    }
  }
}

function transition(newx, newy, layoutTo) {
  deleteLists();
  layout = layoutTo;
  toggleMap();
  readyGrid();
  hero.x = newx;
  hero.y = newy;
  gameState = 0;
}

function runToggle() {
  if (gameState === 0) {
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
}

function deleteLists() {
  groundList = [];
  wallList = [];
  objectList = [];
}
