const FORM_DATA_STORAGE_KEY = 'feedback-form-state';

const formData = getInitialFormData();
console.log(`Initial form data is ${formData}`);

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = document.querySelector('.feedback-form input[name=email]');
const messageInput = document.querySelector(
  '.feedback-form textarea[name=message]'
);

emailInput.value = formData.email;
messageInput.value = formData.message;

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (email === '' || message === '') {
    alert('Fill please all fields');
    return;
  }

  formData.email = email;
  formData.message = message;

  console.log(formData);
  clearAll();
});

emailInput.addEventListener('input', event => {
  const input = event.currentTarget.value.trim();
  formData.email = input;
  saveFormDataToLocalStorage();
});
messageInput.addEventListener('input', event => {
  const input = event.currentTarget.value.trim();
  formData.message = input;
  saveFormDataToLocalStorage();
});

function saveFormDataToLocalStorage() {
  localStorage.setItem(FORM_DATA_STORAGE_KEY, JSON.stringify(formData));
}

function getInitialFormData() {
  const rawFormData = localStorage.getItem(FORM_DATA_STORAGE_KEY);
  if (!rawFormData) {
    return {
      email: '',
      message: '',
    };
  }

  return JSON.parse(rawFormData);
}

function clearAll() {
  feedbackForm.reset();
  formData.email = '';
  formData.message = '';

  localStorage.removeItem(FORM_DATA_STORAGE_KEY);
}
