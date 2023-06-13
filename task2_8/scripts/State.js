class State {
  constructor() {
    this.renderedProducts = [];
  }

  setInitialState(products) {
    this.renderedProducts.push(products);
  }

  updateState(products) {
    this.renderedProducts.length = 0;
    this.renderedProducts.push(products);
  }
}

const state = new State();

export { state };
