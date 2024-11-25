import {popupAddCard} from "./popup";
import {closePopup} from "./popup";
import {addCardToStart} from "./cards";

const addCardForm = document.forms['new-place'];
const placeNameInput = addCardForm.querySelector('input[name="place-name"]');
const linkInput = addCardForm.querySelector('input[name="link"]');

function handleAddCardSubmit(evt) {
	evt.preventDefault();

	const placeName = placeNameInput.value;
	const link = linkInput.value;

	addCardToStart({name: placeName, link: link, alt: placeName});

	closePopup(popupAddCard);
	addCardForm.reset();
}

addCardForm.addEventListener('submit', handleAddCardSubmit);

popupAddCard.closePopupCallback = () => {
	addCardForm.reset();
}