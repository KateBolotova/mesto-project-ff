export function createCard(cardTemplate, card, userId, deleteCallback, likeCallback, clickImageCallback) {
	const cardElement = cardTemplate.cloneNode(true);
	const cardTitle = cardElement.querySelector('.card__title');
	const cardImage = cardElement.querySelector('.card__image');
	const cardDeleteButton = cardElement.querySelector('.card__delete-button');
	const cardLikeButton = cardElement.querySelector('.card__like-button');
	const cardLikeCounter = cardElement.querySelector('.card__like-counter');
	const likes = card.likes;

	cardImage.src = card.link;
	cardImage.alt = card.alt;
	cardTitle.textContent = card.name;
	
	cardLikeCounter.textContent = likes.length;
	if (likes.some(user => user._id === userId)) {
		card.liked = true;
		cardLikeButton.classList.add('card__like-button_is-active');
	}
	else {
		card.liked = false;
		cardLikeButton.classList.remove('card__like-button_is-active');
	}
	
	if (card.owner._id !== userId) {
		cardDeleteButton.classList.add('card__delete-button_not-active');
	}
	else {
		cardDeleteButton.classList.remove('card__delete-button_not-active');
	}

	cardDeleteButton.addEventListener('click', () => deleteCallback(cardElement, card));
	cardLikeButton.addEventListener('click', () => likeCallback(cardElement, card));
	cardImage.addEventListener('click', () => clickImageCallback(cardElement, card));

	return cardElement;
}

export function updateLikes(cardElement, likes, userId) {
	const cardLikeCounter = cardElement.querySelector('.card__like-counter');
	const cardLikeButton = cardElement.querySelector('.card__like-button');
	
	cardLikeCounter.textContent = likes.length;
	if (likes.some(user => user._id === userId)) {
		cardLikeButton.classList.add('card__like-button_is-active');
	}
	else {
		cardLikeButton.classList.remove('card__like-button_is-active');
	}
}

export function removeCard(cardElement) {
	cardElement.remove();
}