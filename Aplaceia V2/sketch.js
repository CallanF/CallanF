//Aplaceia
//Initiated December 7, 2018
//Callan Fehr

let testing = false;
let testingLayouts = false;

let gameState;
let textState = 0;
let layout = 1;
let scriptState = 0;
let gameCounter = 0;
let increase = true;

let tester;
let grid;

let layout0;
let layout00;
let cellLayout;

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
let sergeant;

let titleScreenAsset;

// let naomiAssetU;
// let naomiAssetL;
// let naomiAssetD;
// let naomiAssetR;
// let baerenAssetU;
// let baerenAssetL;
// let baerenAssetD;
// let baerenAssetR;
// let mariaAssetU;
// let mariaAssetL;
// let mariaAssetD;
// let mariaAssetR;
// let cryceAssetU;
// let cryceAssetL;
// let cryceAssetD;
// let cryceAssetR;

let textBoxAsset;
let textBoxAssetYellow;
let cursor;
let textLetGo = true;
let textList = [];
let breakCount;
let isText = false;

let isRun = false;
let letGo = true;


let battleID;
let turnState;
let currentOption = 1;
let turnCount;
let actionN;
let actionB;
let actionM;
let actionC;
let action1;
let playerOldX;
let playerOldY;

let naomiList;
let baerenList;
let mariaList;
let cryceList;

