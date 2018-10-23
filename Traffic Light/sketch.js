// Traffic Light Starter Code
// Dan Schellenberg
// Sept 25, 2018

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/

let state;
let lastSwitch;

const redDur = 4000;
const yowDur = 1000;
const greenDur = 3000;

function setup() {
  createCanvas(600, 600);
  state = 1;
  lastSwitch = 0;
}

function draw() {
  background(255);
  drawOutlineOfLights();
  checkForStateChange();
  displayCorrectLight();
}

function checkForStateChange() {
  let elapsedTime = millis() - lastSwitch;
  if (state === 1 && elapsedTime >= redDur) {
    state = 2;
    lastSwitch = millis();
  }
  else if (state === 2 && elapsedTime >= greenDur) {
    state = 3;
    lastSwitch = millis();
  }
  else if (state === 3 && elapsedTime >= yowDur) {
    state = 1;
    lastSwitch = millis();
  }
}

function displayCorrectLight() {
  if (state === 1) {
    displayRedLight();
  }
  else if (state === 2) {
    displayGreenLight();
  }
  else if (state === 3) {
    displayYowLight();
  }
}

function displayRedLight() {
  fill(255, 0, 0);
  ellipse(width/2, height/2 - 65, 50, 50); //top
}

function displayYowLight() {
  fill(255, 255, 0);
  ellipse(width/2, height/2, 50, 50); //top
}

function displayGreenLight() {
  fill(0, 255, 0);
  ellipse(width/2, height/2 + 65, 50, 50); //top
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}
