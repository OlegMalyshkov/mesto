const popupProfileOpenButton = document.querySelector(".profile__edit");
const popupAddCard = document.querySelector("#popup");
const popupProfile = document.querySelector(".profile-popup");
const popupOpenImage = document.querySelector('#popup-image');
const popupCloseButtons = document.querySelectorAll(".popup__close");
const inputTitle = document.querySelector(".popup__input");
const profileTitle = document.querySelector('.profile__title');
const inputClarify = document.querySelector(".popup__input_type_profession");
const profileSubtitle = document.querySelector(".profile__subtitle");
const userProfileForm = document.getElementById("user-form");
const popupAdd = document.querySelector(".profile__add");
const viewCard = document.querySelector("#card-image");
const placeImage = document.querySelector("#image-place");

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
  list: '.elements__list'
}

const cardForm = document.querySelector(cardsContainer.form);
const list = document.querySelector(cardsContainer.list);
const template = document.querySelector(cardsContainer.template).content.querySelector(cardsContainer.item);
const inputName = cardForm.querySelector(cardsContainer.inputName);
const inputLink = cardForm.querySelector(cardsContainer.inputLink);

popupProfileOpenButton.addEventListener("click", popupEditorAdd);
userProfileForm.addEventListener("submit", submitProfileForm);
popupAdd.addEventListener("click", openAddCardPopup);

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('mousedown', closePopupOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
  popup.removeEventListener('click', closePopupOverlay);
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function createCard(date) {
  const cardElement = template.cloneNode(true);
  const deleteButtom = cardElement.querySelector(cardsContainer.del);
  const likeButtom = cardElement.querySelector(cardsContainer.like);
  const cardImage = cardElement.querySelector(cardsContainer.image);
  const cardPlace = cardElement.querySelector(cardsContainer.place);
  
  cardImage.src = date.link;
  cardImage.alt = date.name;
  cardPlace.textContent = date.name;

  deleteButtom.addEventListener('click', function() {
    cardElement.remove();
  });

  likeButtom.addEventListener('click', function(){
    likeButtom.classList.toggle('card__like_active');
  });

  cardImage.addEventListener('click', function(){
    viewCard.src = cardImage.src;
    placeImage.textContent = cardPlace.textContent;
    viewCard.alt = cardPlace.textContent;
    openPopup(popupOpenImage);
  });

  return cardElement;
}

initialCards.forEach((item) => {
  list.prepend(createCard(item));
});

cardForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const newCardDate = {
    name: inputName.value,
    link: inputLink.value
    }
    list.prepend(createCard(newCardDate));
    evt.target.reset();
    const form = document.querySelector('#card-form');
    const button = form.querySelector('.popup__submit'); 
    const inputs = Array.from(form.querySelectorAll('.popup__input')); 
    toggleButtonState(inputs, button);
    closePopup(popupAddCard);
  });

function popupEditorAdd() {
  openPopup(popupProfile);
  inputTitle.value = profileTitle.textContent;
  inputClarify.value = profileSubtitle.textContent;
}

function submitProfileForm(event) {
  event.preventDefault();
  profileTitle.textContent = inputTitle.value;
  profileSubtitle.textContent = inputClarify.value;
  closePopup(popupProfile);
}

function openAddCardPopup() {
  openPopup(popupAddCard);
}

popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
