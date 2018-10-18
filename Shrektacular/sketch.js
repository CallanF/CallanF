//Project: It's Never Ogre
// Callan Fehr
// Initiated October 3, 2018

let state;
let middleX;
let middleY;
let arrValXR;
let arrValYU;
let arrValXL;
let arrValYD;
let txtBoxPos;
let txtShrekPosX;
let txtShrekPosY;
let txtShrekSclr;
let txtPos1X;
let txtPos1Y;

let imgShrek;
let imgFiona;
let imgFarquaad;

let imgSwamp;
let imgFarquaadCastle;
let imgThrone;
let imgSecret;

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
  imgText1 = loadImage("assets/Text1AltWhite.png");
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
  middleX = windowWidth / 2;
  middleY = windowHeight / 2;
  scalar = 0.25;
  state = 0;
  textDone = false;
  arrValXR = windowWidth - windowWidth / 10;
  arrValYU = windowHeight / 8;
  arrValXL = windowWidth / 10;
  arrValYD = windowHeight - windowHeight / 8;
  txtShrekPosX = middleX - windowWidth / 3;
  txtShrekPosY = middleY + windowHeight / 3;
  txtShrekSclr = windowWidth / 650 + windowHeight / 500;
  txtBoxPos = middleY + windowHeight / 3.1;
  txtPos1X = middleX + windowWidth / 8;
  txtPos1Y = middleY + windowHeight / 2.8;
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
  if (state !== 3) {
    image(imgShrek, mouseX, mouseY, imgShrek.width * scalar, imgShrek.height * scalar);
  }
}

function locationShrek() {
  if (state === 0) {
    image(imgSwamp, middleX, middleY, windowWidth, windowHeight);
    if (textDone === true) {
      image(imgArrLf, arrValXL, middleY, width/10, height/4);
    }
  }
  else if (state === 1) {
    textDone = true;
    image(imgFarquaadCastle, middleX, middleY, windowWidth, windowHeight);
    if (textDone === true) {
      image(imgArrRt, arrValXR, middleY, width/10, height/4);
      image(imgArrUp, middleX, arrValYD, width/4, height/10);
    }
  }
  else if (state === 2) {
    image(imgThrone, middleX, middleY, windowWidth, windowHeight);
    image(imgFarquaad, middleX, middleY, width * scalar, height * scalar);
    if (textDone === true) {
      image(imgArrDn, middleX, arrValYD, width/4, height/10);
    }
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
  if (mouseIsPressed && mouseY >= windowHeight - 50) {
    if (state === 2) {
      state = 1;
      textDone = false;
    }
  }
}
