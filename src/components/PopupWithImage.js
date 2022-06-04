
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    //{ linkSelector, nameSelector } передаем объект
    constructor(popupSelector, { linkSelector, nameSelector }) {
        super(popupSelector);

    this._link= document.querySelector(linkSelector);
    this._name = document.querySelector(nameSelector);
    }

    open = ({name, link}) => {
        this._link.src = link;
        this._name.alt = name;

        this._name.textContent = name;
        super.open();
    }
}