// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state;
let middleX;
let middleY;
let imgShrek;
let imgFiona;
let imgFarquaad;
let imgSwamp;
let imgFarquaadCastle;
let imgThrone;
let imgText1;
let imgText2;
let imgTextBox;
let imgShrlooking;
let imgArrUp;
let imgArrDn;
let imgArrRt;
let imgArrLf;
let scalar;
let textDone;

function preload() {
  imgShrek = loadImage("assets/Shrek Is Not Drek.png");
  imgFarquaad = loadImage("assets/Farquaad.png");
  imgSwamp = loadImage("assets/Swumpy.png");
  imgFarquaadCastle = loadImage("assets/Duloc.jpg");
  imgThrone = loadImage("assets/ThroneRoom.jpg");
  imgText1 = loadImage("assets/Text1AltWhiteReal.png");
  imgText2 = loadImage("assets/Text2.png");
  imgTextBox = loadImage("assets/TextBox.png");
  imgShrlooking = loadImage("assets/ShrekLookingtotheSide - Copy.jpg");
  imgArrUp = loadImage("assets/ArrUp.png");
  imgArrDn = loadImage("assets/ArrDown.png");
  imgArrRt = loadImage("assets/ArrRight.png");
  imgArrLf = loadImage("assets/ArrLeft.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  middleX = windowWidth/2;
  middleY = windowHeight/2;
  scalar = 0.25;
  state = 0;
  textDone = false;
  imageMode(CENTER);
}

function draw() {
  locationShrek();
  Shrookles();
  shrextDisplay();
  detectStateChange();
  rectMode(CENTER);
//  rect(middleX, middleY, 300, 400);
}

function Shrookles() {
  image(imgShrek, mouseX, mouseY, imgShrek.width * scalar, imgShrek.height * scalar);
}

function locationShrek() {
  if (state === 0) {
    image(imgSwamp, middleX, middleY, windowWidth, windowHeight);
    image(imgArrLf, middleX - 700, middleY, width/10, height/4);
  }
  else if (state === 1) {
    image(imgFarquaadCastle, middleX, middleY, windowWidth, windowHeight);
    image(imgArrRt, middleX + 700, middleY, width/10, height/4);
  }
  else if (state === 2) {
    image(imgThrone, middleX, middleY, windowWidth, windowHeight);
    image(imgFarquaad, middleX, middleY, width * scalar, height * scalar);
  }
  else if (state === 3) {
    image(imgSwamp, middleX, middleY, windowWidth, windowHeight);
  }
}

function shrextDisplay() {
  if (state === 0 && textDone === false) {
    image(imgTextBox, middleX, middleY + 250, width - 50);
    image(imgShrlooking, middleX - 500, middleY + 250, width / 3.5, height / 3.5);
    image(imgText1, middleX + 200, middleY + 280);
    if (mouseIsPressed && mouseX > 50 && mouseX < windowWidth - 50) {
      textDone = true;
    }
  }
}

function detectStateChange() {
  if (mouseIsPressed && mouseX <= 50) {
    if (state === 0) {
      state = 1;
      textDone = false;
    }
  }
  if (mouseIsPressed && mouseX >= windowWidth - 50) {
    if (state === 1) {
      state = 0;
      textDone = false;
    }
  }
  if (mouseIsPressed && mouseX >= middleX - 150 && mouseX <= middleX + 150 && mouseY >= middleY - 200 && mouseY <= middleY + 200) {
    if (state === 1) {
      state = 2;
      textDone = false;
    }
  }
}
