import { Renderer } from "../ui.js";
import { DataFetcher } from "../data.js";

class FilterProductPrice {
  constructor(rangeInput, rangePrice) {
    this.rangeInput = rangeInput;
    this.rangePrice = rangePrice;
    rangeInput = document.querySelector("#rangeInput");
    rangePrice = document.querySelector("#rangePrice");
    this.debouncedGetProductsByPrice = this.debounce(
      this.getProductsByPrice,
      300
    );
    rangeInput.addEventListener("input", this.debouncedGetProductsByPrice);
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
    const priceInput = rangeInput.value;
    DataFetcher.fetchData().then((data) => {
      const filteredProducts = data.products.filter((product) => {
        return product.price < priceInput;
      });
      Renderer.renderProducts(filteredProducts);
    });
  }
}

const filterProductPrice = new FilterProductPrice("#rangeInput", "#rangePrice");
