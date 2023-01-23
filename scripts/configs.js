const cardsContainer = {
  form: '#card-form',
  inputName: '#place-name',
  inputLink: '#clarify-link',
  template: '#newcard',
  item: '#card',
  image: '.card__image',
  location: '.card__location',
  place: '.card__place',
  like: '.card__like',
  del: '#del-card',
  wrapper: '.elements__list'
};

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export {cardsContainer, validationConfig};
