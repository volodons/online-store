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
    this.selectedPrice = null;
    const priceFilter = this.queryParams.get("price");
    if (priceFilter) {
      this.selectedPrice = priceFilter;
      this.rangeInput.value = priceFilter;
    }
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
    this.updateUrlParams();
    DataFetcher.fetchData().then((data) => {
      const filteredProducts = data.products.filter((product) => {
        return product.price < priceInput;
      });
      Renderer.renderProducts(filteredProducts);
    });
  }

  updateUrlParams() {
    if (this.selectedPrice) {
      this.queryParams.set("price", this.selectedPrice);
    } else {
      this.queryParams.delete("name");
    }
    window.history.replaceState(null, null, `?${this.queryParams.toString()}`);
  }
}

const filterProductPrice = new FilterProductPrice("#rangeInput", "#rangePrice");

export { filterProductPrice };
