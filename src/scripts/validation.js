const showInputError = (element, errorMessage, settings) => {
	element.textContent = errorMessage;
	element.classList.add(settings.errorActiveClass);
};

const hideInputError = (element, settings) => {
	element.classList.remove(settings.errorActiveClass);
	element.textContent = '';
};

const hasInvalidInput = (inputList) => {
	return inputList.some((input) => !input.validity.valid)
}

const updateButtonState = (inputList, button) => {
	if (hasInvalidInput(inputList)) {
		button.disabled = true;
	}
	else {
		button.disabled = false;
	}
}

export function enableValidation(settings) {
	const formElements = document.querySelectorAll(settings.formSelector);
	
	formElements.forEach(formElement => {
		const formInputs = Array.from(formElement.querySelectorAll(settings.inputSelector));
		const submitButton = formElement.querySelector(settings.submitButtonSelector);
		
		updateButtonState(formInputs, submitButton);
		
		formInputs.forEach(formInput => {
			const formError = formElement.querySelector(settings.errorSelectorFactory(formInput));
			const isValid = () => {
				if (formInput.validity.patternMismatch) {
					formInput.setCustomValidity(formInput.dataset.errorMessage);
				}
				else {
					formInput.setCustomValidity("");
				}
				if (!formInput.validity.valid) {
					showInputError(formError, formInput.validationMessage, settings);
				} else {
					hideInputError(formError, settings);
				}
			};
			formInput.addEventListener('input', evt => {
				isValid();
				updateButtonState(formInputs, submitButton);
			})
		})
	})
}

export function clearValidation(formElement, settings) {
	const formInputs = formElement.querySelectorAll(settings.inputSelector);
	
	formInputs.forEach(formInput => {
		const formError = formElement.querySelector(settings.errorSelectorFactory(formInput));
		hideInputError(formError, settings);
		formInput.setCustomValidity('');
	})
}
