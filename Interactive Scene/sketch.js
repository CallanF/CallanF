//\\//\\//\\//\\//\\//\\//\\
// Kill Land              \\
// Callan Fehr            \\
// Initiated 9/14/2018    \\
//\\//\\//\\//\\//\\//\\//\\

let pistolAmmo;
let blunderAmmo;
let AK47Ammo;
let penguinAmmo;
let health;
let dead;
let gun;
let score;
let time;
let gunAngle;
let imgMan;
let imgGun1;
let imgGun2;
let imgGun3;
let imgGun4;
let x;
let y;
let dx;
let dy;

function preload() {
  imgMan = loadImage("assets/Stk.png");
  imgGun0 = loadImage("assets/Pistol.png");
  imgGun1 = loadImage("assets/Shotgun.png");
  imgGun2 = loadImage("assets/AK47.png");
  imgGun3 = loadImage("assets/PenguinGun.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pistolAmmo = 20;
  blunderAmmo = 5;
  AK47Ammo = 60;
  penguinAmmo = 0;
  health = 1000;
  dead = false;
  gun = 0;
  score = 0;
  time = 0;
  gunAngle = 0;
  x = (windowWidth/2);
  y = (windowHeight/2);
  dx = 5;
  dy = 5;
}

function draw() {
  moveMan();
  displayMan();
 }

function moveMan() {
  if (keyIsPressed) {
    if (key === "w") {
        y -= dy;
    }
    if (key === "s") {
        y += dy;
    }
    if (key === "a") {
        x -= dx;
    }
    if (key === "d") {
        x += dx;
    }
  }
}

function displayMan() {
  background(255);

  image(imgMan, x, y);
  if (gun === 0) {
    image(imgGun0, (x + 9), (y + 15));
  }
  else if (gun === 1) {
    image(imgGun1, (x + 9), (y + 15));
  }
  else if (gun === 2) {
    image(imgGun2, (x + 9), (y + 15));
  }
  else if (gun === 3) {
    image(imgGun3, (x + 9), (y + 15));
  }
}

function calculateAngle() {
  if (mouseX > x && mouseY > y) {
    gunAngle = (acos((mouseX - x)/(mouseY - y)))
  }
  else if (mouseX < x && mouseY > y) {
    gunAngle = (acos((mouseX - x)/(mouseY - y)))
  }
  else if (mouseX > x && mouseY < y) {
    gunAngle = (acos((mouseX - x)/(mouseY - y)))
  }
  else if (mouseX < x && mouseY < y) {
    gunAngle = (acos((mouseX - x)/(mouseY - y)))
  }
}
