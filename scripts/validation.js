// enabling validation by calling enableValidation()
// pass all the settings on call

function setEventListeners(formEl, options) {
    const { inputSelector } = options;
    const inputEls = {...formEl.querySelectorAll(inputSelector)};
    console.log(inputEls);
}

function enableValidation(options) {
    const formEls = {...document.querySelectorAll(options.formSelector)};
    formEls.forEach((formEl) => {
        formEl.addEventListener('submit', (e) => {
            e.preventDefault();
        });

        setEventListeners(formEl, options);

    });
}

const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
  };

  enableValidation(config);