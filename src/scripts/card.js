export function createCard(cardTemplate, card, deleteCallback, likeCallback, clickImageCallback) {
	const cardElement = cardTemplate.cloneNode(true);
	const cardImage = cardElement.querySelector('.card__image');
	const cardTitle = cardElement.querySelector('.card__title');
	const cardDeleteButton = cardElement.querySelector('.card__delete-button');
	const cardLikeButton = cardElement.querySelector('.card__like-button');

	cardImage.src = card.link;
	cardImage.alt = card.alt;
	cardTitle.textContent = card.name;

	cardDeleteButton.addEventListener('click', () => deleteCallback(cardElement, card));
	cardLikeButton.addEventListener('click', () => likeCallback(cardElement, card));
	cardImage.addEventListener('click', () => clickImageCallback(cardElement, card));

	return cardElement;
}

export function deleteCard(cardElement, _) {
	cardElement.remove();
}

export function toggleLike(cardElement, _) {
	cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
}
