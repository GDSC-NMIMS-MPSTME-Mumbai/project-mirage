const pointsElement = document.getElementById("points"); // Get the new span
const levelElement = document.getElementById("level"); // Get the new span
const gameButton = document.getElementById("game-button");
const colorButton = document.getElementById("color-button");
const containerWidth = document.body.offsetWidth;
const containerHeight = document.body.offsetHeight;
const buttonWidth = gameButton.offsetWidth;
const buttonHeight = gameButton.offsetHeight;
let points = 0;
let level = 1;
let timerId = null;
let particleNum = 0;

function moveRandom() {
  const randomX = Math.floor(Math.random() * (containerWidth - buttonWidth));
  const randomY = Math.floor(Math.random() * (containerHeight - buttonHeight));
  gameButton.style.top = `${randomY}px`;
  gameButton.style.left = `${randomX}px`;
}

function moveButton() {
  const randomX = Math.floor(Math.random() * (containerWidth - buttonWidth));
  const randomY = Math.floor(Math.random() * (containerHeight - buttonHeight));

  gameButton.style.top = `${randomY}px`;
  gameButton.style.left = `${randomX}px`;

  points++;
  if (points % 5 == 0) {
    level++;
    if (points === 5 && timerId === null) {
      timerId = setInterval(() => {
        moveRandom();
      }, 4000);
    } else {
      clearInterval(timerId);
      timerId = setInterval(() => {
        moveRandom();
      }, (8000 / level));
    }
  }

  pointsElement.innerText = points; // Update the points
  levelElement.innerText = level;
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

moveButton();

//Creating a function change background color randomly on button click
const button = document.querySelector("#generate-button");
let background = document.querySelector("body");

let backgroundBlob = document.getElementById("blob");

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
    event.target.textContent = "Button Racer"
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
