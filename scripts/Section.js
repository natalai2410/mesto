export default class Section {
    constructor( {dataArray, renderer}, containerSelector)
    {
        this._dataArray =dataArray;
        this._renderer = renderer;

        this._containerSelector = containerSelector;
    }

    renderItems() {
        this._dataArray.forEach(item => {
            this._renderer(item); //ВОПРОС 1
        });
    }

    addItem(element) {
        this._containerSelector.append(element);
    }
}