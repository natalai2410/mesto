
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector, { linkSelector, nameSelector }) {
        super(popupSelector);

    this._img= this._popup.querySelector(linkSelector);
    this._name = this._popup.querySelector(nameSelector);
    }

    open = ({name, link}) => {
        this._img.src = link;
        this._name.alt = name;

        this._name.textContent = name;
        super.open();
    }
}