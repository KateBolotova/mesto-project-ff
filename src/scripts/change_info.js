import {popupEditProfile} from "./popup";
import {closePopup} from "./popup";

const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.querySelector('input[name="name"]');
const jobInput = editProfileForm.querySelector('input[name="description"]');
const namePlace = document.querySelector('.profile__title');
const jobPlace = document.querySelector('.profile__description');

function handleEditProfileSubmit(evt) {
	evt.preventDefault();

	const name = nameInput.value;
	const job = jobInput.value;

	namePlace.textContent = name;
	jobPlace.textContent = job;

	closePopup(popupEditProfile);
	editProfileForm.reset();
}

editProfileForm.addEventListener('submit', handleEditProfileSubmit);

popupEditProfile.closePopupCallback = () => {
	editProfileForm.reset();
}