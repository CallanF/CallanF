// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(74, 65, 42)
//  loadImage('assets/Swumpy.png', function(img){
//    image(img, (windowWidth/2), (windowHeight/2));
}

function draw() {
  loadImage('assets/Shrek Is Not Drek.png', function(img2){
    image(img2, (mouseX - 500), (mouseY - 300));
  })
}
