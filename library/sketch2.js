let shooter;
let bullets = [];
let targets = [];
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  shooter = new Shooter();
  for (let i = 0; i < 15; i++) {
    targets.push(new Target(random(50, width - 50), random(50, 250), 25));
  }
}

function draw() {
  background(20, 30, 60);

  // Draw shooter
  shooter.show();

  // Draw and move bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].move();
    bullets[i].show();

    // Check collisions
    for (let j = targets.length - 1; j >= 0; j--) {
      if (dist(bullets[i].x, bullets[i].y, targets[j].x, targets[j].y) < bullets[i].r + targets[j].r) {
        targets.splice(j, 1);
        bullets.splice(i, 1);
        score += 10;
        break;
      }
    }

    // Remove off-screen bullets
    if (bullets[i] && bullets[i].y < 0) bullets.splice(i, 1);
  }

  // Draw targets
  for (let t of targets) t.show();

  // HUD
  fill(255);
  textSize(22);
  textAlign(LEFT);
  text("Score: " + score, 20, 40);

  if (targets.length === 0 && !gameOver) {
    gameOver = true;
    fill(255, 255, 0);
    textAlign(CENTER, CENTER);
    textSize(48);
    text("🎉 You Cleared All Bubbles! 🎉", width / 2, height / 2);
    textSize(24);
    text("Click to Restart", width / 2, height / 2 + 60);
    noLoop();
  }
}

function mouseMoved() {
  shooter.x = mouseX; // move shooter horizontally with mouse
}

function mousePressed() {
  if (gameOver) {
    restartGame();
    return;
  }
  bullets.push(new Bullet(shooter.x, height - 80));
}

// Shooter Class
class Shooter {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
  }
  show() {
    fill(200);
    rectMode(CENTER);
    rect(this.x, this.y, 60, 20);
    fill(255, 0, 0);
    ellipse(this.x, this.y - 20, 25);
  }
}

// Bullet Class
class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.speed = 10;
  }
  move() {
    this.y -= this.speed;
  }
  show() {
    fill(255, 200, 0);
    ellipse(this.x, this.y, this.r * 2);
  }
}

// Target Class
class Target {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
  show() {
    fill(random(100, 255), random(100, 255), random(255));
    ellipse(this.x, this.y, this.r * 2);
  }
}

function restartGame() {
  score = 0;
  bullets = [];
  targets = [];
  for (let i = 0; i < 15; i++) {
    targets.push(new Target(random(50, width - 50), random(50, 250), 25));
  }
  gameOver = false;
  loop();
}
