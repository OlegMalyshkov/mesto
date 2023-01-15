import {popupOpenImage, viewCard, placeImage, openPopup} from './index.js';

export default class Card {
  constructor (cardData, templateSelector) {
    this._cardData = cardData;
    this._templateSelector = templateSelector;
    this._name = cardData.name;
    this._link = cardData.link;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    this._cardElement = template.content.querySelector(cardsContainer.item).cloneNode(true);
  }

  _removeCardElement() {
    this._cardElement.remove();
  }

  _likeButtonElement() {
    this._likeButton.classList.toggle('card__like_active');
  }

  _openCardImage() {
    viewCard.src = this._link;
    viewCard.alt = this._name;
    placeImage.textContent = this._name;

    openPopup(popupOpenImage);
  }

  _setEventListeners() {
		this._deleteButton.addEventListener('click', () => {
      this._removeCardElement();
    });
  
    this._likeButton.addEventListener('click', () => {
      this._likeButtonElement();
    });
  
    this._cardImage.addEventListener('click', () => {
      this._openCardImage();
    });
	}

  createCard() {
    this._getTemplate();
    this._deleteButton = this._cardElement.querySelector(cardsContainer.del);
    this._likeButton = this._cardElement.querySelector(cardsContainer.like);
    this._cardImage = this._cardElement.querySelector(cardsContainer.image);
    this._cardPlace = this._cardElement.querySelector(cardsContainer.place);
    
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardPlace.textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }

}
