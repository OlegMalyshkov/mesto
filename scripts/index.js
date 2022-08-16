const popupEditor = document.querySelector(".profile__edit");
const popupAddCard = document.querySelector("#popup");
const popupOpen = document.querySelector(".profile-popup");
const popupOpenImage = document.querySelector('#popup-image');
const popupCloseButtons = document.querySelectorAll(".popup__close");
const popupSubmit = document.querySelector(".popup__submit");
const inputTitle = document.querySelector(".popup__input");
const profileTitle = document.querySelector('.profile__title');
const inputClarify = document.querySelector(".popup__input_type_profession");
const profileSubtitle = document.querySelector(".profile__subtitle");
const userProfileForm = document.getElementById("user-form");
const popupAdd = document.querySelector(".profile__add");
const viewCard = document.querySelector("#card-image");
const placeImage = document.querySelector("#image-place");

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cards = {
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

const form = document.querySelector(cards.form);
const list = document.querySelector(cards.list);
const template = document.querySelector(cards.template).content.querySelector(cards.item);

popupEditor.addEventListener("click", popupEditorAdd);
userProfileForm.addEventListener("submit", submitPopup);
popupAdd.addEventListener("click", addPopup);

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('click', closePopupOverlay);
}

function closePopupAll(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
  popup.removeEventListener('click', closePopupOverlay);
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopupAll(popup);
  }
}

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const popup = document.querySelector('.popup_opened');
    closePopupAll(popup);
  }
}

function createCard(date) {
  const cardElement = template.cloneNode(true);
  const deleteButtom = cardElement.querySelector(cards.del);
  const likeButtom = cardElement.querySelector(cards.like);
  const cardImage = cardElement.querySelector(cards.image);
  const cardPlace = cardElement.querySelector(cards.place);
  
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

function addEventListener() {
  const inputName = form.querySelector(cards.inputName);
  const inputLink = form.querySelector(cards.inputLink);
  form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const newCardDate = {
    name: inputName.value,
    link: inputLink.value
    }
    list.prepend(createCard(newCardDate));
    evt.target.reset();
    closePopupAll(popupAddCard);
  });
}

addEventListener();

function popupEditorAdd() {
  openPopup(popupOpen);
  inputTitle.value = profileTitle.textContent;
  inputClarify.value = profileSubtitle.textContent;
}

function submitPopup(event) {
  event.preventDefault();
  profileTitle.textContent = inputTitle.value;
  profileSubtitle.textContent = inputClarify.value;
  closePopupAll(popupOpen);
}

function addPopup() {
  openPopup(popupAddCard);
}

popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopupAll(popup));
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
