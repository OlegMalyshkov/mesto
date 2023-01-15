export default class FormValidator {
  constructor (config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._button = this._formElement.querySelector(this._config.submitButtonSelector);
    this._formList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
  }

  _setEventListeners = () => {
    this.toggleButtonState(this._button, this._formList);

    // Обойдём все элементы полученной коллекции
    this._formList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(inputElement);
        this.toggleButtonState();
      });
    });
  };

  _hasInvalidInput = () => {
    // проходим по этому массиву методом some
    return this._formList.some(inputElement => !inputElement.validity.valid);
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
  };

  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._showInputError(inputElement);
    } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this.hideInputError(inputElement);
    }
  };

  _showInputError = (inputElement) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  };

  hideInputError = (inputElement) => {
    // Находим элемент ошибки
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };

  toggleButtonState = () => {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(this._formList)) {
      // сделай кнопку неактивной
      this._button.disabled = true;
    } else {
      // иначе сделай кнопку активной
      this._button.disabled = false;
    }
  };

  enableValidation = () => {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
}
