//Super Yeet Boi
//Callan F.
//Initiated November, 2018

let state;

let touchingGround = true;
let touchingWallL = false;
let touchingWallR = false;
let touchingCeiling = false;

let heroX = 10;
let heroY = 570;
let dx = 0;
let dy = -0;

let regFall = false;
let regFall2 = false;
let wallJumpL = false;
let wallJumpR = false;
let letGo = false;
let maxFall;
let airBrakesUsed = false;
let doubleJumpUsed = false;

let imgHero;
let gameOverState = false;

let grid;
let rows;
let cols;
let cellSize;

let windowSize = 600;

function preload() {
  imgHero = loadImage("assets/NewStk.png");
  grid = loadStrings("assets/Grid1.txt");
}

function setup() {
  createCanvas(windowSize, windowSize);
  imageMode(CENTER);
  rows = grid[0].length;
  cols = grid[0].length;

  cellSize = windowSize / rows;

  maxFall = 5;
  cleanupGrid();
}

function draw() {
  background(128);
  displayGrid();
  displayStick();
  detectGround();
  detectWalls();
  detectCeiling();
  regulate();
  move();
  jump();
  fall();
  // check();
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

function displayStick() {
  //Other options: 9.5 by 31.5 (50%), 14.25 by 47.25 (75%), or 19 by 63 (100%)
  let hero = image(imgHero, heroX, heroY - 12);
  heroX = heroX + dx;
  heroY = heroY + dy;
}

function detectGround() {
  rectMode(CENTER);
  let interestX;
  if (touchingWallL === true) {
    interestX = heroX + 2;
  }
  else if (touchingWallR === true) {
    interestX = heroX - 2;
  }
  else {
    interestX = heroX;
  }
  let x = floor(interestX / cellSize);
  let y = floor(heroY / cellSize);

  if (grid[y][x] === "1") {
    touchingGround = true;
  }
  else {
    touchingGround = false;
  }
  fill(255, 255, 0);
  rect(interestX, heroY, 4, 4);
  rectMode(CORNER);
}

function detectWalls() {
  rectMode(CENTER);
  let interestYA = heroY - 7;
  let interestYB = heroY - 18;
  let interestXR = heroX + 3;
  let interestXL = heroX - 3;
  let xl = floor(interestXL / cellSize);
  let xr = floor(interestXR / cellSize);
  let ya = floor(interestYA / cellSize);
  let yb = floor(interestYB / cellSize);
  if (grid[ya][xl] === "1" || grid[yb][xl] === "1") {
    touchingWallL = true;
  }
  else {
    touchingWallL = false;
  }
  if (grid[ya][xr] === "1" || grid[yb][xr] === "1") {
    touchingWallR = true;
  }
  else {
    touchingWallR = false;
  }
  fill(0, 255, 0);
  rect(interestXL, interestYA, 4, 4);
  fill(0, 255, 0);
  rect(interestXR, interestYA, 4, 4);
  fill(0, 255, 0);
  rect(interestXL, interestYB, 4, 4);
  fill(0, 255, 0);
  rect(interestXR, interestYB, 4, 4);
  rectMode(CORNER);
}

function detectCeiling() {
  rectMode(CENTER);
  let interestX;
  if (touchingWallL === true) {
    interestX = heroX + 2;
  }
  else {
    interestX = heroX;
  }
  if (touchingWallR === true) {
    interestX = heroX - 2;
  }
  else {
    interestX = heroX;
  }
  let interestY = heroY - 23;
  let y = floor(interestY / cellSize);
  let x = floor(interestX / cellSize);
  if (grid[y][x] === "1") {
    dy = 0.1;
    touchingGround = false;
  }
  fill(0, 0, 255);
  rect(interestX, interestY, 4, 4);
  rectMode(CORNER);
}

function move() {
  if (keyIsPressed) {
    if (key === "a" && touchingWallL === false) {
      touchingWallR = false;
      dx = -5;
    }
    else if ((key === "a" || key === "s") && touchingWallL === true) {
      dx = 0;
    }
    if (key === "d"&& touchingWallR === false) {
      touchingWallL = false;
      dx = 5;
    }
    else if ((key === "d" || key === "s") && touchingWallR === true) {
      dx = 0;
    }
  }
  else if (!keyIsPressed) {
    dx = 0;
  }
}

function jump() {
  if (keyIsPressed && key === "w") {
    if (touchingGround === true) {
      letGo = false;
      dy = -4.5;
      touchingGround = false;
      regFall = false;
      regFall2 = false;
      airBrakesUsed = false;
    // }
    // else if (touchingWallL) {
    //   dy = -4.5;
    //   dx = 4;
    // }
    // else if (touchingWallR) {
    //   dy = -4.5;
    //   dx = -4;
    }
    // else if (doubleJumpUsed === false && letGo === true) {
    //   dy = -4.5;
    //   doubleJumpUsed = true;
    //   regFall = false;
    //   regFall2 = false;
    //   airBrakesUsed = false;
    // }
  }
  if (!keyIsPressed || keyIsPressed && key !== "w") {
    letGo = true;
  }
  if (touchingWallL === true || touchingWallR === true) {
    doubleJumpUsed === false;
  }
}

function fall() {
  if (touchingGround === false) {
    if (dy < maxFall) {
      if (keyIsPressed === true && key === "s") {
        dy += 0.6;
        maxFall = 8;
        regFall = true;
      }
      else {
        if (regFall === true) {
          dy = 0;
          regFall2 = true;
        }
        dy += 0.15;
        maxFall = 5;
      }
    }
  }
  else {
    dy = 0;
    doubleJumpUsed = false;
  }
}

function regulate() {
  if (regFall2 === true) {
    regFall = false;
    regFall2 = false;
  }
  // if (wallJumpL === true) {
  //   for (let i = 0; i < 100; i++) {
  //     dx += 0.02;
  //   }
  //   wallJumpL = false;
  // }
  // if (wallJumpR === true) {
  //   for (let i = 0; i < 100; i++) {
  //     dx -= 0.02;
  //   }
  //   wallJumpR = false;
  // }
  // if (airBrakesUsed === false && keyIsPressed && key === "o" && dy <= 0) {
  //   regFall = true;
  //   airBrakesUsed = true;
  // }
}
