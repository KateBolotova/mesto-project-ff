export function createCard(cardTemplate, card, profile, deleteCallback, likeCallback, clickImageCallback) {
	const cardElement = cardTemplate.cloneNode(true);
	const cardImage = cardElement.querySelector('.card__image');
	const cardDeleteButton = cardElement.querySelector('.card__delete-button');
	const cardLikeButton = cardElement.querySelector('.card__like-button');

	updateCard(cardElement, card, profile);

	cardDeleteButton.addEventListener('click', () => deleteCallback(cardElement, card));
	cardLikeButton.addEventListener('click', () => likeCallback(cardElement, card));
	cardImage.addEventListener('click', () => clickImageCallback(cardElement, card));

	return cardElement;
}

export function updateCard(cardElement, card, profile) {
	const cardImage = cardElement.querySelector('.card__image');
	const cardTitle = cardElement.querySelector('.card__title');
	const cardLikeCounter = cardElement.querySelector('.card__like-counter');
	const cardDeleteButton = cardElement.querySelector('.card__delete-button');
	const cardLikeButton = cardElement.querySelector('.card__like-button');
	cardImage.src = card.link;
	cardImage.alt = card.alt;
	cardTitle.textContent = card.name;
	cardLikeCounter.textContent = card.likes.length;
	if (card.likes.some(user => user._id === profile._id)) {
		card.liked = true;
		cardLikeButton.classList.add('card__like-button_is-active');
	}
	else {
		card.liked = false;
		cardLikeButton.classList.remove('card__like-button_is-active');
	}
	if (card.owner._id !== profile._id) {
		cardDeleteButton.classList.add('card__delete-button_not-active');
	} 
	else {
		cardDeleteButton.classList.remove('card__delete-button_not-active');
	}
}