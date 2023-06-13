class State {
  constructor() {
    this.renderedProducts = [];
  }

  setInitialState(products) {
    this.renderedProducts.push(products);
  }

  updateState(products) {
    this.renderedProducts = products;
    // this.renderedProducts.length = 0;
    // this.renderedProducts.push(products);
    // console.log(products);
    console.log(this.renderedProducts);
  }
}

const state = new State();

export { state };
