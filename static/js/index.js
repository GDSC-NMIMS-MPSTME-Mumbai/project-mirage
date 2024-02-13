const randomNumberElement = document.getElementById("random-number");
const pointsElement = document.getElementById("points"); // Get the new span
const generateButton = document.getElementById("generate-button");
const colorButton = document.getElementById("color-button");
let points = 0;
let timerId = null;
let particleNum = 0;

function fetchRandomNumber() {
	fetch(generateRandomUrl)
		.then((response) => response.text())
		.then((data) => {
			randomNumberElement.innerText = data;
			moveButton();
		})
		.catch((error) => console.error("Error:", error));
}

function moveButton() {
	const containerWidth = document.body.offsetWidth;
	const containerHeight = document.body.offsetHeight;
	const buttonWidth = generateButton.offsetWidth;
	const buttonHeight = generateButton.offsetHeight;

	const randomX = Math.floor(Math.random() * (containerWidth - buttonWidth));
	const randomY = Math.floor(Math.random() * (containerHeight - buttonHeight));

	generateButton.style.top = `${randomY}px`;
	generateButton.style.left = `${randomX}px`;

	points++;
	particleNum++;

	pointsElement.innerText = points; // Update the points

	for (let i = 0; i < points * 5; i++) {
		const particle = document.createElement("div");
		particle.classList.add("particle");
		particle.style.left = `${Math.random() * 100}vw`;
		particle.style.top = `${Math.random() * 100}vh`;
		particlesContainer.appendChild(particle);
	}

	if (points === 15 && timerId === null) {
		timerId = setInterval(() => {
			const randomX = Math.floor(
				Math.random() * (containerWidth - buttonWidth)
			);
			const randomY = Math.floor(
				Math.random() * (containerHeight - buttonHeight)
			);
			changeColor();
			generateButton.style.top = `${randomY}px`;
			generateButton.style.left = `${randomX}px`;
			const randomColor = getRandomColor(); // Get a random color
			document.getElementById("color-input").value = randomColor; // Set the color input value
			changeColor();
		}, 800);
	}
}

function getRandomColor() {
	const r = Math.floor(Math.random() * 256)
		.toString(16)
		.padStart(2, "0");
	const g = Math.floor(Math.random() * 256)
		.toString(16)
		.padStart(2, "0");
	const b = Math.floor(Math.random() * 256)
		.toString(16)
		.padStart(2, "0");
	return `#${r}${g}${b}`;
}

function changeColor() {
	const colorInput = document.getElementById("color-input").value;

	if (colorInput) {
		generateButton.style.backgroundColor = colorInput;
		colorButton.style.backgroundColor = colorInput;
	}
}

// Create and append particles to the document
const particlesContainer = document.querySelector(".particles");
for (let i = 0; i < 100; i++) {
	const particle = document.createElement("div");
	particle.classList.add("particle");
	particle.style.left = `${Math.random() * 100}vw`;
	particle.style.top = `${Math.random() * 100}vh`;
	particlesContainer.appendChild(particle);
}

fetchRandomNumber();

//Creating a function change background color randomly on button click
const button = document.querySelector("#generate-button");
let background = document.querySelector("body");

let backgroundBlob = document.getElementById("blob");

button.addEventListener("click", () => {
	let math1 = Math.floor(Math.random() * 256);
	let math2 = Math.floor(Math.random() * 256);
	let math3 = Math.floor(Math.random() * 256);
	let math4 = Math.floor(Math.random() * 256);

	background.style.background = `rgb(${math1}, ${math2}, ${math3}, ${
		math4 / 255
	})`;

	// Convert the background color to HSL
	let [h, s, l] = rgbToHsl(math1, math2, math3);

	// Manually adjust the hue, saturation, and lightness for the blob color
	let blobHue = h + 0.05; // Shift the hue by   5%
	let blobSaturation = Math.max(s + 0.2, 0.5); // Increase the saturation by   20%
	let blobLightness = l - 0.1; // Reduce the lightness by   10%

	// Convert the adjusted HSL values back to RGB
	let [r, g, b] = hslToRgb(blobHue, blobSaturation, blobLightness);

	// Apply the new blob color
	backgroundBlob.style.background = `rgba(${r}, ${g}, ${b}, ${math4 / 255})`;
});

//creating random quote on button click
let output = document.querySelector("#output");
let quote = [
	"The greatest glory in living lies not in never falling, but in rising every time we fall. -Nelson Mandela",
	'"The way to get started is to quit talking and begin doing."" -Walt Disney',
	'"Your time is limited, so dont waste it living someone elses life. Dont be trapped by dogma – which is living with the results of other peoples thinking." -Steve Jobs',
	'"If life were predictable it would cease to be life, and be without flavor." -Eleanor Roosevelt',
	'"If you set your goals ridiculously high and its a failure, you will fail above everyone elses success." -James Cameron',
	'"Life is what happens when youre busy making other plans." -John Lennon',
	'"Spread love everywhere you go. Let no one ever come to you without leaving happier." -Mother Teresa',
	'"When you reach the end of your rope, tie a knot in it and hang on." -Franklin D. Roosevelt',
	'"Always remember that you are absolutely unique. Just like everyone else." -Margaret Mead',
	'"Dont judge each day by the harvest you reap but by the seeds that you plant." -Robert Louis Stevenson',
];
button.addEventListener("click", () => {
	let random_quote = quote[Math.floor(Math.random() * quote.length)];
	output.innerHTML = random_quote;
});

let blob = document.getElementById("blob");

document.body.onpointermove = (event) => {
	const { clientX, clientY } = event;

	const blobWidth = blob.offsetWidth;
	const blobHeight = blob.offsetHeight;

	blob.animate(
		{
			left: `${clientX - blobWidth / 2}px`,
			top: `${clientY - blobHeight / 2}px`,
		},
		{ duration: 3000, fill: "forwards" }
	);
};

let heroText = document.getElementById("hero-text");

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

heroText.onmouseover = (event) => {
	let iterations = 0;

	const interval = setInterval(() => {
		event.target.textContent = event.target.textContent
			.split("")
			.map((letter, index) => {
				if (index < iterations) {
					return event.target.dataset.value[index];
				}

				return letters[Math.floor(Math.random() * 26)];
			})
			.join("");

		if (iterations >= event.target.dataset.value.length) {
			clearInterval(interval);
		}

		iterations += 1 / 3;
	}, 30);
};

function rgbToHsl(r, g, b) {
	(r /= 255), (g /= 255), (b /= 255);
	let max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	let h,
		s,
		l = (max + min) / 2;

	if (max == min) {
		h = s = 0; // achromatic
	} else {
		let d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	return [h, s, l];
}

function hslToRgb(h, s, l) {
	let r, g, b;

	if (s == 0) {
		r = g = b = l; // achromatic
	} else {
		let hue2rgb = (p, q, t) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};

		let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		let p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
