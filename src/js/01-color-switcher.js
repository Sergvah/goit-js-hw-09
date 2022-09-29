'use strict';

const button = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

let btnChangeColors = null;

function startChangeColor() {
  btnChangeColors = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function stopChangeColor() {
  clearInterval(btnChangeColors);
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

button.btnStart.addEventListener('click', startChangeColor);
button.btnStop.addEventListener('click', stopChangeColor);
