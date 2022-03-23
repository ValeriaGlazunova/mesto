export class Section {
    constructor( {items, renderer}, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    renderItems() {
        this._renderedItems.forEach((item) => {
            this.renderer(item);
        });
    };
    addItem(data, isPrepend) {
        const cardElement = createCard(data);
        if (isPrepend) {
          elements.prepend(cardElement);
        } else {
          elements.append(cardElement)
        }
      }
}