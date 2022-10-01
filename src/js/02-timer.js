'use strict';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const TIMER_DEADLINE = new Date();

const refs = {
  btnStart: document.querySelector('[data-start]'),
  timerRef: document.querySelector('.timer'),
  //   days: document.querySelector('.value[data-days]'),
  //   hours: document.querySelector('.value[data-hours]'),
  //   mins: document.querySelector('.value[data-minutes]'),
  //   secs: document.querySelector('.value[data-seconds]'),
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const startTime = Date.now();
    selectedDate = selectedDates[0];
    const deltaTime = selectedDate.getTime();
    if (deltaTime - startTime < 0) {
      window.alert('Please choose a date in the future');
      return;
    }
    refs.btnStart.removeAttribute('disabled');
  },
};
const timer = {
  intervalId: null,
  refs: {},
  start(rootSelector, deadline) {
    const delta = deadline.getTime() - Date.now();
    console.log(delta);
    console.log(Date.now());
  },
};

timer.start(refs.timerRef, TIMER_DEADLINE);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr('input#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// refs.btnStart.addEventListener('click', onClose);
