// script.js

// Constantes globais
const G = 6.6743e-11;
const planets = {
  mercurio: { mass: 3.3e23, radius: 2.44e6, gravity: 3.7 },
  venus: { mass: 4.87e24, radius: 6.05e6, gravity: 8.87 },
  terra: { mass: 5.97e24, radius: 6.37e6, gravity: 9.81 },
  marte: { mass: 6.42e23, radius: 3.39e6, gravity: 3.71 },
  jupiter: { mass: 1.9e27, radius: 7.15e7, gravity: 24.79 },
  saturno: { mass: 5.68e26, radius: 6.03e7, gravity: 10.44 },
  urano: { mass: 8.68e25, radius: 2.56e7, gravity: 8.87 },
  netuno: { mass: 1.02e26, radius: 2.47e7, gravity: 11.15 },
};

// Espera o documento ser carregado
document.addEventListener('DOMContentLoaded', setupListeners);

function setupListeners() {
  const massaObjetoInput = document.getElementById('massaObj');
  const planetaSelect = document.getElementById('planetas');
  const emularButton = document.getElementById('emularButton');
  const resultDisplay = document.getElementById('result');

  emularButton.addEventListener('click', () =>
    emularQueda(massaObjetoInput, planetaSelect, resultDisplay)
  );
}

function emularQueda(massaObjetoInput, planetaSelect, resultDisplay) {
  const massaObjeto = parseFloat(massaObjetoInput.value);
  const planetaSelecionado = planetaSelect.value;

  if (isNaN(massaObjeto) || !planets[planetaSelecionado]) {
    alert('Por favor, insira um valor válido e selecione um planeta.');
    return;
  }

  const planeta = planets[planetaSelecionado];
  const forcaGravitacional = calculateGravity(
    planeta.mass,
    massaObjeto,
    planeta.radius
  );

  resultDisplay.textContent = `Força gravitacional na superfície de ${
    planetaSelecionado.charAt(0).toUpperCase() + planetaSelecionado.slice(1)
  }: ${forcaGravitacional.toFixed(2)} N`;

  animateDrop(massaObjeto, planeta.gravity);
}

function calculateGravity(mass1, mass2, distance) {
  return (G * mass1 * mass2) / (distance * distance);
}

function animateDrop(massaObjeto, gravity) {
  const objeto = document.createElement('div');
  objeto.classList.add('fallingObject');
  document.body.appendChild(objeto);

  const startTime = Date.now();
  const dropDuration = Math.sqrt((2 * massaObjeto) / gravity) * 1000;

  function drop() {
    const elapsedTime = Date.now() - startTime;
    const position = 0.5 * gravity * Math.pow(elapsedTime / 1000, 2);

    objeto.style.transform = `translateY(${position}px)`;

    if (elapsedTime < dropDuration) {
      requestAnimationFrame(drop);
    } else {
      objeto.remove();
    }
  }
  drop();
}
