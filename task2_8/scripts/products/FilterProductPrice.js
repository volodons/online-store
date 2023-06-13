import { Renderer } from "../ui.js";
import { DataFetcher } from "../data.js";
import { state } from "../state.js";

class FilterProductPrice {
  constructor(rangeInput, rangePrice) {
    this.rangeInput = document.querySelector(rangeInput);
    this.rangePrice = document.querySelector(rangePrice);
    this.debouncedGetProductsByPrice = this.debounce(
      this.getProductsByPrice,
      300
    );
    this.rangeInput.addEventListener("input", this.debouncedGetProductsByPrice);
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

  getProductsByPrice() {
    const priceInput = this.rangeInput.value;
    DataFetcher.fetchData().then((data) => {
      const filteredProducts = data.products.filter((product) => {
        return product.price < priceInput;
      });
      Renderer.renderProducts(filteredProducts);
    });
  }
}

const filterProductPrice = new FilterProductPrice("#rangeInput", "#rangePrice");
