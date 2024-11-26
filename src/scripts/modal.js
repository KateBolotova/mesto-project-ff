export function closePopup(popup) {
	popup.classList.remove('popup_is-opened');
	if (popup.closePopupCallback) {
		popup.closePopupCallback();
	}
	if (popup.keydownHandler) {
		document.removeEventListener('keydown', popup.keydownHandler);
		popup.keydownHandler = null;
	}
}

export function openPopup(popup) {
	popup.classList.add('popup_is-opened');
	popup.keydownHandler = (evt) => {
		if (evt.key === 'Escape') {
			closePopup(popup);
		}
	};
	document.addEventListener('keydown', popup.keydownHandler);
}

export function openPopupWithButton(popup, button) {
	button.addEventListener('click', (evt) => {
		openPopup(popup);
	})
}