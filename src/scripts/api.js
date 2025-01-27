const config = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-30',
	headers: {
		authorization: 'c4d399cf-fb22-4310-a840-55b74a384927',
		'Content-Type': 'application/json'
	}
}

const fetchAndReturnJSON = (url, method, body = {}) => {
	return fetch(`${config.baseUrl}/${url}`, {
		method: method,
		headers: config.headers,
		body: JSON.stringify(body)
	})
		.then(res => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status}`);
		})
		.catch((err) => {
			console.log(err);
		});
}

export const getInitialCards = () => fetchAndReturnJSON("cards", "GET");

export const getProfileInfo = () => fetchAndReturnJSON("users/me", "GET");

export const patchProfileInfo = (patch) => fetchAndReturnJSON("users/me", "PATCH", patch);

export const addNewCard = (newCard) => fetchAndReturnJSON("cards", "POST", newCard);

export const deleteCard = (cardId) => fetchAndReturnJSON(`cards/${cardId}`, "DELETE");

export const likeCard = (cardId) => fetchAndReturnJSON(`cards/likes/${cardId}`, "PUT");

export const unlikeCard = (cardId) => fetchAndReturnJSON(`cards/likes/${cardId}`, "DELETE");

export const changeProfilePicture = (link) => fetchAndReturnJSON("users/me/avatar", "PATCH", {avatar: link});