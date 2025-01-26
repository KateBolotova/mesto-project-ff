import './styles/index.css';
import "./scripts/modal";
import "./scripts/card";
import "./scripts/cards";
import {enableValidation, clearValidation} from "./scripts/validation";
import {initialCards} from "./scripts/cards";
import {closePopup, openPopup, openPopupWithButton} from "./scripts/modal";
import {createCard, deleteCard, toggleLike} from "./scripts/card";

const editProfileButton = document.querySelector('.profile__edit-button');
export const popupEditProfile = document.querySelector('.popup_type_edit');
const addCardButton = document.querySelector('.profile__add-button');
export const popupAddCard = document.querySelector('.popup_type_new-card');
export const popupImage = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');

openPopupWithButton(popupAddCard, addCardButton)
openPopupWithButton(popupEditProfile, editProfileButton)

popups.forEach((popup) => {
	popup.classList.add('popup_is-animated');
	const exitButton = popup.querySelector('.popup__close');
	exitButton.addEventListener('click', (evt) => {
		closePopup(popup);
	})
	popup.addEventListener('click', (evt) => {
		if (evt.target === popup) {
			closePopup(popup);
		}
	})
})

const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const imageCaption = popupImage.querySelector('.popup__caption');
const imageContent = popupImage.querySelector('.popup__image');

function createDefaultCard(card) {
	return createCard(cardTemplate, card, deleteCard, toggleLike,
		(_, card) => {
			imageCaption.textContent = card.name;
			imageContent.src = card.link;
			imageContent.alt = card.alt;
			openPopup(popupImage);
		});
}

function addCardToEnd(cardList, cardElement) {
	cardList.append(cardElement);
}

function addCardToStart(cardList, cardElement) {
	cardList.prepend(cardElement);
}

initialCards.forEach((card) => {
	const cardElement = createDefaultCard(card);
	addCardToEnd(cardList, cardElement);
});

const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.querySelector('input[name="name"]');
const jobInput = editProfileForm.querySelector('input[name="description"]');
const namePlace = document.querySelector('.profile__title');
const jobPlace = document.querySelector('.profile__description');

function handleEditProfileSubmit(evt) {
	evt.preventDefault();

	const name = nameInput.value;
	const job = jobInput.value;

	namePlace.textContent = name;
	jobPlace.textContent = job;

	closePopup(popupEditProfile);
	editProfileForm.reset();
}

editProfileForm.addEventListener('submit', handleEditProfileSubmit);

popupEditProfile.openPopupCallback = () => {
	nameInput.value = namePlace.textContent;
	jobInput.value = jobPlace.textContent;
	clearValidation(editProfileForm, validationConfig);
}
popupEditProfile.closePopupCallback = () => {
	editProfileForm.reset();
}

const addCardForm = document.forms['new-place'];
const placeNameInput = addCardForm.querySelector('input[name="place-name"]');
const linkInput = addCardForm.querySelector('input[name="link"]');

function handleAddCardSubmit(evt) {
	evt.preventDefault();

	const placeName = placeNameInput.value;
	const link = linkInput.value;
	const card = {name: placeName, link: link, alt: placeName};
	const cardElement = createDefaultCard(card);
	addCardToStart(cardList, cardElement);

	closePopup(popupAddCard);
	addCardForm.reset();
}

addCardForm.addEventListener('submit', handleAddCardSubmit);

popupAddCard.closePopupCallback = () => {
	addCardForm.reset();
	clearValidation(addCardForm, validationConfig);
}

const validationConfig = {
	formSelector: '.popup__form',
	errorActiveClass: 'popup__input_error_active',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	errorSelectorFactory: (formInput) => `.popup__${formInput.id}_error`
}

enableValidation(validationConfig);