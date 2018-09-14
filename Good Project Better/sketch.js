var img;
function preload() {
img = loadImage('assets/Shrek Is Not Drek.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(74, 65, 42)
//  loadImage('assets/Swumpy.png', function(img){
//    image(img, (windowWidth/2), (windowHeight/2));
}

function draw() {
    image(img2, (mouseX - 500), (mouseY - 300));
}
