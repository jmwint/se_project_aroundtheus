import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';


const initialCards = [
{
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
},
{
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
},
{
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
},
{
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
},
{
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
},
{
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
}
];

const cardData = {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
}
const card = new Card(cardData, "#card-template", handleImageClick);
card.generateCard();

// Elements
const profileEditButton = document.querySelector('#profile-edit-button');
const profileEditModal = document.querySelector('#profile-edit-modal');
const profileCloseModal = profileEditModal.querySelector('.modal__close');
const profileTitle = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileTitleInput = document.querySelector('#profile-name-input');
const profileDescriptionInput = document.querySelector('#profile-description-input');
const profileEditForm = profileEditModal.querySelector('.modal__form');
const cardListEl = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content.firstElementChild;
const addNewCardButton = document.querySelector('.profile__add-button');
const addCardModal = document.querySelector('#add-card-modal');
const addCardModalCloseButton = addCardModal.querySelector('.modal__close');
const addCardFormElement = addCardModal.querySelector('.modal__form');
const previewImageModal = document.querySelector('#preview__image-modal');
const previewModalClose = previewImageModal.querySelector('.modal__close');

// Forms
const cardsWrap = document.querySelector('.cards__list');
const nameInput = profileEditForm.querySelector('.modal__input_type_name');
const jobInput = profileEditForm.querySelector(".modal__input_type_description");
const cardLinkInput = addCardFormElement.querySelector('.modal__input_type_link');
const cardTitleInput = addCardFormElement.querySelector('.modal__input_type_title');
const modalPreviewImg = previewImageModal.querySelector('.modal__preview-img');
const modalPreviewTitle = previewImageModal.querySelector('.modal__preview-title');

// Functions
function renderCard(cardData, wrapper) {
        const cardElement = createCard(cardData);
        wrapper.prepend(cardElement);
}

function openPopup(modal) {
        modal.classList.add('modal_open')
        document.addEventListener('keydown', handleEscKey);
}


function closePopup(modal) {
        modal.classList.remove('modal_open');
        document.removeEventListener('keydown', handleEscKey);
}

function handleImageClick({ name, link }) {
        modalPreviewImg.src = link;
        modalPreviewImg.alt = name;
        modalPreviewTitle.textContent = name;
        openPopup(previewImageModal);
      }

function createCard(cardData) {
        const card = new Card(cardData, '#card-template', handleImageClick);
        return card.generateCard();
      }

// Event Handlers
function handleProfileEditSubmit(e) {
        e.preventDefault();
        profileTitle.textContent = profileTitleInput.value;
        profileDescription.textContent = profileDescriptionInput.value;
        closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
        e.preventDefault();
        const name = cardTitleInput.value;
        const link = cardLinkInput.value;
        renderCard({ name, link }, cardsWrap);
        e.target.reset();
        addCardFormValidator.resetValidation();
        closePopup(addCardModal);
}

function handleOverlayClick(event) {
        if (event.target.classList.contains('modal_open')) {
            closePopup(event.target);
        }
    }
    
    const modals = document.querySelectorAll('.modal');
    modals.forEach((modal) => {
        modal.addEventListener('click', handleOverlayClick);
    });
    
    function handleEscKey(event) {
        if (event.key === 'Escape') {
            const openModal = document.querySelector('.modal_open');
            if (openModal) {
                closePopup(openModal);
            }
        }
    }
    
// Event Listeners
addNewCardButton.addEventListener('click', () => openPopup(addCardModal));
addCardModalCloseButton.addEventListener('click', () => closePopup(addCardModal));

previewModalClose.addEventListener('click', () => closePopup(previewImageModal));


profileCloseModal.addEventListener('click', () => closePopup(profileEditModal));
profileEditButton.addEventListener('click', () => {
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileDescription.textContent;
        openPopup(profileEditModal);
});
profileEditForm.addEventListener('submit', handleProfileEditSubmit);

const validationSettings = {
        formSelector: ".modal__form",
        inputSelector: ".modal__input",
        submitButtonSelector: ".modal__button",
        inactiveButtonClass: "modal__button_disabled",
        inputErrorClass: "modal__input_type_error",
        errorClass: "modal__error_visible"
      };
const profileFormValidator = new FormValidator(validationSettings, profileEditForm);
const addCardFormValidator = new FormValidator(validationSettings, addCardFormElement);
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
