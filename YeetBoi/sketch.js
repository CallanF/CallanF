// Supah Yeet Boi
// Meeka Fast
// The Basic AI of a boss battle

class Particle { //creating thee shard enemies
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 15;
    this.dx = random(3, 10);
    this.dy = random(0, 0);
    this.transparency = 255;
    this.color = color(150, this.transparency);
  }
  display() {
    fill(this.color);
    stroke(this.color);
    rect(this.x, this.y, this.size, this.size);
  }

  update() {
    this.transparency -= 0.1;
    this.color.setAlpha(this.transparency);
    this.x += this.dx;
    this.y += this.dy;

  }
}

class Chad { //creating a Walker to play as
  constructor(x, y) {
		this.chadX = 1000;
		this.chadY = 10;
		this.chadW = 10;
		this.chadDy = 5;
    this.color = "Red";
  }

  display() {  //Pretty explanitory. Just fills and displays
     fill(this.color);
 		 stroke(this.color);
  	 ellipse(this.chadX, this.chadY, this.chadW, this.chadW);
  }
  update() {  //walker and wall detection
    if (key === "w" || key === "W") {
   	  this.chadY = this.chadY - this.chadDy;
	  }
  	else if (key === "s" || key === "S") {
   		this.chadY = this.chadY + this.chadDy;
 	 	}
    if (this.chadY <= 0 + this.chadW) {
      this.chadY = this.chadW;
    }
    else if (this.chadY >= 400 - this.chadW) {
      this.chadY = 390;
    }
  }

  collideCheck(someBox) { //Our detection checker
    let isHitting = collideRectCircle(someBox.x, someBox.y, someBox.size, someBox.size, this.x, this.y, this.chadW);
      console.log(isHitting);
  }
}


// varibles

let bossChad = new Chad(600, 300);
let shards = [];
let glassShoot = 3000;
let lastStateChange = 0;
let someParticle;
let collided = false;

function setup() { // creating a canvas and setting up particle
  createCanvas(windowWidth, 400);
  someParticle = new Particle(10, 10);
}

function draw() { //this will display the objects as well as hold where resets take place
  background(255);
  bossChad.display();
  bossChad.update();
  bossChad.collideCheck(someParticle);


  displayShards();
  if (bossChad.chadX === someParticle.x) {
    if (bossChad.chadY === someParticle.y) {
      collided = 1;
    }
  }
 if (collided === 1) {
   background(0);
 }
  for (let i = shards.length - 1; i >= 0; i--) { // this adds more shards to the array
    bossChad.collideCheck(shards[i]);
    if (shards[i].transparency <= 0) {
      shards.splice(i, 1);
    } else {

      shards[i].update();
      shards[i].display();
    }
  }
}

function displayShards() { // this will have the glass shards slowly increase in amount while at random speeds
  	let elapsedTime = millis() - lastStateChange;
  	if (elapsedTime >= glassShoot) {
			let someParticle = new Particle(windowWidth - windowWidth, random( windowHeight - windowHeight, windowHeight));
  		shards.push(someParticle);
      lastStateChange = lastStateChange + 300;

  	}

}

function detectHit() {
  if (bossChad.y === someParticle.y && bossChad.x === somaParticle.x){  // collision detected
      // Make game stop moving and then have a thingy that'll make x restart or something
      collided = true;
  }
}

function restart() {
  if (collided = true) {
    for (let i = 0; i > 0; i--) {
      shards[i].pop;
    }
  }
}
