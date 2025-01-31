import "./styles/index.css";
import "./scripts/modal";
import "./scripts/card";
import "./scripts/cards";
import {clearValidation, enableValidation} from "./scripts/validation";
import {closePopup, openPopup} from "./scripts/modal";
import {createCard, removeCard, updateLikes} from "./scripts/card";
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

// Идентификатор текущего пользователя
let userId = undefined;

// Попапы
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

// Создание карточек
const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const imageCaption = popupImage.querySelector('.popup__caption');
const imageContent = popupImage.querySelector('.popup__image');

// Форма редактирования профиля
const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.querySelector('input[name="name"]');
const jobInput = editProfileForm.querySelector('input[name="description"]');
const namePlace = document.querySelector('.profile__title');
const jobPlace = document.querySelector('.profile__description');

// Форма добавления карточки
const addCardForm = document.forms['new-place'];
const placeNameInput = addCardForm.querySelector('input[name="place-name"]');
const linkInput = addCardForm.querySelector('input[name="link"]');

// Форма изменения аватара
const updateAvatarForm = document.forms['update-avatar'];
const avatarInput = updateAvatarForm.querySelector('input[name="avatar"]');
const avatarPlace = document.querySelector('.profile__image');

const validationConfig = {
	formSelector: '.popup__form',
	errorActiveClass: 'popup__input_error_active',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	// Требуется, чтобы найти элемент ошибки, связанный с конкретным полем ввода
	errorSelectorFactory: (formInput) => `.popup__${formInput.id}_error`
}

function addCardToEnd(cardList, cardElement) {
	cardList.append(cardElement);
}

function addCardToStart(cardList, cardElement) {
	cardList.prepend(cardElement);
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

function setIsReadyText(element, isReady) {
	element.textContent = isReady
		? element.dataset.readyText
		: element.dataset.processingText;
}

function addOpenPopupEventListener(button, popup) {
	button.addEventListener('click', (evt) => {
		openPopup(popup);
	})
}

function handleCardDelete(cardElement, card) {
	deleteCard(card._id)
		.then(() => {
			removeCard(cardElement);
		})
		.catch((err) => {
			console.log(err);
		});
}

function handleCardLike(cardElement, card) {
	const promise = card.liked
		? unlikeCard(card._id)
		: likeCard(card._id);

	promise
		.then(newCard => {
			card.liked = !card.liked;
			updateLikes(cardElement, newCard.likes, userId);
		})
		.catch((err) => {
			console.log(err);
		});
}

function handleClickImage(cardElement, card) {
	imageCaption.textContent = card.name;
	imageContent.src = card.link;
	imageContent.alt = card.alt;
	openPopup(popupImage);
}

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

function handleAddCardSubmit(evt) {
	evt.preventDefault();

	const placeName = placeNameInput.value;
	const link = linkInput.value;
	const card = {name: placeName, link: link, alt: placeName};
	setIsReadyText(submitAddCard, false);

	addNewCard(card)
		.then(card => {
			const cardElement = createCard(cardTemplate, card, userId, handleCardDelete, handleCardLike, handleClickImage)
			addCardToStart(cardList, cardElement);
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

addOpenPopupEventListener(addCardButton, popupAddCard)
addOpenPopupEventListener(editProfileButton, popupEditProfile)
addOpenPopupEventListener(updateAvatarButton, popupUpdateAvatar)

editProfileForm.addEventListener('submit', handleEditProfileSubmit);
popupEditProfile.openPopupCallback = () => {
	nameInput.value = namePlace.textContent;
	jobInput.value = jobPlace.textContent;
	clearValidation(editProfileForm, validationConfig);
}
popupEditProfile.closePopupCallback = () => {
	editProfileForm.reset();
}

addCardForm.addEventListener('submit', handleAddCardSubmit);
popupAddCard.closePopupCallback = () => {
	addCardForm.reset();
	clearValidation(addCardForm, validationConfig);
}

updateAvatarForm.addEventListener('submit', handleUpdateAvatarSubmit)
popupUpdateAvatar.openPopupCallback = () => {
	avatarInput.value = getAvatar();
	clearValidation(updateAvatarForm, validationConfig);
}
popupUpdateAvatar.closePopupCallback = () => {
	updateAvatarForm.reset();
}

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

Promise.all([getInitialCards(), getProfileInfo()])
	.then((results) => {
		const cards = results[0];
		const profileInfo = results[1];
		userId = profileInfo._id;
		cards.forEach((card) => {
			const cardElement = createCard(cardTemplate, card, userId, handleCardDelete, handleCardLike, handleClickImage)
			addCardToEnd(cardList, cardElement);
		});
		setProfileInfo(profileInfo.name, profileInfo.about);
		setAvatar(profileInfo.avatar);
	})
	.catch((err) => {
		console.log(err);
	});

enableValidation(validationConfig);