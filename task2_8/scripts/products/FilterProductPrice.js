import { Renderer } from "../ui.js";
import { DataFetcher } from "../data.js";
import { debounce } from "../utils/debounce.js";
import { state } from "../state.js";

class FilterProductPrice {
  constructor(rangeInput, rangePrice) {
    this.rangeInput = document.querySelector(rangeInput);
    this.rangePrice = document.querySelector(rangePrice);
    this.debouncedGetProductsByPrice = debounce(
      this.getProductsByPrice.bind(this),
      300
    );
    this.rangeInput.addEventListener("input", this.debouncedGetProductsByPrice);
    this.selectedPrice = null;
    this.queryParams = new URLSearchParams(window.location.search);
    const priceFilter = this.queryParams.get("price");
    if (priceFilter) {
      this.selectedPrice = priceFilter;
    }
  }

  getProductsByPrice() {
    this.selectedPrice = this.rangeInput.value;
    this.updateUrlParams();
    DataFetcher.fetchData().then((data) => {
      const filteredProducts = data.products.filter((product) => {
        return product.price <= parseInt(this.selectedPrice);
      });
      Renderer.renderProducts(filteredProducts);
    });
  }

  updateUrlParams() {
    if (this.selectedPrice) {
      this.queryParams.set("price", this.selectedPrice);
    } else {
      this.queryParams.delete("price");
    }
    window.history.replaceState(null, null, `?${this.queryParams.toString()}`);
  }
}

const filterProductPrice = new FilterProductPrice("#rangeInput", "#rangePrice");

export { filterProductPrice };
