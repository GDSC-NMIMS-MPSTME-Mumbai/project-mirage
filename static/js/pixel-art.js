const board = document.getElementById("drawingBoard");
const gridSizeSlider = document.getElementById("gridSizeSlider");
let currentColor = "black";
let isMouseDown = false;
let gridSize = 16;

function createPixels(size) {
	board.innerHTML = "";
	board.style.gridTemplateColumns = `repeat(${size},  1fr)`;
	board.style.gridTemplateRows = `repeat(${size},  1fr)`;

	const cellSize = board.clientWidth / size;

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
	} else {
		event.target.style.backgroundColor = currentColor;
	}
}

function stopDrawing() {
	isMouseDown = false;
}

gridSizeSlider.addEventListener("input", (event) => {
	gridSize = parseInt(event.target.value, 10);
	createPixels(gridSize);
});

document.getElementById("colorPicker").addEventListener("input", (event) => {
	currentColor = event.target.value;
});

let isEraserMode = false;
let isRandomMode = false;
let showCellBorders = true;

function toggleCellBorders() {
	showCellBorders = !showCellBorders;
	const pixels = board.getElementsByClassName("pixel");
	Array.from(pixels).forEach((pixel) => {
		pixel.classList.toggle("cell-border", showCellBorders);
	});
}

function clearCanvas() {
	const pixels = board.getElementsByClassName("pixel");
	Array.from(pixels).forEach((pixel) => {
		pixel.style.backgroundColor = "";
	});
}

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

createPixels(gridSize);
