function generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 100);
    document.getElementById("randomNumber").innerText = `Random Number: ${randomNumber}`;
  }
  
  const particlesContainer = document.querySelector('.particles');
  for (let i = 0; i < 100; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particlesContainer.appendChild(particle);
  }
  
  function changeColor() {
    const colorInput = document.getElementById('color-input').value;
  
    if (colorInput) {
      document.body.style.backgroundColor = colorInput;
    }
  }
  