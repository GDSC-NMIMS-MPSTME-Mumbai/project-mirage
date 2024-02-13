// pixel-art.js
const board = document.getElementById("drawingBoard");
const gridSizeSlider = document.getElementById("gridSizeSlider");
let currentColor = "black";
let isMouseDown = false;
let gridSize = 16; // Default grid size

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

		pixel.setAttribute("draggable", "false"); // Disable dragging on the pixel
		pixel.addEventListener("dragstart", (event) => {
			event.preventDefault(); // Prevent the default drag operation
		});
		pixel.style.width = `${cellSize}px`; // Set the width of the cell
		pixel.style.height = `${cellSize}px`; // Set the height of the cell
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

// Updated draw function to handle eraser mode and random mode
function draw(event) {
	if (!isMouseDown) return;
	if (isEraserMode) {
		event.target.style.backgroundColor = "";
	} else if (isRandomMode) {
		const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
		event.target.style.backgroundColor = randomColor;
	} else {
		event.target.style.backgroundColor = currentColor;
	}
}

function stopDrawing() {
	isMouseDown = false;
}

// Event listener for the grid size slider
gridSizeSlider.addEventListener("input", (event) => {
	gridSize = parseInt(event.target.value, 10);
	createPixels(gridSize);
});

document.getElementById("colorPicker").addEventListener("input", (event) => {
	currentColor = event.target.value;
});

let isEraserMode = false; // Flag to check if eraser mode is active
let isRandomMode = false; // Flag to check if random mode is active
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

document
	.getElementById("toggleGridBtn")
	.addEventListener("click", toggleCellBorders);
document
	.getElementById("clearCanvasBtn")
	.addEventListener("click", clearCanvas);
document.getElementById("randomColorBtn").addEventListener("click", () => {
	isRandomMode = !isRandomMode;
});
document.getElementById("eraserBtn").addEventListener("click", () => {
	isEraserMode = !isEraserMode;
});

board.addEventListener("mouseleave", stopDrawing);

// Initial creation of pixels with the default grid size
createPixels(gridSize);
