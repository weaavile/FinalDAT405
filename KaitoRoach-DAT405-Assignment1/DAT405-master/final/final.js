let bubbles = [];
var img;
let screms = [];
var r;

//Preloads the 4 images which you can click through on the canvas
function preload() {
  screms[0] = loadImage("assets/screm0.png");
  screms[1] = loadImage("assets/screm1.png");
  screms[2] = loadImage("assets/screm2.png");
  screms[3] = loadImage("assets/screm3.png");
}

function setup() {
  createCanvas(841, 594);
//Ensures that there can only be 50 images on the canvas at one time
  for (let i = 0; i < 50; i++) {
    let x = random(500);
    let y = random(400);
    //Gives each image a random size between 50 and 150 pixels
    let r = random(50, 150);

    let screm = screms[ Math.round(random(screms.length-1)) ]
    //Ensures that when clicked, the "bubble" will change to be the width, height, radius and contents of the next image
    let b = new Bubble(x, y, r, screm);
    bubbles.push(b);
  }
}
//Allows you to click on the image to change them
function mousePressed() {
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].clicked(mouseX, mouseY);
  }
}

function draw() {

  background(255);
  //Allows images to be moveable
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].showImage();
  }
}

class Bubble {
  //Constructs the image into an actual object with the image as a mask
  constructor(x, y, r, img) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.screm = img;

  }
  //When you click on a Possum, it changes to another Possum (out of 4 choices)
  clicked(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r)
    if (px > this.x && px < this.x + this.r && py > this.y && py < this.y + this.r) {

      this.screm = screms[ Math.round(random(screms.length-1)) ]
    }
  }
//Controls how violently the Possums Vibrate
  move() {
    var randX = random(-5, 5);
    var randY = random(-5, 5);

    this.x = this.x + randX;
    this.y = this.y + randY;
  }
//Shows the image on the canvas
  showImage() {

    image(this.screm, this.x, this.y, this.r, this.r);

  }
}
