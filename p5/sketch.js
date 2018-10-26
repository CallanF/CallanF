//Mountain Climber
//Callan F.
//Initiated Oct. 26, 2018

let touchingGround = true;
let touchingWallL = false;
let touchingWallR = false;

let heroX = 300;
let heroY = 300;
let dx = 0;
let dy = 0;

let doubleJumpUsed = false;

let imgHero;

function preload() {
  imgHero = loadImage("assets/Stk.png");
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);
}

function draw() {
  background(128);
  displayStick();
  move();
  jump();
  fall();
}

function displayStick() {
  let hero = image(imgHero, heroX, heroY);
  heroX = heroX + dx;
  heroY = heroY + dy;
}

function jump() {
  if (keyIsPressed && key === "w") {
    if (touchingGround === true || doubleJumpUsed === false) {
      dy = -5;
      touchingGround = false;
    }
  }
}

function fall() {
  if (touchingGround === false) {
    for (let j = dy; j > -5; j--) {
      dy += 1;
    }
  }
}

function move() {
  if (keyIsPressed) {
    if (key === "a" && touchingWallL === false) {
      dx = -5;
    }
    if (key === "d" && touchingWallR === false) {
      dx = 5;
    }
  }
  else if (!keyIsPressed) {
    dx = 0;
  }
}
