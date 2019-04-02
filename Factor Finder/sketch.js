//Factor Finder
//A simple program to find the factors of a number, which is a lot of work sometimes

let numArray = 0;
let askNum = 0;
let finalNum;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ask();
}

function draw() {
  factors(finalNum);
  text(numArray, 5, 5, windowWidth - 5, windowWidth - 5);
}

function ask() {
  askNum = prompt("Enter a number.", "0");
  finalNum = int(askNum);
}

function factors(number) {
  numArray = [];
  for (let i = 0; i < number; i++) {
    if (number % i === 0) {
      numArray.push(i);
    }
  }
  numArray.push(number);
}
