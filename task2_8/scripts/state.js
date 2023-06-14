class State {
  constructor() {
    this.renderedProducts = [];
  }

  setInitialState(products) {
    this.renderedProducts.push(products);
  }

  updateState(products) {
    this.renderedProducts = products;
  }
}

const state = new State();

export { state };
