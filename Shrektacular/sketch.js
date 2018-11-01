//Project: It's Never Ogre
// Callan Fehr
// Initiated October 3, 2018

let state;
let stateChanged;
let mouseReset;
let textState;
let textChanged;

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
let imgText3;
let imgText4;
let imgTextBox;


let imgShrlooking;
let imgFrqFace;
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
  imgSecret = loadImage("assets/Art, plural noun.png");

  imgText1 = loadImage("assets/Text1AltWhite.png");
  imgText2 = loadImage("assets/Text2Coloured.png");
  imgText3 = loadImage("assets/Text3Coloured.png");
  imgText4 = loadImage("assets/Text4White.png");
  imgTextBox = loadImage("assets/TextBox.png");

  imgShrlooking = loadImage("assets/ShrekLookingtotheSide - Copy.jpg");
  imgFrqFace = loadImage("assets/FarquaadFace.png");
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
  textState = 1;
  textChanged = false;
  stateChanged = false;
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
  mouseSort();
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
    image(imgSecret, middleX, middleY, windowWidth, windowHeight);
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
  if (state === 2 && textState === 1) {
    image(imgTextBox, middleX, middleY + 250, width - 50);
    image(imgFrqFace, middleX - 500, middleY + 250, width / 3.5, height / 3.5);
    image(imgText2, middleX + 200, middleY + 280, width / 1.5, height / 3.5);
  }
  if (state === 2 && textState === 2) {
    image(imgTextBox, middleX, middleY + 250, width - 50);
    image(imgShrlooking, middleX - 500, middleY + 250, width / 3.5, height / 3.5);
    image(imgText3, middleX + 200, middleY + 280, width / 1.5, height / 3.5);
  }
  if (state === 2 && textState === 3) {
    image(imgTextBox, middleX, middleY + 250, width - 50);
    image(imgFrqFace, middleX - 500, middleY + 250, width / 3.5, height / 3.5);
    image(imgText4, middleX + 200, middleY + 280, width / 1.5, height / 3.5);
  }
}


function detectStateChange() {
  if (mouseIsPressed && mouseX <= 50) {
    if (state === 0) {
      if (mouseReset === true) {
        state = 1;
        textDone = false;
        stateChanged = true;
        mouseReset = false;
      }
    }
  }
  if (mouseIsPressed && mouseX >= windowWidth - 50) {
    if (state === 1) {
      if (mouseReset === true) {
        state = 0;
        textDone = false;
        stateChanged = true;
        mouseReset = false;
      }
    }
  }
  if (mouseIsPressed && mouseX >= middleX - 150 && mouseX <= middleX + 150 && mouseY >= middleY - 200 && mouseY <= middleY + 200) {
    if (state === 1) {
      if (mouseReset === true) {
        state = 2;
        textDone = false;
        stateChanged = true;
        mouseReset = false;
      }
    }
  }
  if (mouseIsPressed && mouseY >= windowHeight - 50) {
    if (state === 2) {
      if (mouseReset === true) {
        state = 1;
        textDone = false;
        stateChanged = true;
        mouseReset = false;
      }
    }
  }
  if (mouseIsPressed && mouseX <= 50) {
    if (state === 1) {
      if (mouseReset === true) {
        state = 3;
        textDone = false;
        stateChanged = true;
        mouseReset = false;
      }
    }
  }
}

function mouseSort() {
  if (mouseIsPressed === true && (stateChanged === true || textChanged === true)) {
    mouseReset = false;
  }
  else if (mouseIsPressed === false) {
    mouseReset = true;
  }
  if ((stateChanged === true || textChanged === true) && mouseIsPressed === false) {
    stateChanged = false;
    textChanged = false;
  }
  if (mouseIsPressed === true & state === 2) {
    if (mouseReset === true) {
      textState += 1;
      textChanged = true;
    }
  }
}
