
export  default class Section {
    constructor( {items, renderer}, containerSelector) {

        this._arrayItems = items;
        this._renderer = renderer;

        this._container = document.querySelector(containerSelector);
    }

    //Метод вставляет element методом append в поле _container, который принимает DOM-элемент и добавляет его в контейнер.
    addItem(element) {
        this._container.prepend(element);
    }

    renderItems() {
        this._arrayItems.forEach(item => {
            this._renderer(item);
        });
    }

}