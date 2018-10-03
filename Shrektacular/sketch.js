// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state;
let imgShrek;
let imgDonkey;
let imgFiona;
let imgFarquaad;
let imgCitizen;
let imgSwamp;
let imgFarquaadCastle;
let imgDragonCastle;
let imgWoods;

function preload() {
  imgShrek = loadImage("assets/Shrek Is Not Drek.png");
  imgSwamp = loadImage("assets/Swumpy.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  Shrookles();
}

function Shrookles() {
  image(imgShrek, mouseX - 250, mouseY - 200, 482, 426);
}
