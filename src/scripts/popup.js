const editProfileButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const addCardButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popups = document.querySelectorAll('.popup');

function closePopup(popup) {
	popup.classList.remove('popup__active');
}

function openPopup(popup) {
	popup.classList.add('popup__active');
}

popups.forEach((popup) => {
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

function openPopupWithButton(popup, button) {
	button.addEventListener('click', (evt) => {
		openPopup(popup);
	})
}

openPopupWithButton(popupEditProfile, editProfileButton);
openPopupWithButton(popupAddCard, addCardButton);

function closePopups() {
	popups.forEach(closePopup);
}

document.addEventListener('keydown', (evt) => {
	if (evt.key === 'Escape') {
		closePopups();
	}
})

