import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailInput = formEl.querySelector('input[name="email"]');
const messageInput = formEl.querySelector('textarea[name="message"]');

const STORAGE_KEY = 'feedback-form-state';

const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

if (savedData) {
  emailInput.value = savedData.email;
  messageInput.value = savedData.message;
}

const saveFormData = () => {
  const data = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const throttledSaveFormData = throttle(saveFormData, 500);

emailInput.addEventListener('input', throttledSaveFormData);
messageInput.addEventListener('input', throttledSaveFormData);
function onClickSubmit(e) {
  e.preventDefault();

  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);

  emailInput.value = '';
  messageInput.value = '';
}

formEl.addEventListener('submit', onClickSubmit);
