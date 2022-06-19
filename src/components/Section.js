
export  default class Section {
    //constructor( {items, renderer}, containerSelector) {
    constructor(renderer, containerSelector) {

        //this._arrayItems = items;
        this._renderer = renderer;

        this._container = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._container.prepend(element);
    }

    renderItems(arrayItems) {
        this._arrayItems = arrayItems;

        arrayItems.forEach(item => {
            this._renderer(item);
        });
    }
}