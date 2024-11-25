import {popupImage, openPopup} from "./popup";

const initialCards = [
	{
		name: "Архыз",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
		alt: "Снежные горы Архыза",
	},
	{
		name: "Челябинская область",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
		alt: "Озеро в снежном лесу Челябинской области",
	},
	{
		name: "Иваново",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
		alt: "Окна многоэтажек в Иваново",
	},
	{
		name: "Камчатка",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
		alt: "Подножие вулкана на Камчатке",
	},
	{
		name: "Холмогорский район",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
		alt: "Железная дорога, проходящая через лес Холмогорского района",
	},
	{
		name: "Байкал",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
		alt: "Скалы рядом с озером Байкал",
	}
];

const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const imageCaption = popupImage.querySelector('.popup__caption');
const imageContent = popupImage.querySelector('.popup__image');

function createCard(card, deleteCallback, likeCallback, clickImageCallback) {
	const cardElement = cardTemplate.cloneNode(true);
	const cardImage = cardElement.querySelector('.card__image');
	const cardTitle = cardElement.querySelector('.card__title');
	const cardDeleteButton = cardElement.querySelector('.card__delete-button');
	const cardLikeButton = cardElement.querySelector('.card__like-button');

	cardImage.src = card.link;
	cardImage.alt = card.alt;
	cardTitle.textContent = card.name;

	cardDeleteButton.addEventListener('click', deleteCallback);
	cardLikeButton.addEventListener('click', likeCallback);
	cardImage.addEventListener('click', clickImageCallback);

	return cardElement;
}

function createDefaultCard(card) {
	const cardElement = createCard(card,
		() => {
			cardElement.remove();
		},
		() => {
			cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
		},
		() => {
			imageCaption.textContent = card.name;
			imageContent.src = card.link;
			imageContent.alt = card.alt;
			openPopup(popupImage);
		});
	return cardElement;
}

export function addCardToEnd(card) {
	cardList.append(createDefaultCard(card));
}

export function addCardToStart(card) {
	cardList.prepend(createDefaultCard(card));
}

initialCards.forEach(addCardToEnd);
