// pixel-art.js
const board = document.getElementById("drawingBoard");
const gridSizeSlider = document.getElementById("gridSizeSlider");
let currentColor = "black";
let isMouseDown = false;
let gridSize = 16; // Default grid size
let download = document.getElementById("downloadBtn");
let publish = document.getElementById("publishBtn");
var i=0

var config = {
  "apiKey": "AIzaSyDlq0E6KA4cnxqweE4EcnyRFtCCFqUNc4I",
  "authDomain": "ai-germ-site.firebaseapp.com",
  "projectId": "ai-germ-site",
  "storageBucket": "ai-germ-site.appspot.com",
  "messagingSenderId": "429718411683",
  "appId": "1:429718411683:web:d80cfd48a3afe57f32e216",
  "measurementId": "G-7R47RXR1VS",
  "databaseURL" : ""
}

firebase.initializeApp(config)
var storageRef = firebase.storage().ref()

// Function to create the grid of pixels
function createPixels(size) {
  board.innerHTML = ""; // Clear the board before redrawing
  board.style.gridTemplateColumns = `repeat(${size},  1fr)`;
  board.style.gridTemplateRows = `repeat(${size},  1fr)`;

  const cellSize = board.clientWidth / size; // Calculate the size of each cell

  for (let i = 0; i < size * size; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.classList.add("cell-border");

    pixel.setAttribute("draggable", "false");
    pixel.addEventListener("dragstart", (event) => {
      event.preventDefault();
    });
    pixel.style.width = `${cellSize}px`;
    pixel.style.height = `${cellSize}px`;
    pixel.addEventListener("mousedown", startDrawing);
    pixel.addEventListener("mouseenter", draw);
    pixel.addEventListener("mouseup", stopDrawing);
    board.appendChild(pixel);
  }
}

function startDrawing(event) {
  isMouseDown = true;
  draw(event);
}

function draw(event) {
  if (!isMouseDown) return;
  if (isEraserMode) {
    event.target.style.backgroundColor = "";
  } else if (isRandomMode) {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    event.target.style.backgroundColor = randomColor;
  } else if (isColorSelectionMode) {
    event.target.style.backgroundColor = currentColor;
  }
}

function stopDrawing() {
  isMouseDown = false;
}

gridSizeSlider.addEventListener("input", (event) => {
  gridSize = parseInt(event.target.value, 10);
  createPixels(gridSize);

  // Display the grid size next to the slider
  const gridSizeDisplay = document.getElementById("gridSizeDisplay");
  if (gridSizeDisplay) {
    gridSizeDisplay.textContent = `${gridSize}x${gridSize}`;
  }
});

download.addEventListener("click", function(){
  html2canvas(board).then((canvas) => {
    const imageDataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a")
    a.href = imageDataUrl;
    a.download = "board.png"
    a.click()
  })
})

// Event listener for the color selection mode button
// Event listener for the color selection mode button
document.getElementById("colorPicker").addEventListener("input", (event) => {
  currentColor = event.target.value;
  isColorSelectionMode = true; // Set color selection mode to active
  isRandomMode = false; // Deactivate random mode
  isEraserMode = false; // Deactivate eraser mode
});

let isEraserMode = false; // Flag to check if eraser mode is active
let isRandomMode = false; // Flag to check if random mode is active
let isColorSelectionMode = true;
let showCellBorders = true; // Flag to check if cell borders should be shown

// Function to toggle cell borders
function toggleCellBorders() {
  showCellBorders = !showCellBorders;
  const pixels = board.getElementsByClassName("pixel");
  Array.from(pixels).forEach((pixel) => {
    pixel.classList.toggle("cell-border", showCellBorders);
  });
}

// Function to clear the canvas
function clearCanvas() {
  const pixels = board.getElementsByClassName("pixel");
  Array.from(pixels).forEach((pixel) => {
    pixel.style.backgroundColor = "";
  });
}

// Function to set a random color for each pixel
function setRandomColorForEachPixel() {
  isRandomMode = !isRandomMode;
  const pixels = board.getElementsByClassName("pixel");
  Array.from(pixels).forEach((pixel) => {
    if (isRandomMode) {
      const randomColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      pixel.style.backgroundColor = randomColor;
    } else {
      pixel.style.backgroundColor = "";
    }
  });
}

// Event listener for the color wheel mode button
document.getElementById("colorWheelBtn").addEventListener("click", () => {
  isColorSelectionMode = true;
  isRandomMode = false;
  isEraserMode = false;
});

document
  .getElementById("toggleGridBtn")
  .addEventListener("click", toggleCellBorders);
document
  .getElementById("clearCanvasBtn")
  .addEventListener("click", clearCanvas);
// Event listener for the random color mode button
document.getElementById("randomColorBtn").addEventListener("click", () => {
  isRandomMode = !isRandomMode;
  isColorSelectionMode = !isRandomMode; // Set color selection mode to active if random mode is off
  isEraserMode = false; // Deactivate eraser mode
});

// Event listener for the eraser mode button
document.getElementById("eraserBtn").addEventListener("click", () => {
  isEraserMode = !isEraserMode;
  isColorSelectionMode = !isEraserMode; // Set color selection mode to active if eraser mode is off
  isRandomMode = false; // Deactivate random mode
});

board.addEventListener("mouseleave", stopDrawing);

// Initial creation of pixels with the default grid size
createPixels(gridSize);

publish.addEventListener("click", function(){
  html2canvas(board).then((canvas) => {;
    canvas.toBlob(function(blob){
      var image = new Image();
      image.src = blob;
        var uploadTask = storageRef.child('images/' + Date.now() + ".png").put(blob).then(
          () => {
            window.alert("Your image was published!")
            window.location.replace("http://127.0.0.1:5000/pixel-art")
          },
          () => {
            window.alert("There was an error publishing your file. Please try again later")
          }
        );
    }); 
  })
})


$('#List').html('')

storageRef.child('images/').listAll().then(function(result){
    result.items.forEach(function(imageRef){
      i++;
      displayImage(i, imageRef);
    })
  })
  .catch((error) => {
    console.log(error)
  })


function displayImage(row, images){
  images.getDownloadURL().then(function(url){
    console.log(url)
    let new_html = '';
    new_html += '<div class="col-sm-4">'
    new_html += '<img src="'+url+'" class="rounded mx-auto d-block" width=200px>'
    new_html += '</div>'  
    $('#List').append(new_html);
  })
}
