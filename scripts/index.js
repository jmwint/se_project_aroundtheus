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
        const cardElement = getCardElement(cardData);
        wrapper.prepend(cardElement);
}

function openPopup(modal) {
        modal.classList.add('modal_open')
}


function closePopup(modal) {
        modal.classList.remove('modal_open');
}

function getCardElement(cardData) {
         const cardElement = cardTemplate.cloneNode(true);
         const cardImageEl = cardElement.querySelector('.card__image');
         const cardTitleEl = cardElement.querySelector('.card__title');
         const likeButton = cardElement.querySelector('.card__like-button');
         const deleteButton = cardElement.querySelector('.card__delete-button');

         deleteButton.addEventListener('click', () => {
                cardElement.remove(deleteButton);
         });

         likeButton.addEventListener('click', () => {
                likeButton.classList.toggle('card__like-button_active');
        });

         cardImageEl.addEventListener('click', () => {
                const cardData = {
                link: cardImageEl.src,
                name: cardImageEl.alt,
         };
         modalPreviewImg.src = cardData.link;
         modalPreviewImg.alt = cardData.name;
         openPopup(previewImageModal);
});
         
         cardImageEl.src = cardData.link;
         cardImageEl.alt = cardData.name;
         cardTitleEl.textContent = cardData.name;
         return cardElement;
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
        renderCard({name, link}, cardsWrap);
        closePopup(addCardModal);
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
addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
