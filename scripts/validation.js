// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = `#${inputEl.id}-error`;
    const errorElement = formEl.querySelector(errorMessageEl)
    inputEl.classList.add(inputErrorClass);
    errorElement.textContent = inputEl.validationMessage;
    errorElement.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = `#${inputEl.id}-error`;
    const errorElement = formEl.querySelector(errorMessageEl)
    inputEl.classList.remove(inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
    if(!inputEl.validity.valid) {
     return showInputError(formEl, inputEl, options);
    }
      hideInputError(formEl, inputEl, options);
}

function hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
}

function disableButton(submitButton, inactiveButtonClass) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
}

function enableButton(submitButton, inactiveButtonClass) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    if (hasInvalidInput(inputEls)) {
        disableButton(submitButton, inactiveButtonClass);
    } else {
        enableButton(submitButton, inactiveButtonClass);
    }
}

function setEventListeners(formEl, options) {
    const { inputSelector } = options;
    const inputEls = [...formEl.querySelectorAll(inputSelector)];
    const submitButton = formEl.querySelector('.modal__button');
    inputEls.forEach((inputEl) => {
        inputEl.addEventListener('input', (e) => {
            checkInputValidity(formEl, inputEl, options);
            toggleButtonState(inputEls, submitButton, options);
        });
    })
}

function enableValidation(options) {
    const formEls = [...document.querySelectorAll(options.formSelector)];
    formEls.forEach((formEl) => {
        formEl.addEventListener('submit', (e) => {
            e.preventDefault();
        });

        setEventListeners(formEl, options);

    });
}

function handleOverlayClick(event) {
    if (event.target.classList.contains('modal_open')) {
        closePopup(event.target);
    }
}

const modals = document.querySelectorAll('.modal');
modals.forEach((modal) => {
    modal.addEventListener('click', handleOverlayClick);
});

function handleEscKey(event) {
    if (event.key === 'Escape') {
        const openModal = document.querySelector('.modal_open');
        if (openModal) {
            closePopup(openModal);
        }
    }
}

document.addEventListener('keydown', handleEscKey);

const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
  };

  enableValidation(config);