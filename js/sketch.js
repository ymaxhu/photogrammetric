let numBalls = 24;
let spring = 0.1;
let gravity = 0.001;
let friction = -0.9;
let balls = [];
let font;
var w = window.innerWidth;
var h = window.innerHeight;
const links = ["../scans/Bandsaw.html", 
              "../scans/BentLam.html", 
              "../scans/Bridgeport.html", 
              "../scans/CarvedBowl.html", 
              "../scans/Daybreak_crowd.html",
              "../scans/Daybreak_me.html",
              "../scans/FoldableHarp.html",
              "../scans/ID5thfloor.html",
              "../scans/MetalLathe.html",
              "../scans/MonitorStation.html",
              "../scans/MyKitchen.html",
              "../scans/MyTable.html",
              "../scans/MywoodIITable.html",
              "../scans/Outsidemydoor.html",
              "../scans/Rover.html",
              "../scans/Tablesaw.html"];

function preload(){
  font = loadFont('assets/Archivo.ttf');
}

function setup() {
  createCanvas(w, h);
  textFont(font);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < numBalls; i++) {
    balls[i] = new Ball(
      random(width),
      random(height),
      random(30, 70),
      i,
      balls
    );
  }
  noStroke();
  fill(255, 204);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){
  balls.forEach(ball => {
    ball.clicked();
  });
}

function draw() {
  background(24, 24, 24);
  textAlign(CENTER);
  drawWords(width * 0.5, height * 0.5);
  balls.forEach(ball => {
    ball.collide();
    ball.move();
    ball.display();
  });
}

function drawWords(x, y){
  fill(255, 250);
  textSize(30);
  text('Photogrammetric Memories', x, y);
  textSize(16);
  text('by Max Hu', x, y * 1.1);
  textSize(16);
  text('click on any bubble to start', x, y * 1.8);
  fill(255, 200);
}

class Ball {
  constructor(xin, yin, din, idin, oin) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
  }

  collide() {
    for (let i = this.id + 1; i < numBalls; i++) {
      // console.log(others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }

  move() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
  
  clicked(){
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.diameter){
       location.href = links[Math.floor(Math.random() * links.length)];
    }
  }
}