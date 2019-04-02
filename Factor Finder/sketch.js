//Factor Finder
//A simple program to find the factors of a number, which is a lot of work sometimes

let numArray;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  factors(372);
  text(numArray, 5, 5, windowWidth - 5, windowWidth - 5);
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
