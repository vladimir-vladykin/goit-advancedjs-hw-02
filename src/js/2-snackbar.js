import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = event.currentTarget.elements.delay.value.trim();

  const state = event.currentTarget.elements.state.value;
  const shouldPromiseBeFulfilled = state === 'fulfilled';

  launchPromise(delay, shouldPromiseBeFulfilled);
});

function launchPromise(delay, shouldPromiseBeFulfilled) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldPromiseBeFulfilled) {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(value => {
      iziToast.show({
        message: value,
        messageColor: 'white',
        position: 'topRight',
        backgroundColor: '#59a10d',
      });
    })
    .catch(error => {
      iziToast.show({
        message: error,
        messageColor: 'white',
        position: 'topRight',
        backgroundColor: '#ef4040',
      });
    });
}
