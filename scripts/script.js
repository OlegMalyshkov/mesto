const popupEditor = document.querySelector(".profile__edit");
const popupOpen = document.querySelector(".popup");
const popupClose = document.querySelector(".popup__close");
const popupSubmit = document.querySelector(".popup__submit");
const likeElements = document.querySelectorAll(".elements__like");
popupEditor.addEventListener("click", popupEditorAdd);
popupClose.addEventListener("click", closePopup);
popupSubmit.addEventListener("click", submitPopup);

function popupEditorAdd() {
  popupOpen.classList.add("popup_opened");
}

function closePopup() {
  popupOpen.classList.remove("popup_opened");
}

for (let i = 0; i < likeElements.length; i += 1) {
  let button = likeElements[i];
  button.addEventListener('click', function blackLike() {
    button.classList.toggle("elements__like_active");
  });
};

function submitPopup(event) {
  event.preventDefault();
  const inputTitle = document.querySelector(".popup__input");
  const profileTitle = document.querySelector('.profile__title');
  profileTitle.textContent = inputTitle.value;
  const inputClarify = document.querySelector(".popup__clarify");
  const profileSubtitle = document.querySelector(".profile__subtitle");
  profileSubtitle.textContent = inputClarify.value;
  closePopup();
}
