//Project YEET
//Initiated Nov. 16, 2018
//Created by Callan, Mika, and Dylan

let pixelArray = [];

let heroX;
let heroY;
let dx;
let dy;

let rightX;
let leftX;
let groundY;
let ceilingY;

let letGo;

let touchingWallR;
let touchingWallL;
let touchingCeiling;
let touchingGround;

let maxFall;
let doubleJumpUsed;

let imgHero;

let currentImage;
let currentTerrain;
let imgTerrain1;

let gameOverState;

let windowSize = 800;

let halfScreen = windowSize/2;

class Boss {
  constructor() {

  }
}

function preload() {
  imgHero = loadImage("assets/NewStk.png");
  currentTerrain = loadImage("assets/Terrain1.png");
  currentImage = loadImage("assets/Terrain1.png");
}

function setup() {
  createCanvas(windowSize, windowSize);
  imageMode(CENTER);
  heroX = halfScreen;
  heroY = halfScreen;
  dx = 0;
  dy = 0;

  rightX = 0;
  leftX = 0;
  groundY = 0;
  ceilingY = 0;

  letGo = false;

  touchingWallR = false;
  touchingWallL = false;
  touchingCeiling = false;
  touchingGround = true;

  maxFall = 4.5;
  doubleJumpUsed = false;

  gameOverState = false;
}

function draw() {
  image(currentImage, 400, 400, windowWidth, windowHeight);
  loadTerrain(pixelArray);
  displayHero();
  move();
  fall();
  jump();
  // detectGround();
  // scroll();
  // gameOver();
}

function loadTerrain(array) {
  for (let i = 0; i < 400; i++) {
    array.push([]);
    for (let j = 0; j < 400; j++) {
      if (currentImage[])
    }
  }
}

function displayHero() {
  color(50, 50, 255);
  let hero = image(imgHero, heroX, heroY);
  heroX += dx;
  heroY += dy;
}

function move() {
  if (keyIsPressed) {
    if (key === "a" && touchingWallL === false) {
      touchingWallR = false;
      dx = -5;
    }
    else if (key === "a" && touchingWallR === true) {
      dx = 0;
    }
    if (key === "d") {
      touchingWallL = false;
      dx = 5;
    }
  }
  else if (!keyIsPressed) {
    dx = 0;
  }
}

function fall() {
  if (touchingGround === false) {
    if (dy < maxFall) {
      if (keyIsPressed === true && key === "s") {
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

// detectGround() {
//   for (let i = 0; i < pixels.length; i++) {
//     for (let j = 0; j < pixels[i].length; j++) {
//
//     }
//   }
// }
