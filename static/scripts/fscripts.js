let image = null;
let grayImg = null;
let redImg = null;
let blurImg = null;
let rainbowImg = null;
let frameImg = null;
let reset = null;
let canvas1 = document.getElementById("can1");

function load() {
  let fileinput = document.getElementById("image");
  image = new SimpleImage(fileinput);
  grayImg = new SimpleImage(fileinput);
  redImg = new SimpleImage(fileinput);
  blurImg = new SimpleImage(fileinput);
  rainbowImg = new SimpleImage(fileinput);
  frameImg = new SimpleImage(fileinput);
  reset = new SimpleImage(fileinput);
  image.drawTo(canvas1);
}

function doGray() {
  notloaded();
  for (let pixel of grayImg.values()) {
    let avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  grayImg.drawTo(canvas1);
  alert("Grayscale filter is applying. Click OK to proceed.");
}

function doRed() {
  notloaded();
  for (let pixel of redImg.values()) {
    if (pixel.getRed() < 250) {
      pixel.setRed(250);
    }
  }
  redImg.drawTo(canvas1);
  alert("Red filter is applying. Click OK to proceed.");
}

function doFrame() {
  notloaded();
  let height = frameImg.getHeight();
  let width = frameImg.getWidth();
  for (let pixel of frameImg.values()) {
    if (pixel.getY() > height - 30 || pixel.getY() < 30 || pixel.getX() > width - 30 || pixel.getX() < 30) { pixel.setRed(128); pixel.setGreen(128); pixel.setBlue(0); }
  }
  frameImg.drawTo(canvas1);
  alert("Frame filter is applying. Click OK to proceed.");
}

function doClear() {
  notloaded();
  for (let pixel of reset.values()) {
    let Pixels = image.getPixel(pixel.getX(), pixel.getY());
    reset.setPixel(pixel.getX(), pixel.getY(), Pixels)
  }
  reset.drawTo(canvas1);
}

function doRainbow() {
  notloaded();
  let width = rainbowImg.getWidth();
  let height = rainbowImg.getHeight();
  for (let pixel of rainbowImg.values()) {
    let x = pixel.getX();
    let y = pixel.getY();
    let avg = (pixel.getRed() + pixel.getGreen() + pixel.getGreen()) / 3;
    if (y < height / 10) {
      pixel.setRed(2 * avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    }
    if (y > (height / 10) && y < (2 * height / 10)) {
      pixel.setRed(2 * avg);
      pixel.setGreen(avg);
      pixel.setBlue(0);
    }
    if (y > (2 * height / 10) && y < (3 * height / 10)) {
      pixel.setRed(2 * avg);
      pixel.setGreen(2 * avg);
      pixel.setBlue(0);
    }
    if (y > (3 * height / 10) && y < (4 * height / 10)) {
      pixel.setRed(0);
      pixel.setGreen(2 * avg);
      pixel.setBlue(0);
    }
    if (y > (4 * height / 10) && y < (5 * height / 10)) {
      pixel.setRed(0);
      pixel.setGreen(2 * avg);
      pixel.setBlue(avg);
    }
    if (y > (5 * height / 10) && y < (6 * height / 10)) {
      pixel.setRed(0);
      pixel.setGreen(2 * avg);
      pixel.setBlue(2 * avg);
    }
    if (y > (6 * height / 10) && y < (7 * height / 10)) {
      pixel.setRed(0);
      pixel.setGreen(0);
      pixel.setBlue(2 * avg);
    }
    if (y > (7 * height / 10) && y < (8 * height / 10)) {
      pixel.setRed(avg);
      pixel.setGreen(0);
      pixel.setBlue(avg);
    }
    if (y > (8 * height / 10) && y < (9 * height / 10)) {
      pixel.setRed(avg);
      pixel.setGreen(avg);
      pixel.setBlue(avg);
    }
  }
  rainbowImg.drawTo(canvas1);
  alert("Rainbow filter is applying. Click OK to proceed.");
}

function doBlur() {
  notloaded();
  let width = blurImg.getWidth();
  let height = blurImg.getHeight();
  for (let pixel of blurImg.values()) {
    let num = Math.random();
    let dot = Math.ceil(num * 10);
    let x = pixel.getX();
    let y = pixel.getY();
    let newX = Math.min(x + dot, width - 1);
    let newY = Math.min(y + dot, height - 1);
    if (num < 5) {
      let pixel2 = blurImg.getPixel(newX, newY);
      blurImg.setPixel(x, y, pixel2);
    }
  }
  blurImg.drawTo(canvas1);
  alert("Blur filter is applying. Click OK to proceed.");
}

function notloaded() {
  if (image == null || !image.complete()) {
    alert("Image is not loaded.");
  }
}
