//\\//\\//\\//\\//\\//\\//\\
// Kill Land              \\
// Callan Fehr            \\
// Initiated 9/14/2018    \\
//\\//\\//\\//\\//\\//\\//\\

let pistolAmmo;
let blunderAmmo;
let ak47Ammo;
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
let scroller;
let timeBetween;
let penguinTrue;

function preload() {
  imgMan = loadImage("assets/Stk.png");
  imgGun0 = loadImage("assets/Pistol.png");
  imgGun1 = loadImage("assets/Shotgun.png");
  imgGun2 = loadImage("assets/AK47.png");
  imgGun3 = loadImage("assets/Rifle.png");
  imgGun4 = loadImage("assets/PenguinGun.png");
  imgBang = loadImage("assets/BangBang.png");
  imgBlargh = loadImage("assets/PenguinGunFiring.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pistolAmmo = 20;
  blunderAmmo = 5;
  ak47Ammo = 60;
  rifleAmmo = 10;
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
  scroller = 0;
  penguinTrue = false;
}

function draw() {
  moveMan();
  displayMan();
  displayGun();
  switchGun();
  // playEffects();
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
}

function displayGun() {
  if (gun % 5 === 0) {
    image(imgGun0, (x + 9), (y + 10));
  }
  else if ((gun - 1)% 5 === 0) {
    image(imgGun3, (x + 9), (y + 10));
  }
  else if ((gun - 2)% 5 === 0) {
    image(imgGun1, (x + 9), (y + 10));
  }
  else if ((gun - 3)% 5 === 0) {
    if (penguinTrue === true) {
      image(imgGun4, (x + 9), (y + 10));
    }
    else {
      gun += 1;
    }
  }
  else if ((gun - 4)% 5 === 0) {
    image(imgGun2, (x + 9), (y + 10));
}

}

function mouseWheel(event) {
  print(event.delta);
  if (event.delta > 0) {
    scroller += 2;
  }
  else if (event.delta < 0) {
    scroller -= 2;
  }
}

function switchGun() {
  gun = scroller;
}

// function playEffects() {
//   while (mouseIsPressed && (gun % 5 === 0)) {
//     timeBetween = 6;
//     image(imgBang, (x + 20), (y + 10));
//   }
//   while (mouseIsPressed && ((gun - 2)% 5 === 0)) {
//     timeBetween = 8;
//     image(imgBang, (x + 20), (y + 10));
//   }
//   while (mouseIsPressed && ((gun - 4)% 5 === 0)) {
//     timeBetween = 4;
//     image(imgBang, (x + 20), (y + 10));
//   }
//   while (mouseIsPressed && ((gun - 1)% 5 === 0)) {
//     timeBetween = 12;
//     image(imgBang, (x + 20), (y + 10));
//     pause(timeBetween);
//   }
//   while (mouseIsPressed && ((gun - 3)% 5 === 0)) {
//     timeBetween = 2;
//     image(imgBlargh, (x + 9), (y + 10));
//   }
// }
