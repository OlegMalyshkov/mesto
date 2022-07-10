const popupEditor = document.querySelector(".profile__edit");
const popupOpen = document.querySelector(".popup");
const popupClose = document.querySelector(".popup__close");
const popupSubmit = document.querySelector(".popup__submit");
const inputTitle = document.querySelector(".popup__input");
const profileTitle = document.querySelector('.profile__title');
const inputClarify = document.querySelector(".popup__input_type_profession");
const profileSubtitle = document.querySelector(".profile__subtitle");
const userProfileForm = document.getElementById("user-form");
popupEditor.addEventListener("click", popupEditorAdd);
popupClose.addEventListener("click", closePopup);
userProfileForm.addEventListener("submit", submitPopup);

function popupEditorAdd() {
  popupOpen.classList.add("popup_opened");
  inputTitle.value = profileTitle.textContent;
  inputClarify.value = profileSubtitle.textContent;
}

function closePopup() {
  popupOpen.classList.remove("popup_opened");
}

function submitPopup(event) {
  event.preventDefault();
  profileTitle.textContent = inputTitle.value;
  profileSubtitle.textContent = inputClarify.value;
  closePopup();
}