class Test { //----------------------------------------------------------------}
//Used for debug purposes only.
  constructor() {
    // this.x = 108;
    // this.y = 108;

    // this.x = 540;
    // this.y = 492;

    //7 Right
    //10 Down

    this.x = 156;
    this.y = 228;
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
    fill(255, 0, 0);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.size, this.size);
    rectMode(CORNER);
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

class Player {
  constructor() {
    // this.x = 108;
    // this.y = 108;

    // this.x = 540;
    // this.y = 492;

    //7 Right
    //10 Down

    this.x = 156;
    this.y = 228;
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
    // if (this.facing === "up") {
    //   fill(255, 255, 0);
    // }
    // else if (this.facing === "left") {
    //   fill(0, 255, 0);
    // }
    // else if (this.facing === "down") {
    //   fill(0, 0, 255);
    // }
    // else if (this.facing === "right") {
    //   fill(255, 0, 0);
    // }
    fill(0, 0, 255);
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
class NPC {
  constructor(x, y) {
    this.x = x + 12;
    this.y = y + 12;
  }
  display() {
    fill(128, 128, 0);
    noStroke();
    rect(this.x, this.y, cellSize, cellSize);
  }
}
class PartyMember {
  constructor(h, m, o, d, i, a, l) {
    this.health = h;
    this.magic = m;
    this.offence = o;
    this.defence = d;
    this.initiative = i;
    this.agility = a;
    this.luck = l;
  }
}
class Enemy {
  constructor(h, m, o, d, i, a, l, gold) {
    this.health = h;
    this.magic = m;
    this.offence = o;
    this.defence = d;
    this.initiative = i;
    this.agility = a;
    this.luck = l;
    this.goldGiven = gold;
  }
}

class SpecialMove {
  constructor(name) {
    if (name === "Raise") {
      this.name = "Charge";
      this.user = "Naomi";
      this.type = "Charge";
      this.effect = 1;
      this.limit = 3;
    }
  }
  data() {
    if (this.name === "Raise") {
      if (this.limit === 0) {
        this.name = "Raise";
      }
      else if (this.limit < 0) {
        this.limit = 0;
      }
      else {
        this.name = "Soulslay";
        this.type = "ChargeAttack";
        this.effect = 999;
      }
    }
  }
  activate() {
    if (this.type === "Charge") {
      if (this.limit < 0) {
        this.limit -= this.effect;
      }
    }
    if (this.type === "ChargeAttack") {
      return this.effect;
    }
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
    stroke(0, 0, 0, this.alphaNum);
    rect(this.location, this.location, windowSize, windowSize);
  }
}

function preload() { //--------------------------------------------------------}
  layout0 = loadStrings("assets/TestGrid.txt");
  layout00 = loadStrings("assets/TestGrid2.txt");
  cellLayout = loadStrings("assets/PrisonCell.txt");
  titleScreenAsset = loadImage("assets/Title Screen.png");
  textBoxAsset = loadImage("assets/Textbox.png");
  textBoxAssetYellow = loadImage("assets/TextboxYellow.png");
  cursor = loadImage("assets/Cursor.png");
}

function setup() { //----------------------------------------------------------}
  createCanvas(windowSize, windowSize);
  background(128);
  rectMode(CENTER);
  imageMode(CENTER);

  grid = cellLayout;
  rows = grid[0].length;
  cols = grid[0].length;
  cellSize = windowSize / rows;

  toggleMap();
  cleanupGrid();
  readyGrid();

  hero = new Player();
  pitch = new Blackout();
  tester = new Test();
  if (testingLayouts === true) {
    gameState = 0;
    layout = 0;
    scriptState = -1;
  }
  else {
    gameState = -3;
    textState = 0;
  }
}

function draw() { //-----------------------------------------------------------}
  // console.log(scriptState);
  // console.log(gameState);
  // console.log(textState);
  // console.log(gameCounter);
  // console.log(increase);
  // console.log(keyCode);
  revertText();
  if (gameState === -3) {
    titleScreen();
  }
  else {
    counterUp();
  }
  scriptManage();
  if (gameState === 0) {
    bgManage();
    hero.display();
    hero.detectWalls();
    hero.cooldown();
    hero.toggleSpeed();
    hero.move();
    toggleMap();
  }
  detectText();
  detectMapChange();
  runToggle();
  battleStart();
  if (testing === true) {
    tester.display();
    tester.detectWalls();
    tester.cooldown();
    tester.toggleSpeed();
    tester.move();
  }
}

function titleScreen() {
  pitch.display();
  image(titleScreenAsset, 300, 200);
  if (keyIsPressed) {
    scriptState = 1;
  }
}

function counterUp() {
  if (increase === true) {
    gameCounter += 1;
  }
}

function resetCounter() {
  gameCounter = 0;
}

function cleanupGrid() {
  for (let i = 0; i < 2; i++) {
    layout = i;
    toggleMap();
    for (let j = 0; j < grid.length; j++) {
      grid[j] = grid[j].split("");
    }
  }
  if (testingLayouts === true) {
    layout = 0;
  }
  else {
    layout = 1;
  }
  toggleMap();
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

function scriptManage() {
  if (scriptState === 1) {
    gameState = -2;
    pitch.display();
    if (gameCounter >= 100) {
      activateText(0, "...My head still hurts...|...Ugh.", 1);
    }
  }
  if (scriptState === 2) {
    gameState = -2;
    bgManage();
    hero.display();
    pitch.display();
    increase = true;
    if (gameCounter >= 100) {
      pitch.alphaNum -= 255;
      resetCounter();
      scriptState = 3;
    }
  }
  if (scriptState === 3) {
    bgManage();
    hero.display();
    increase = true;
    if (gameCounter >= 50) {
      grid[12][13] = 0;
      sergeant = new NPC(288, 384);
      sergeant.display();
      if (gameCounter >= 60) {
        sergeant.y -= 24;
        bgManage();
        hero.display();
        sergeant.display();
        if (gameCounter >= 70) {
          sergeant.y -= 24;
          bgManage();
          hero.display();
          sergeant.display();
          scriptState = 4;
        }
      }
    }
  }
  if (scriptState === 4) {
    bgManage();
    hero.display();
    sergeant.display();
    increase = false;
    resetCounter();
    activateText(0, "Get up. The captain wants to see you.", 2);
  }
  if (scriptState === 5) {
    gameState = -2;
    bgManage();
    hero.display();
    sergeant.display();
    if (gameCounter >= 70) {
      activateText(0, "...No. I'm tired.|I'll see your captain later.", 3);
    }
  }
  if (scriptState === 6) {
    gameState = -2;
    bgManage();
    hero.display();
    sergeant.display();
    activateText(0, "You don't have much of a choice here.|You're a captive on OUR ship.", 4);
  }
  if (scriptState === 7) {
    gameState = -2;
    hero.display();
    sergeant.display();
    bgManage();
    if (gameCounter >= 50) {
      scriptState = 8;
    }
  }
  if (scriptState === 8) {
    activateText(0, "Of course I have a choice.|Everyone does, at any given point.|Just like you do, right here and now.|You can either draw your blade and fight...|...Or I'll leave of my own volition.", 5);
  }
  if (scriptState === 9) {
    gameState = -2;
    activateText(0, "...|...Ok then.|Have at you!!", 6);
  }
  if (scriptState === 10) {
    if (gameState === -1) {
      playerOldX = hero.x;
      playerOldY = hero.y;
      turnState = 1;
      turnCount = 0;
      currentOption = 1;
      gameState = 1;
    }
  }
}

function toggleMap() {
  if (layout === 0) {
    grid = layout0;
  }
  else if (layout === -1) {
    grid = layout00;
  }
  if (layout === 1) {
    grid = cellLayout;
  }
}

function bgManage() {
  for (let i = 0; i < groundList.length - 1; i++) {
    if (gameState === 0 || gameState === -1 || scriptState === 2 || scriptState === 3) {
      groundList[i].display();
    }
  }
  for (let i = 0; i < wallList.length - 1; i++) {
    if (gameState === 0 || gameState === -1 || scriptState === 2 || scriptState === 3) {
      wallList[i].display();
    }
  }
  for (let i = 0; i < objectList.length - 1; i++) {
    if (gameState === 0 || gameState === -1 || scriptState === 2 || scriptState === 3) {
      objectList[i].display();
    }
  }
}

function detectMapChange() {
  if (layout === 0) {
    if (hero.x === 588 && hero.y === 492) {
      gameState = -3;
      transition(36, 492, -1);
    }
  }
  if (layout === -1) {
    if (hero.x === 12 && hero.y === 492) {
      gameState = -3;
      transition(564, 492, 0);
    }
  }
}

function activateText(speaker, textID, promptID) {
  if (promptID !== -1) {
    gameState = -1;
    textList = [];
    breakCount = 0;
  }
  divideText(textID);
  if (gameState === -1) {
    if (breakCount === 0) {
      if (textState < 1) {
        if (speaker === 0) {
          if (promptID === 2 || promptID === 4 || promptID === 6) {
            image(textBoxAssetYellow, 300, 500, 550, 150);
            fill(255);
            textSize(24);
            text(textID, 250, 500, 410, 115);
          }
          else {
            image(textBoxAsset, 300, 500, 550, 150);
            fill(255);
            textSize(24);
            text(textID, 250, 500, 410, 115);
          }
        }
        // else {
        //   image(textBoxAsset, 300, 500, 550, 150);
        //   fill(255);
        //   textSize(24);
        //   text(textID, 400, 500, 410, 115);
        // }
      }
      else {
        if (promptID === 2) {
          increase = true;
          scriptState = 5;
        }
        else if (promptID === -1) {
          isText = false;
          gameState = 0;
        }
      }
    }
    else {
      if (textState <= breakCount) {
        if (speaker === 0) {
          let newText = split(textID, "|");
          if (promptID === 2 || promptID === 4 || promptID === 6) {
            image(textBoxAssetYellow, 300, 500, 550, 150);
            fill(255);
            textSize(24);
            text(newText[textState], 250, 500, 410, 115);
          }
          else {
            image(textBoxAsset, 300, 500, 550, 150);
            fill(255);
            textSize(24);
            text(newText[textState], 250, 500, 410, 115);
          }
        }
        // else {
        //   let newText = split(textID, "|");
        //   image(textBoxAsset, 300, 500, 550, 150);
        //   fill(255);
        //   textSize(24);
        //   text(newText[textState], 400, 500, 410, 115);
        // }
      }
      else {
        if (promptID === 1) {
          increase = false;
          resetCounter();
          scriptState = 2;
        }
        if (promptID === 3) {
          increase = false;
          resetCounter();
          textState = 0;
          scriptState = 6;
        }
        if (promptID === 4) {
          resetCounter();
          increase = true;
          hero.y += 24;
          hero.display();
          sergeant.display();
          bgManage();
          scriptState = 7;
        }
        if (promptID === 5) {
          increase = false;
          resetCounter();
          scriptState = 9;
        }
        if (promptID === 6) {
          scriptState = 10;
        }
        else {
          gameState = 0;
        }
      }
    }
  }
}

function detectText() {
  if (isText === true) {
    if (layout === -1) {
      gameState = -1;
      textList = [];
      breakCount = 0;
      activateText(0, "This is sample text.", -1);
    }
  }
}

//"This text is a blessed mess of the best text test."

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

function revertText() {
  if (gameState !== -1) {
    textState = 0;
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

function keyPressed() {
  if (gameState === 1) {
    if (turnState === 1) {
      if (keyCode === 87) {
        if (currentOption > 1) {
          currentOption -= 1;
        }
      }
      if (keyCode === 83) {
        if (currentOption < 4) {
          currentOption += 1;
        }
      }
    }
  }
  if (keyCode === 79) {
    if (gameState === -1) {
      textState += 1;
    }
    if (gameState === 0) {
      if (hero.objUp === true && hero.facing === "up" || hero.objLeft === true && hero.facing === "left" || hero.objDown === true && hero.facing === "down" || hero.objRight === true && hero.facing === "right") {
        if (layout === -1) {
          textState = 0;
          isText = true;
        }
      }
    }
    if (gameState === 1) {
      turnState += 1;
    }
  }
}

function battleStart() {
  if (gameState === 1) {
    if (scriptState === 10) {
      let naomiFighter = new PartyMember(100, 100, 9, 7, 4, 10, 9);
      let charge = new SpecialMove("Raise");
      let sergeant = new Enemy(10, 15, 26, 5, 5, 5, 3, 30);
      hero.x = 500;
      hero.y = 300;
      sergeant.x = 100;
      sergeant.y = 300;
    }
    pitch.alphaNum += 255;
    pitch.display();
    hero.display();
    sergeant.display();
    if (turnState === 1) {
      image(textBoxAsset, 300, 500, 550, 150);
      fill(255);
      text("Fight", 450, 425);
      text("Magic", 450, 475);
      text("Defend", 450, 525);
      text("Flee", 450, 575);
      image(cursor, 400, 375 + 50 * currentOption);
    }
  }
}
