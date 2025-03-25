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
      console.log(value); // "Success! Value passed to resolve function"
      iziToast.show({
        message: value,
      });
    })
    .catch(error => {
      console.log(error); // "Error! Error passed to reject function"
      iziToast.show({
        message: error,
      });
    });
}
