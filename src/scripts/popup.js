const editProfileButton = document.querySelector('.profile__edit-button');
export const popupEditProfile = document.querySelector('.popup_type_edit');
const addCardButton = document.querySelector('.profile__add-button');
export const popupAddCard = document.querySelector('.popup_type_new-card');
export const popupImage = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');

export function closePopup(popup) {
	popup.classList.remove('popup_is-opened');
	if (popup.closePopupCallback !== undefined) {
		popup.closePopupCallback();
	}
}

export function openPopup(popup) {
	popup.classList.add('popup_is-opened');
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

popups.forEach((popup) => {
	popup.classList.add('popup_is-animated');
})
