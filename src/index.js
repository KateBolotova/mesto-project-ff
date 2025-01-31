import './styles/index.css';
import "./scripts/modal";
import "./scripts/card";
import "./scripts/cards";
import {clearValidation, enableValidation} from "./scripts/validation";
import {closePopup, openPopup, openPopupWithButton} from "./scripts/modal";
import {createCard, updateCard} from "./scripts/card";
import {
	addNewCard,
	changeAvatar,
	changeProfileInfo,
	deleteCard,
	getInitialCards,
	getProfileInfo,
	likeCard,
	unlikeCard
} from "./scripts/api.js";

const editProfileButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const submitEditProfile = document.querySelector('.popup_type_edit .popup__button');
const addCardButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const submitAddCard = document.querySelector('.popup_type_new-card .popup__button');
const popupImage = document.querySelector('.popup_type_image');
const popupUpdateAvatar = document.querySelector('.popup_type_update_avatar');
const submitUpdateAvatar = document.querySelector('.popup_type_update_avatar .popup__button');
const updateAvatarButton = document.querySelector('.profile__image_edit_button');
const popups = document.querySelectorAll('.popup');

openPopupWithButton(popupAddCard, addCardButton)
openPopupWithButton(popupEditProfile, editProfileButton)
openPopupWithButton(popupUpdateAvatar, updateAvatarButton)

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

function createDefaultCard(card, profile) {
	return createCard(cardTemplate, card, profile,
		(cardElement, card) => {
			deleteCard(card._id)
				.then(() => {
					cardElement.remove();
				})
				.catch((err) => {
					console.log(err);
				});
		},
		(cardElement, card) => {
			const promise = card.liked
				? unlikeCard(card._id)
				: likeCard(card._id);
			
			promise
				.then(newCard => {
					card.liked = !card.liked;
					updateCard(cardElement, newCard, profile);
				})
				.catch((err) => {
					console.log(err);
				});
		},
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

Promise.all([getInitialCards(), getProfileInfo()])
	.then((results) => {
		const cards = results[0];
		const profileInfo = results[1];
		cards.forEach((card) => {
			const cardElement = createDefaultCard(card, profileInfo);
			addCardToEnd(cardList, cardElement);
		});
		setProfileInfo(profileInfo.name, profileInfo.about);
		setAvatar(profileInfo.avatar);
	})
	.catch((err) => {
		console.log(err);
	});

const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.querySelector('input[name="name"]');
const jobInput = editProfileForm.querySelector('input[name="description"]');
const namePlace = document.querySelector('.profile__title');
const jobPlace = document.querySelector('.profile__description');
const avatarPlace = document.querySelector('.profile__image');

function handleEditProfileSubmit(evt) {
	evt.preventDefault();
	const name = nameInput.value;
	const job = jobInput.value;
	setIsReadyText(submitEditProfile, false);
	
	changeProfileInfo(name, job)
		.then(profile => {
			setProfileInfo(profile.name, profile.about);
			closePopup(popupEditProfile);
			editProfileForm.reset();
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			setIsReadyText(submitEditProfile, true);
		});
}

function setProfileInfo(name, job) {
	namePlace.textContent = name;
	jobPlace.textContent = job;
}

function setAvatar(link) {
	avatarPlace.style.backgroundImage = `url(${link})`;
}

function getAvatar() {
	const url = avatarPlace.style.backgroundImage;
	return url.slice(5, url.length - 2);
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

function setIsReadyText(element, isReady) {
	element.textContent = isReady
		? element.dataset.readyText
		: element.dataset.processingText;
}

const addCardForm = document.forms['new-place'];
const placeNameInput = addCardForm.querySelector('input[name="place-name"]');
const linkInput = addCardForm.querySelector('input[name="link"]');

function handleAddCardSubmit(evt) {
	evt.preventDefault();

	const placeName = placeNameInput.value;
	const link = linkInput.value;
	const card = {name: placeName, link: link, alt: placeName};
	setIsReadyText(submitAddCard, false);
	
	Promise.all([addNewCard(card), getProfileInfo()])
		.then((results) => {
			const card = results[0];
			const profileInfo = results[1];
			const cardElement = createDefaultCard(card, profileInfo);
			addCardToEnd(cardList, cardElement);
			closePopup(popupAddCard);
			addCardForm.reset();
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			setIsReadyText(submitAddCard, true);
		});
}

addCardForm.addEventListener('submit', handleAddCardSubmit);

popupAddCard.closePopupCallback = () => {
	addCardForm.reset();
	clearValidation(addCardForm, validationConfig);
}

const updateAvatarForm = document.forms['update-avatar'];
const avatarInput = updateAvatarForm.querySelector('input[name="avatar"]');

function handleUpdateAvatarSubmit(evt) {
	evt.preventDefault();
	
	const newAvatar = avatarInput.value;
	setIsReadyText(submitUpdateAvatar, false);
	
	changeAvatar(newAvatar)
		.then(profileInfo => {
			setAvatar(profileInfo.avatar)
			closePopup(popupUpdateAvatar);
			updateAvatarForm.reset();
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			setIsReadyText(submitUpdateAvatar, true);
		});
}

updateAvatarForm.addEventListener('submit', handleUpdateAvatarSubmit)

popupUpdateAvatar.openPopupCallback = () => {
	avatarInput.value = getAvatar();
	clearValidation(updateAvatarForm, validationConfig);
}
popupUpdateAvatar.closePopupCallback = () => {
	updateAvatarForm.reset();
}

const validationConfig = {
	formSelector: '.popup__form',
	errorActiveClass: 'popup__input_error_active',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	errorSelectorFactory: (formInput) => `.popup__${formInput.id}_error`
}

enableValidation(validationConfig);