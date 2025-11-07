 let colors = ['black', 'red', 'yellow','blue'];
 let bubbles = [];
 function setup() {
 createCanvas(windowWidth, windowHeight);
 background(255);
 }
 function draw() {
 // Draw the bubbles
 for (let bubble of bubbles) {
 fill(bubble.color);
 noStroke();
 ellipse(bubble.x, bubble.y, bubble.size, bubble.size);
 }
 }
 function mouseMoved() {
 // Add a new bubble at the mouse position
 let bubble = {
 x: mouseX,
 y: mouseY,
 size: 20,
 color: random(colors)
 };
 bubbles.push(bubble);
 // Limiting the number of bubbles for performance reasons
 if (bubbles.length > 100) {
 bubbles.shift();
 }
 return false; // Prevent any default browser behavior
 }
