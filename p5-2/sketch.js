//Space Blaster Pro {
//Callan Fehr, Dylan Yelich, and Meeka Fast

let gun = 1;
let counter = 0;
let backup1 = 0;
let backup2 = 0;

let hero;
let enemyListC = [];
let enemyListD = [];
let shotList = [];
let blunList = [];

let playerSprite;
let creeperSprite;
let dasherSprite;

class Player {
  constructor() {
    this.x = 300;
    this.y = 560;
    this.dy = 5;
    this.ang = 0;
  }
  display() {
    image(playerSprite, this.x, this.y);
    if (gun === 1) {
      rectMode(CENTER);
      noStroke();
      fill(255, 0, 0);
      rect(this.x + 15, 290, 1, 560);
      rectMode(CORNER);
    }
    else if (gun === 2) {
      stroke(255, 0, 0);
      line(this.x + 14, this.y + 4, this.x - 29, this.y - 5);
      line(this.x + 14, this.y + 4, this.x + 61, this.y - 5);
    }
  }
  move() {
    this.x = mouseX;
  }
  shoot() {
    if (mouseIsPressed === true) {
      if (gun === 1) {
        if (backup1 === 0 || backup1 - counter <= -4) {
          let shot = new Bullet(this.x);
          shotList.push(shot);
          backup1 = counter;
        }
      }
      else if (gun === 2) {
        if (backup2 === 0 || backup2 - counter <= 0) {
          for (let i = 0; i < 30; i++) {
            let blun = new Blunder(this.x);
            blunList.push(blun);
            backup2 = counter;
          }
        }
      }
    }
  }
}
class Creeper{
  constructor() {
    this.x = random(600);
    this.y = 10;
    this.dy = 1;
    this.health = 20;
  }
  display() {
    image(creeperSprite, this.x, this.y);
  }
  move() {
    this.y += this.dy;
  }
  collide() {
    if (dist(this.x, this.y, Bullet.x, Bullet.y) < 2 || dist(this.x, this.y, Blunder.x, Blunder.y) < 2) {
      this.health -= 1;
    }
  }
  die() {
    if (this.health <= 0) {
      enemyListC.pop(this);
    }
  }
}

class Dasher {
  constructor() {
    this.x = random(600);
    this.y = 10;
    this.dx = 5;
    this.dy = 2;
    this.health = 5;
  }
  display() {
    image(dasherSprite, this.x, this.y);
  }
  move() {
    this.y += this.dy;
  }
  sine() {
    for (let i = 0; i < 5; i++) {
      this.x += this.dx;
    }
    for (let i = 0; i < 5; i++) {
      this.x -= this.dx;
    }
  }
  collide() {
    if (dist(this.x, this.y, Bullet.x, Bullet.y) < 2 || dist(this.x, this.y, Blunder.x, Blunder.y) < 2) {
      this.health -= 1;
    }
  }
  die() {
    if (this.health <= 0) {
      enemyListD.pop(this);
    }
  }
}

class Bullet {
  constructor(x) {
    this.x = x + 15;
    this.y = 570;
    this.dy = -4;
  }
  display() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, 3, 3);
  }
  move() {
    this.y += this.dy;
  }
  collide() {
    if (dist(this.x, this.y, Creeper.x, Creeper.y) < 2 || dist(this.x, this.y, Dasher.x, Dasher.y) < 2) {
      shotList.pop(this);
    }
    if (this.y < 0) {
      shotList.pop(this);
    }
  }
}

class Blunder {
  constructor(x) {
    this.x = x + 15;
    this.y = 570;
    this.dx = random(-3, 3);
    this.dy = random(-5, -1);
  }
  display() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, 3, 3);
  }
  move() {
    this.x += this.dx;
    this.y += this.dy;
  }
  collide() {
    if (dist(this.x, this.y, Creeper.x, Creeper.y) < 2 || dist(this.x, this.y, Dasher.x, Dasher.y) < 2) {
      blunList.pop(this);
    }
    if (this.y < 0) {
      blunList.pop(this);
    }
  }
}

function preload() {
  playerSprite = loadImage("assets/Player.png");
  creeperSprite = loadImage("assets/Creeper.png");
  dasherSprite = loadImage("assets/Dasher.png");
}

function setup() {
  createCanvas(600, 600);
  hero = new Player();
}

function draw() {
  background(0, 0, 30);
  hero.display();
  hero.move();
  hero.shoot();
  spawnEnemies();
  enemyManage();
  shotManage();
  switchAmmo();
  coolDown();
}

function spawnEnemies() {
  if (random(100) >= 96) {
    let enc = new Creeper;
    enemyListC.push(enc);
  }
  if (random(100) <= 1) {
    let end = new Dasher;
    enemyListD.push(end);
  }
}

function enemyManage() {
  for (let i = 0; i < enemyListC.length - 1; i++) {
    enemyListC[i].display();
    enemyListC[i].move();
    enemyListC[i].collide();
    enemyListC[i].die();
  }
  for (let i = 0; i < enemyListD.length - 1; i++) {
    enemyListD[i].display();
    enemyListD[i].move();
    enemyListD[i].sine();
    enemyListD[i].collide();
    enemyListD[i].die();
  }
}

function shotManage() {
  for (let i = 0; i < shotList.length - 1; i++) {
    shotList[i].display();
    shotList[i].move();
    // shotList[i].collide();
  }
  for (let i = 0; i < blunList.length - 1; i++) {
    blunList[i].display();
    blunList[i].move();
    // blunList[i].collide();
  }
}

function switchAmmo() {
  if (keyIsPressed && key === "z") {
    gun = 1;
  }
  if (keyIsPressed && key === "x") {
    gun = 2;
  }
}


function coolDown() {
  counter += 1;
}
