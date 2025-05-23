export default class FormValidator {
    constructor(settings, formElement) {
      this._settings = settings;
      this._formElement = formElement;
      this._inputList = [...this._formElement.querySelectorAll(this._settings.inputSelector)];
      this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    }
  
    _showInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(this._settings.inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._settings.errorClass);
    }
  
    _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._settings.inputErrorClass);
      errorElement.textContent = '';
      errorElement.classList.remove(this._settings.errorClass);
    }
  
    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement);
      } else {
        this._hideInputError(inputElement);
      }
    }
  
    _hasInvalidInput() {
      return this._inputList.some(inputElement => !inputElement.validity.valid);
    }
  
    _toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._buttonElement.classList.add(this._settings.inactiveButtonClass);
        this._buttonElement.disabled = true;
      } else {
        this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
        this._buttonElement.disabled = false;
      }
    }
  
    _setEventListeners() {
      this._toggleButtonState();
      this._inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState();
        });
      });
    }
  
    enableValidation() {
      this._formElement.addEventListener('submit', (e) => e.preventDefault());
      this._setEventListeners();
    }
  
    resetValidation() {
      this._inputList.forEach((inputElement) => this._hideInputError(inputElement));
      this._toggleButtonState();
    }
  }