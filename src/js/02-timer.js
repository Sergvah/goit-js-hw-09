'use strict';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const TIMER_DEADLINE = new Date();
let selectedDate;
const btnStart = document.querySelector('[data-start]');
const timerRef = document.querySelector('.timer');
//   days: document.querySelector('.value[data-days]'),
//   hours: document.querySelector('.value[data-hours]'),
//   mins: document.querySelector('.value[data-minutes]'),
//   secs: document.querySelector('.value[data-seconds]'),

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
      btnStart.setAttribute('disabled', true);
      Notify.failure('Please choose a date in the future', {
        position: 'center-center',
        clickToClose: true,
        closeButton: true,
      });
      return;
    }
    // Notify.success("Let's go", {
    //   position: 'center-center',
    //   clickToClose: true,
    //   closeButton: true,
    // });
    btnStart.removeAttribute('disabled');
  },
};

const timer = {
  intervalId: null,
  refs: {},
  start(rootSelector, selectedDate) {
    const delta = selectedDate.getTime() - Date.now();

    this.getRefs(rootSelector);

    this.intervalId = setInterval(() => {
      const ms = selectedDate.getTime() - Date.now();

      if (ms <= 1000) {
        clearInterval(this.intervalId);
      }

      const dataRefs = this.convertMs(ms);
      this.refs.days.textContent = this.addLeadingZero(dataRefs.days);
      this.refs.hours.textContent = this.addLeadingZero(dataRefs.hours);
      this.refs.minutes.textContent = this.addLeadingZero(dataRefs.minutes);
      this.refs.seconds.textContent = this.addLeadingZero(dataRefs.seconds);
    }, 1000);
    // console.log(dataRefs);
  },
  getRefs(rootSelector) {
    this.refs.days = document.querySelector('[data-days]');
    this.refs.hours = document.querySelector('[data-hours]');
    this.refs.minutes = document.querySelector('[data-minutes]');
    this.refs.seconds = document.querySelector('[data-seconds]');
  },

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  },

  convertMs(ms) {
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
  },

  // console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  // console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  // console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
};
btnStart.addEventListener('click', () => {
  timer.start(timerRef, selectedDate);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr('input#datetime-picker', options);
