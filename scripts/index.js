import Card from "../scripts/Card.js";
import FormValidator from "./FormValidator.js";

const popupProfileOpenButton = document.querySelector(".profile__edit");
const popupAddCard = document.querySelector("#popup");
const popupProfile = document.querySelector(".profile-popup");
const popupOpenImage = document.querySelector('#popup-image');
const popupCloseButtons = document.querySelectorAll(".popup__close");
const inputTitle = document.querySelector(".popup__input");
const profileTitle = document.querySelector('.profile__title');
const inputClarify = document.querySelector(".popup__input_type_profession");
const profileSubtitle = document.querySelector(".profile__subtitle");
const userProfileForm = document.querySelector("#user-form");
const popupAdd = document.querySelector(".profile__add");
const viewCard = document.querySelector("#card-image");
const placeImage = document.querySelector("#image-place");

const cardForm = document.querySelector(cardsContainer.form);
const list = document.querySelector(cardsContainer.list);
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

function createCard(cardData) {
  const card = new Card(cardData, "#newcard");

  return card.createCard();
};

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

    closePopup(popupAddCard);
  });

function popupEditorAdd() {
  openPopup(popupProfile);
  inputTitle.value = profileTitle.textContent;
  inputClarify.value = profileSubtitle.textContent;
  
  // прячем текст ошибки, если попап был с ней закрыт, а потом открыт снова
  const inputs = Array.from(popupProfile.querySelectorAll('.popup__input'));
  inputs.forEach((item) => {
    elementValidationProfile.hideInputError(item);
  });

  // делаем кнопку неактивной при повторном открытии попапа после успешного сохранения
  elementValidationProfile.toggleButtonState();
}

function submitProfileForm(event) {
  event.preventDefault();
  profileTitle.textContent = inputTitle.value;
  profileSubtitle.textContent = inputClarify.value;
  closePopup(popupProfile);
}

function openAddCardPopup() {
  openPopup(popupAddCard);
  cardForm.reset();

  // делаем кнопку неактивной при повторном открытии попапа после успешного сохранения
  elementValidationImage.toggleButtonState();

  // прячем текст ошибки, если попап был с ней закрыт, а потом открыт снова
  const inputs = Array.from(cardForm.querySelectorAll('.popup__input'));
  inputs.forEach((item) => {
    elementValidationImage.hideInputError(item);
  })
}

popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// создаем экземпляры класса FormValidator
const elementValidationProfile = new FormValidator(validationConfig, userProfileForm);
const elementValidationImage = new FormValidator(validationConfig, cardForm);

// вызваем функцию enableValidation на экземплярах
elementValidationProfile.enableValidation();
elementValidationImage.enableValidation();


export {popupOpenImage, viewCard, placeImage, openPopup};
