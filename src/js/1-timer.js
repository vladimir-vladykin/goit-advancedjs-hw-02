import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;
const startButton = document.querySelector('button[data-start]');
const daysField = document.querySelector('span[data-days]');
const hoursField = document.querySelector('span[data-hours]');
const minutesField = document.querySelector('span[data-minutes]');
const secondsField = document.querySelector('span[data-seconds]');

setup();

function setup() {
  // button initially disabled
  startButton.disabled = true;

  // setup flatpickr
  flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      console.log(userSelectedDate);

      updateStartButton();
      if (isDateInPast(userSelectedDate)) {
        showInvalidDateMessage();
      }
    },
  });

  // setup start button
  startButton.addEventListener('click', event => {
    // check again in case date is became invalid at this moment
    if (isDateInPast(userSelectedDate)) {
      showInvalidDateMessage();
      return;
    }

    // update UI immediately
    let timeLeft = calculateMsLeftToSelectedDate();
    updateTimeLeftUI(convertMs(timeLeft));

    // start updating UI every second
    startTimer();
  });
}

function updateStartButton() {
  startButton.disabled = isDateInPast(userSelectedDate);
}

function isDateInPast(date) {
  if (!date) {
    return false;
  }

  const now = new Date();
  return now > date;
}

function startTimer() {
  // TODO make UI disabled

  const intervalId = setInterval(() => {
    let timeLeft = calculateMsLeftToSelectedDate();

    if (timeLeft <= 0) {
      // just for case, to avoid negative left
      timeLeft = 0;

      // we're done with timer, no need for more iterations
      clearInterval(intervalId);

      // TODO make UI enabled
    }

    updateTimeLeftUI(convertMs(timeLeft));
  }, 1000);
}

function calculateMsLeftToSelectedDate() {
  const nowMs = Date.now();
  const targetMs = userSelectedDate.getTime();

  return targetMs - nowMs;
}

function updateTimeLeftUI({ days, hours, minutes, seconds }) {
  // TODO remove
  console.log(
    `Days ${days}, Hours ${hours}, Minutes ${minutes}, Seconds ${seconds}`
  );

  // TODO better formatting
  daysField.textContent = days;
  hoursField.textContent = hours;
  minutesField.textContent = minutes;
  secondsField.textContent = seconds;
}

function showInvalidDateMessage() {
  iziToast.show({
    message: 'Please choose a date in the future',
  });
}

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
