import './styles/index.css';
import {initialCards} from "./scripts/cards";
import "./scripts/popup";

const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

function createCard(card, deleteCallback) {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.alt;
    cardElement.querySelector('.card__title').textContent = card.name;
    
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallback);
    
    return cardElement;
}

initialCards.forEach((card) => {
    const cardElement = createCard(card, () => {
        cardElement.remove();
    });
    cardList.append(cardElement);
});

