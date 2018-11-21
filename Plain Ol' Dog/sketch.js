// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Dog {
  // constructor() {
  //   this.name = "fido";
  //   this.age = 0;
  // }
  constructor(name) {
    this.name = name;
    this.age = 0;
  }
  bark() {
    console.log("bork");
    console.log("Th'name's " + this.name);
  }
}

let myDog = new Dog("orglo");
let otherDog = new Dog("spleen");

function setup() {
  createCanvas(windowWidth, windowHeight);
  myDog.bark();
  otherDog.bark();
}

function draw() {

}
