function setup() {
    // new: keep a variable that holds the canvas element
    let cnv = createCanvas(400, 400);
    // assign the "parent" element to ensure that the canvas
    // is added to the element named "container"
    cnv.parent('container');
}

function draw() {
    background(0);

    ellipse(mouseX, mouseY, 50, 50);
}