//Space Blaster Pro {
//Callan Fehr, Dylan Yelich, and Meeka Fast

let ms;

let hero;
let enemyListC = [];
let enemyListD = [];
let shotList = [];

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
  }
  move() {
    this.x = mouseX;
  }
  shoot() {
    if (keyIsPressed && key === "z") {
      let shot = new Bullet(this.x);
      shotList.push(shot);
    }
  }

}
class Creeper{
  constructor() {
    this.x = random(600);
    this.y = 10;
    this.dy = 2;
  }
  display() {
    image(creeperSprite, this.x, this.y);
  }
  move() {
    this.y += this.dy;
  }
  collide() {

  }
}

class Dasher {
  constructor() {
    this.x = random(600);
    this.y = 10;
    this.dx = 5;
    this.dy = 3;
  }
  display() {
    image(dasherSprite, this.x, this.y);
  }
  move() {
    this.y += this.dy;
  }
  sine() {

  }
  collide() {

  }
}

class Bullet {
  constructor(x) {
    this.x = x + 15;
    this.y = 580;
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
    if (dist(this.x, this.y, Creeper.x, Creeper.y) < 2) {
      delete this;
    }
    if (this.y < 0) {
      delete this;
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
  shotManage();
}

function spawnEnemies() {
  ms += 1;
  if (ms < 0) {
    ms = 0;
    if (random(100) <= 99.99999) {
      if (random(100) <= 99.999999) {
        let enc = new Creeper;
        enemyListC.push(enc);
      }
      else {
        let end = new Dasher;
        enemyListD.push(end);
      }
    }
  }
}

function enemyManage() {
  for (let i = 0; i < enemyListC.length; i++) {
    enemyListC[i].display();
    enemyListC[i].move();
  }
  for (let i = 0; i < enemyListD.length; i++) {
    enemyListD[i].display();
    enemyListD[i].move();
  }
}

function shotManage() {
  for (let i = 0; i < shotList.length - 1; i++) {
    shotList[i].display();
    shotList[i].move();
    shotList[i].collide();
  }
}
