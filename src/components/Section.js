
export  default class Section {
    constructor( {items, renderer}, containerSelector) {

        this._ArrayItems = items;
        this._renderer = renderer;

        this._container = document.querySelector(containerSelector);
    }

    //Метод вставляет element методом append в поле _container, который принимает DOM-элемент и добавляет его в контейнер.
    addItem(element) {
        this._container.prepend(element);
    }

    renderItems() {
        this._ArrayItems.forEach(item => {
            this._renderer(item);
        });
    }

}