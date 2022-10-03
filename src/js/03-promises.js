'use strict';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formSubmit = document.querySelector('.form');
const formDelay = document.querySelector('[name="delay"]');
const formStep = document.querySelector('[name="step"]');
const formAmount = document.querySelector('[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

// for (let i = 0; i <= 20; i += 5) {
//   console.log(i);
// }

function onSubmit(event) {
  event.preventDefault();
  // if (
  //   formDelay.value === '' ||
  //   formStep.value === '' ||
  //   formAmount.value === ''
  // ) {
  //   Notify.failure('Введите данные');
  //   return;
  // }
  if (
    Number(formDelay.value) < 0 ||
    Number(formStep.value) < 0 ||
    Number(formAmount.value) <= 0
  ) {
    Notify.failure('Введите положительные числа');
    return;
  }

  let delay = Number(formDelay.value);
  for (let counter = 1; counter <= Number(formAmount.value); counter++) {
    console.log(delay);
    createPromise(counter, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += Number(formStep.value);
  }
}
formSubmit.addEventListener('submit', onSubmit);
