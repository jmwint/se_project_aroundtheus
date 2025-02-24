export default class Card {
    constructor({ name, link }) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    _setEventListeners() {
        //".card__like-button"
        //".card__delete-button"
    }

    getView() {
        this._setEventListeners();
    }
}