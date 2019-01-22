// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
//
// let board = [[0, 1, 0, 0],
//   [0, 0, 0, 1],
//   [0, 0, 0, 0],
//   [0, 1, 0, 0]];
// let numRectX;
// let numRectY;
// let rectWidth;
// let rectHeight;
// let isBlack;
// let posX;
// let posY;
//
// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   rectMode(CENTER);
//   numRectX = 4;
//   numRectY = 4;
//   rectWidth = windowWidth/numRectX;
//   rectHeight = windowHeight/numRectY;
// }
//
// function draw() {
//   drawRects();
// }
//
// function drawRects() {
//   for (let i = board[0]; i < board; i++) {
//     for (let j = board[0][0]; j < board[i]; j++) {
//       if (j === 1) {
//         posX = windowWidth / numRectX * board[i];
//         posY = windowHeight / numRectY * board[j];
//         fill(255);
//         rect(posX, posY, rectWidth, rectHeight);
//       }
//       else if (j === 0) {
//         posX = windowWidth / numRectX * board[i];
//         posY = windowHeight / numRectY * board[j];
//         fill(0);
//         rect(posX, posY, rectWidth, rectHeight);
//       }
//     }
//   }
// }

let rows = 50;
let cols = 50;

let cellSize;

let grid;

let clickCount;

function setup() {
  createCanvas(600, 600);
  cellSize = width/cols;
  grid = createRandom2DArray(cols, rows);
  clickCount = 0;
}

function draw() {
  background(128);
  displayGrid();
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) {
        fill(0);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      if (grid[y][x] === 1) {
        fill(255);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

function createRandom2DArray(cols, rows) {
  let randomGrid = [];
  for (let y = 0; y < rows; y++) {
    randomGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        if (clickCount > 1) {
          randomGrid[y].push(0);
        }
        else {
          randomGrid[y].push(1);
        }
      }
      else if (random(100) > 50) {
        randomGrid[y].push(1);
      }
    }
  }
  return randomGrid;
}

//function mouseClicked() {
  //grid = createRandom2DArray(cols, rows);
//}

function mousePressed() {
  let x = floor(mouseX / cellSize);
  let y = floor(mouseY / cellSize);
  clickCount += 1;

  if (grid[y][x] === 1) {
    grid[y][x] = 0;
  }
  else if (grid[y][x] === 0) {
    grid[y][x] = 1;
  }
}
