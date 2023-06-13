class State {
  constructor() {
    this.renderedProducts = [];
  }

  setInitialState(data) {
    this.renderedProducts.push(data);
  }
}

const state = new State();

export { state };
