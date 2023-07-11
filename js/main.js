function setup() {
    createCanvas(windowWidth, windowHeight);
    noSmooth();
}

function draw() {
    const m = 1000;

    const topR = 100 * noise(frameCount / m);
    const topG = 100 * noise(1000 + frameCount / m);
    const topB = 100 * noise(2000 + frameCount / m);
    const bottomR = 255 * noise(3000 + frameCount / m);
    const bottomG = 255 * noise(4000  + frameCount / m);
    const bottomB = 255 * noise(5000 + frameCount / m);

    const topColor = color(topR, topG, topB);
    const bottomColor = color(bottomR, bottomG, bottomB);

    for(let y = 0; y < height * 100; y++) {
        const lineColor = lerpColor(topColor, bottomColor, y / height);

        stroke(lineColor);
        line(0, y, width, y);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}