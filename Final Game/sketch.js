//The Grief Game
//By Callan Fehr
//Initiated Wed. March 13, 7:30 PM

let windowSize = 600;

let gameState = 0;
let scriptState = 0;
let textState = 0;

let currentLayout = 0;

let collisionList = [];
let visualList = [];

let dialogue;

let testMapBoth;

let hero = new Player();

class Player {
  constructor() {
    this.x = 300;
    this.y = 300;
    this.dx = 0;
    this.dy = -0;
    this.size = 5;
    this.touchingGround = true;
  }
  display() {
    this.x += this.dx;
    this.y += this.dy;
    fill(255, 0, 0);
    noStroke();
    rect(this.x, this.y, this.size, this.size);
  }
  moveLeft() {
    if (this.dx < 5) {
      this.dx += 0.1;
    }
    this.x += this.dx;
  }
  moveRight() {
    if (this.dx > -5) {
      this.dx -= 0.1;
    }
    this.x += this.dx;
  }
  jump() {
    this.touchingGround = false;
    this.dy = -5;
  }
  fall() {
    if (this.touchingGround === false) {
      if (this.dy < 10) {
        this.dy += 0.2;
      }
    }
  }
  detectGround() {
    if ()
  }
  detectWalls() {

  }
}

function preload() {
  dialogue = loadStrings("assets/Dialogue for my Game.txt");

  testMapBoth = loadImage("assets/TestMap.png");
}

function setup() {
  createCanvas(windowSize, windowSize);
  rectMode(CENTER);
  imageMode(CENTER);
  collisionList.push(testMapBoth);
  for (let i = 0; i < collisionList.length - 1; i++) {
    let collisionArray = [];
    for (let j = 0; j < 300; j++) {
      collisionArray.push([]);
    }
    for (let o = 0; 0 < collisionArray.length; )
  }
  currentLayout = 0;
}

function keyPressed() {
  if (key === 37) {
    if (gameState === 2) {
      hero.moveLeft();
    }
  }
  if (key === 39) {
    if (gameState === 2) {
      hero.moveRight();
    }
  }
  if (key === 90) {
    if (gameState === 2) {
      hero.jump();
    }
  }
  if (key === 88) {

  }
  if (key === 67) {
    if (gameState === 2) {
      summonMenu();
    }
  }
}

function changeLayout() {
  if (currentLayout === 0) {
    image(testMapBoth, 300, 300);
  }
}

function activateText(speaker, textStart) {

}

function summonMenu() {
  gameState = 1;
}
