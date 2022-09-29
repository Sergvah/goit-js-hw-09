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
  button.btnStart.setAttribute('disabled', true);
  button.btnStop.removeAttribute('disabled');
}
function stopChangeColor() {
  clearInterval(btnChangeColors);
  button.btnStart.removeAttribute('disabled');
  button.btnStop.setAttribute('disabled', true);
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

button.btnStart.addEventListener('click', startChangeColor);
button.btnStop.addEventListener('click', stopChangeColor);
