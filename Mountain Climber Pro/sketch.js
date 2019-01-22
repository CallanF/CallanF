//Mountain Climber PRO
//Callan F.
//Initiated Oct. 26, 2018

let touchingGround = true;
let touchingWall = false;
let touchingCeiling = false;

let heroX = 590;
let heroY = 590;
let dx = 0;
let dy = -3;
let ceilingY = heroY + 19;

let regFall = false;
let letGo = false;
let maxFall;
let doubleJumpUsed = false;

let imgHero;

let difficulty = "normal";
let gameOverState = false;

let grid;
let squares;
let cellSize;

let windowSize = 600;

function preload() {
  imgHero = loadImage("assets/NewStk.png");
}

function setup() {
  createCanvas(windowSize, windowSize);
  imageMode(CENTER);
  if (difficulty === "easy") {
    squares = 50;
  }
  else if (difficulty === "normal") {
    squares = 25;
  }
  else if (difficulty === "hard"){
    squares = 15;
  }

  cellSize = windowSize / squares;

  maxFall = 5;

  grid = generateGrid(squares);
}

function draw() {
  background(128);
  displayGrid();
  displayStick();
  detectWalls();
  detectGround();
  regulate();
  move();
  fall();
  jump();
  scroll();
  gameOver();
}

function displayStick() {
  //Other options: 9.5 by 31.5 (50%), 14.25 by 47.25 (75%), or 19 by 63 (100%)
  let hero = image(imgHero, heroX + 4, heroY - 12);
  heroX = heroX + dx;
  heroY = heroY + dy;
}

function jump() {
  if (keyIsPressed && key === "w") {
    if (touchingGround === true) {
      letGo = false;
      dy = -4.5;
      touchingGround = false;
    }
    else if (doubleJumpUsed === false && letGo === true) {
      dy = -4.5;
      doubleJumpUsed = true;
    }
  }
  if (!keyIsPressed || keyIsPressed &&  key !== "w") {
    letGo = true;
  }
}

function fall() {
  if (touchingGround === false) {
    if (dy < maxFall) {
      if (keyIsPressed === true && key === "s") {
        if (regFall === true) {
          // dy = 0;
          regFall = false;
        }
        dy += 0.4;
        maxFall = 8;
      }
      else {
        // if (letGo === true) {
        //   dy = 0;
        // }
        dy += 0.1;
        maxFall = 5;
      }
    }
    if (dy > maxFall) {
      dy -= 0.2;
    }
  }
  else {
    dy = 0;
    doubleJumpUsed = false;
  }
}

function regulate() {
  if (letGo === true) {
    regFall = true;
  }
}

function detectWalls() {
  let interestY = heroY - 2;
  let x = floor(heroX / cellSize);
  let y = floor(interestY / cellSize);

  if (grid[y][x] === 1) {
    touchingWall = true;
  }
  else {
    touchingWall = false;
  }
}

function detectGround() {
  let x = floor(heroX / cellSize);
  let y = floor(heroY / cellSize);

  if (grid[y][x] === 1) {
    touchingGround = true;
  }
  else {
    touchingGround = false;
  }
}

// function detectCeiling() {
//
// }

function move() {
  if (keyIsPressed) {
    if (key === "a" && touchingWall === false) {
      dx = -5;
    }
    else if (key === "a" && touchingWall === true) {
      dx = 0;
    }
    if (key === "d") {
      touchingWall = false;
      dx = 5;
    }
  }
  else if (!keyIsPressed) {
    dx = 0;
  }
}

function scroll() {
  if (heroY <= 3) {
    grid = generateGrid(squares);
    heroY = 590;
    dy = -3;
  }
  if (heroY >= 591) {
    gameOverState = true;
  }
}

function gameOver() {
  if (gameOverState === true) {
    dx = 0;
    dy = 0;
  }
}

function displayGrid() {
  for (let y = 0; y < squares; y++) {
    for (let x = 0; x < squares; x++) {
      if (grid[y][x] === 0) {
        fill(255);
        noStroke();
      }
      else {
        fill(0);
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function generateGrid() {
  let randomGrid = [];
  for (let y = 0; y < squares; y++) {
    randomGrid.push([]);
    for (let x = 0; x < squares; x++) {
      if (x === 0) {
        randomGrid[y].push(1);
      }
      else {
        if (randomGrid[y][x-1] !== 0) {
          if (random(100) >= 15) {
            randomGrid[y].push(1);
          }
          else {
            randomGrid[y].push(0);
          }
        }
        else {
          randomGrid[y].push(0);
        }
      }
    }
  }
  return randomGrid;
}
