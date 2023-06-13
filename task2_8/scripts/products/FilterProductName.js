import { Renderer } from "../ui.js";
import { DataFetcher } from "../data.js";
import { state } from "../state.js";

class FilterProductName {
  constructor(inputElement) {
    this.inputElement = document.querySelector(inputElement);
    this.debouncedGetProductByName = this.debounce(this.getProductByName, 300);
    this.inputElement.addEventListener("input", this.debouncedGetProductByName);
  }

  debounce(func, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, arguments);
      }, delay);
    };
  }

  getProductByName() {
    const userInput = inputElement.value.toLowerCase();
    const filteredProducts = state.renderedProducts.filter((product) => {
      const productName = product.name.toLowerCase();
      return productName.includes(userInput);
    });
    console.log(filteredProducts);
    Renderer.renderProducts(filteredProducts);
    state.updateState(filteredProducts);
    // DataFetcher.fetchData().then((data) => {
    //   const filteredProducts = data.products.filter((product) => {
    //     const productName = product.name.toLowerCase();
    //     return productName.includes(userInput);
    //   });
    //   Renderer.renderProducts(filteredProducts);
    // });
  }
}

export { FilterProductName };
