// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let board = [[0, 1, 0, 0],
  [0, 0, 0, 1],
  [0, 0, 0, 0],
  [0, 1, 0, 0]];
let numRectX;
let numRectY;
let rectWidth;
let rectHeight;
let isBlack;
let posX;
let posY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  numRectX = 4;
  numRectY = 4;
  rectWidth = windowWidth/numRectX;
  rectHeight = windowHeight/numRectY;
}

function draw() {
  drawRects();
}

function drawRects() {
  for (let i = board[0]; i < board; i++) {
    for (let j = board[0][0]; j < board[i]; j++) {
      if (j === 1) {
        posX = windowWidth / numRectX * board[i];
        posY = windowHeight / numRectY * board[j];
        fill(255);
        rect(posX, posY, rectWidth, rectHeight);
      }
      else if (j === 0) {
        posX = windowWidth / numRectX * board[i];
        posY = windowHeight / numRectY * board[j];
        fill(0);
        rect(posX, posY, rectWidth, rectHeight);
      }
    }
  }
}
