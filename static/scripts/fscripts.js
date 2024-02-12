var image = null;
var grayImg = null;
var redImg = null;
var blurImg = null;
var rainbowImg = null;
var frameImg = null;
var reset = null;
var canvas1 = document.getElementById("can1");

function load() {
 var fileinput = document.getElementById("image");
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
 for (var pixel of grayImg.values()) {
   var avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
   pixel.setRed(avg);
   pixel.setGreen(avg);
   pixel.setBlue(avg);
 }
  grayImg.drawTo(canvas1);
  alert("Grayscale filter is applying. Click OK to proceed.");
}

function doRed() {
  notloaded();
  for (var pixel of redImg.values()) {
    if (pixel.getRed() < 250) { 
      pixel.setRed(250);}}
  redImg.drawTo(canvas1);
  alert("Red filter is applying. Click OK to proceed.");
}
  
function doFrame() {
notloaded();
var height = frameImg.getHeight();
var width = frameImg.getWidth();
for (var pixel of frameImg.values())
{ 
    if (pixel.getY() > height-30 || pixel.getY() < 30 || pixel.getX() > width-30 || pixel.getX() < 30)
    { pixel.setRed(128); pixel.setGreen(128); pixel.setBlue(0);}}
  frameImg.drawTo(canvas1);
  alert("Frame filter is applying. Click OK to proceed.");
}
function doClear() {
  notloaded();
  for(var pixel of reset.values()) {
    var Pixels = image.getPixel(pixel.getX(), pixel.getY());
    reset.setPixel(pixel.getX(), pixel.getY(), Pixels)
  }
  reset.drawTo(canvas1);
}
function doRainbow(){
  notloaded();
  var width=rainbowImg.getWidth();
  var height=rainbowImg.getHeight();
    for(var pixel of rainbowImg.values()){
      var x=pixel.getX();
      var y=pixel.getY();
    var avg=(pixel.getRed()+pixel.getGreen()+pixel.getGreen())/3;
   if(y<height/10){
    pixel.setRed(2*avg);
    pixel.setGreen(0);
    pixel.setBlue(0);
   }
   if(y>(height/10) && y<(2*height/10)){
    pixel.setRed(2*avg);
    pixel.setGreen(avg);
    pixel.setBlue(0);
      }
   if(y>(2*height/10) && y<(3*height/10)){
        pixel.setRed(2*avg);
    pixel.setGreen(2*avg);
    pixel.setBlue(0);
      } 
    if(y>(3* height/10) && y<(4*height/10)){
    pixel.setRed(0);
    pixel.setGreen(2*avg);
    pixel.setBlue(0);
      }
    if(y>(4*height/10) && y<(5*height/10)){
    pixel.setRed(0);
    pixel.setGreen(2*avg);
    pixel.setBlue(avg);
      }
    if(y>(5*height/10) && y<(6*height/10)){
    pixel.setRed(0);
    pixel.setGreen(2*avg);
    pixel.setBlue(2*avg);
      }
    if(y>(6*height/10) && y<(7*height/10)){
    pixel.setRed(0);
    pixel.setGreen(0);
    pixel.setBlue(2*avg);
      }
    if(y>(7*height/10) && y<(8*height/10)){
    pixel.setRed(avg);
    pixel.setGreen(0);
    pixel.setBlue(avg);
      }
    if(y>(8*height/10) && y<(9*height/10)){
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
      }
  }
  rainbowImg.drawTo(canvas1);
  alert("Rainbow filter is applying. Click OK to proceed.");
}
function doBlur(){
  notloaded();
  var width = blurImg.getWidth();
  var height = blurImg.getHeight();
  for (var pixel of blurImg.values()) {
  var num = Math.random();
  var dot = Math.ceil(num*10);
  var x = pixel.getX();
  var y = pixel.getY();
  var newX = Math.min(x+dot, width-1);
  var newY = Math.min(y+dot, height-1);
  if (num<5) {
  var pixel2 = blurImg.getPixel(newX,newY);
  blurImg.setPixel(x,y,pixel2);
  }}
  blurImg.drawTo(canvas1);
  alert("Blur filter is applying. Click OK to proceed.");
}
function notloaded() {
  if (image == null || !image.complete()) {
    alert("Image is not loaded.");
  }
}