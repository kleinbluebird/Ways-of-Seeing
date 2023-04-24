let x = 50;
let y = 50;
let speed = 5;

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(0);
    noStroke();
    fill(255);
    ellipse(x, y, 50, 50);

    x += speed;
    if (x > width - 25 || x < 25) {
        speed = -speed;
    }
}